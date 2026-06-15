/* ============================================================
   AlpovkApps — WebGL hero
   A reactive point-field rendered with three.js. A fine grid of
   monochrome points rests with a faint ambient drift; the cursor
   stirs a champagne ripple-pool that radiates waves and brightens
   the points it passes. Calm when idle, alive on movement.
   Theme-aware, paused off-screen, degrades to a static frame for
   reduced-motion, and no-ops cleanly without WebGL.
   ============================================================ */
import * as THREE from "three";

const canvas = document.getElementById("heroCanvas");
const hero = canvas && canvas.parentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Quick WebGL capability probe so we never throw on old/blocked GPUs. */
function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch (e) {
    return false;
  }
}

function readColors() {
  const cs = getComputedStyle(document.documentElement);
  const base = new THREE.Color((cs.getPropertyValue("--fg") || "#eceae4").trim());
  const accent = new THREE.Color((cs.getPropertyValue("--accent") || "#c8ad7e").trim());
  return { base, accent };
}

/* A flat grid of points spanning generous world extents so it covers
   the viewport at our camera distance across aspect ratios. */
const EXT_X = 4.2;
const EXT_Y = 2.6;
function buildGrid(cols, rows) {
  const positions = new Float32Array(cols * rows * 3);
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions[i++] = (c / (cols - 1) - 0.5) * 2 * EXT_X;
      positions[i++] = (r / (rows - 1) - 0.5) * 2 * EXT_Y;
      positions[i++] = 0;
    }
  }
  return positions;
}

const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2  uMouse;
  uniform float uStrength;
  varying float vGlow;

  // Simplex 3D noise (Ashima / Stefan Gustavson)
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;

    // gentle ambient breathing so the grid is never dead-flat
    float ambient = snoise(vec3(pos.xy * 0.34, uTime * 0.08)) * 0.10;

    // cursor ripple-pool: wave radiating from the pointer, falling off with distance
    float dist  = distance(pos.xy, uMouse);
    float fall  = exp(-dist * 0.85);
    float wave  = sin(dist * 3.4 - uTime * 2.6) * exp(-dist * 0.5);
    float pool  = (fall * 0.45 + wave * 0.22) * uStrength;

    pos.z = ambient + pool;
    vGlow = clamp(fall * uStrength * 1.25 + abs(wave) * 0.18 * uStrength + pos.z * 0.15, 0.0, 1.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    // small at rest, swelling where the cursor pool brightens them
    gl_PointSize = (1.8 + vGlow * 5.0) * uPixelRatio;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorBase;
  uniform vec3 uColorAccent;
  varying float vGlow;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.08, d);
    vec3 col = mix(uColorBase, uColorAccent, vGlow);
    float alpha = soft * (0.16 + vGlow * 0.72);
    gl_FragColor = vec4(col, alpha);
  }
`;

let uniforms;

function init() {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearAlpha(0);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 4);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(buildGrid(150, 92), 3));

  const { base, accent } = readColors();
  uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: dpr },
    uMouse: { value: new THREE.Vector2(999, 999) }, // offscreen until the pointer moves
    uStrength: { value: 0 },
    uColorBase: { value: base },
    uColorAccent: { value: accent },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  /* ---- mouse → world-plane mapping ---- */
  // half-extents of the z=0 plane visible at the camera distance
  let halfH = 1, halfW = 1;
  const ndc = { x: 0, y: 0, has: false };

  function resize() {
    const w = hero.clientWidth || window.innerWidth;
    const h = hero.clientHeight || window.innerHeight;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 700 ? 5.2 : 4;
    camera.updateProjectionMatrix();
    halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    halfW = halfH * camera.aspect;
  }
  resize();
  // immediate first frame so the canvas is never blank before the loop starts
  renderer.render(scene, camera);

  /* ---- pointer reactivity ---- */
  let strengthTarget = 0;
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      ndc.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.y = -((e.clientY / window.innerHeight) * 2 - 1);
      ndc.has = true;
      strengthTarget = 1;           // stir the pool while moving
    }, { passive: true });
    window.addEventListener("pointerleave", () => { strengthTarget = 0; }, { passive: true });
  }

  /* ---- theme awareness ---- */
  const themeObserver = new MutationObserver(() => {
    const c = readColors();
    uniforms.uColorBase.value.copy(c.base);
    uniforms.uColorAccent.value.copy(c.accent);
    if (!running) renderer.render(scene, camera);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  /* ---- run / pause lifecycle ---- */
  let running = false;
  let rafId = 0;
  const clock = new THREE.Clock();
  const mouseWorld = uniforms.uMouse.value;
  const targetWorld = new THREE.Vector2(999, 999);

  function frame() {
    if (!running) return;
    rafId = requestAnimationFrame(frame);
    uniforms.uTime.value = clock.getElapsedTime();

    if (ndc.has) {
      targetWorld.set(ndc.x * halfW, ndc.y * halfH);
      mouseWorld.lerp(targetWorld, 0.12);  // trailing pursuit of the cursor
    }
    // strength rises fast on movement, eases back toward a calm idle drift
    const idle = 0.18;
    uniforms.uStrength.value += ((strengthTarget ? 1 : idle) - uniforms.uStrength.value) * 0.04;
    strengthTarget = 0; // require continuous movement to stay fully energised

    renderer.render(scene, camera);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    clock.getElapsedTime();
    frame();
  }
  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  if (reduceMotion) {
    uniforms.uTime.value = 0.4;
    uniforms.uStrength.value = 0.18;
    renderer.render(scene, camera);
  } else {
    const io = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !document.hidden) start();
      else stop();
    }, { threshold: 0 });
    io.observe(hero);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else if (hero.getBoundingClientRect().bottom > 0) start();
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (!running) renderer.render(scene, camera);
    }, 180);
  }, { passive: true });
}

// Kick off only after VERT/FRAG and all helpers above are initialised.
if (canvas && hero && webglOK()) {
  init();
}
