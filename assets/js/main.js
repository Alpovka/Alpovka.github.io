/* ============================================================
   AlpovkApps — interaction engine
   smooth scroll · line masks · scrub effects · pinned gallery
   stacking cards · velocity marquee · cursor · dust · theme
   ============================================================ */
(() => {
  "use strict";

  const doc = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------------- Theme ---------------- */
  const THEME_KEY = "alpovkapps-theme";
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    doc.dataset.theme = theme;
    if (themeMeta) themeMeta.content = theme === "dark" ? "#0b0b0c" : "#f2f0ea";
  };

  // Dark is the brand default; only an explicit visitor choice overrides it.
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === "light" || storedTheme === "dark") applyTheme(storedTheme);

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    const next = doc.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    const swap = () => { applyTheme(next); };

    if (document.startViewTransition && !reduceMotion) {
      const rect = themeToggle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy)
      );
      const transition = document.startViewTransition(swap);
      transition.ready
        .then(() => {
          doc.animate(
            { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
            { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
          );
        })
        .catch(() => {});
    } else {
      swap();
    }
  });

  /* ---------------- Preloader ---------------- */
  const preloader = document.getElementById("preloader");
  const heroTitle = document.getElementById("heroTitle");
  const seen = sessionStorage.getItem("alpovkapps-seen");

  const finishLoading = () => {
    preloader.classList.add("is-done");
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
    if (heroTitle) heroTitle.classList.add("in-view");
  };

  if (reduceMotion || seen) {
    preloader.style.display = "none";
    body.classList.add("is-ready");
    if (heroTitle) heroTitle.classList.add("in-view");
  } else {
    body.classList.add("is-loading");
    sessionStorage.setItem("alpovkapps-seen", "1");
    window.addEventListener("load", () => setTimeout(finishLoading, 850), { once: true });
    setTimeout(finishLoading, 2500); // hard cap, never trap the visitor
  }

  /* ---------------- Smooth scroll engine (lerp) ----------------
     Keeps native scroll position authoritative (sticky keeps working),
     but drives it through an eased target for a weighted, premium feel.
     Wheel-only: trackpads/mice. Touch and reduced-motion stay native. */
  const smooth = {
    enabled: finePointer && !reduceMotion,
    target: window.scrollY,
    current: window.scrollY,
    velocity: 0,
    lastSet: -1,
  };

  const maxScroll = () => doc.scrollHeight - window.innerHeight;

  if (smooth.enabled) {
    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey) return; // pinch-zoom
      e.preventDefault();
      const factor = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? window.innerHeight : 1;
      smooth.target = clamp(smooth.target + e.deltaY * factor, 0, maxScroll());
    }, { passive: false });

    // adopt external jumps (keyboard, scrollbar drag, find-in-page)
    window.addEventListener("scroll", () => {
      if (Math.abs(window.scrollY - smooth.lastSet) > 2) {
        smooth.target = smooth.current = window.scrollY;
      }
    }, { passive: true });
  }

  // eased anchor navigation
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const top = id === "#top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 60;
    if (smooth.enabled) {
      smooth.target = clamp(top, 0, maxScroll());
    } else {
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    }
    history.replaceState(null, "", id);
  });

  /* ---------------- Mobile nav ---------------- */
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    burger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    header.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    const open = !navLinks.classList.contains("is-open");
    // The header is position:fixed and gets transformed on scroll (is-hidden).
    // A transformed ancestor becomes the containing block for the fixed
    // overlay, mispositioning it on lower sections — so neutralise it here.
    if (open) header.classList.remove("is-hidden");
    header.classList.toggle("menu-open", open);
    burger.classList.toggle("is-open", open);
    navLinks.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    body.style.overflow = open ? "hidden" : "";
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  /* ---------------- Word rotator ---------------- */
  const rotator = document.getElementById("rotator");
  if (rotator && !reduceMotion) {
    const words = [...rotator.querySelectorAll(".rotator-word")];
    let current = 0;
    setInterval(() => {
      const prev = words[current];
      current = (current + 1) % words.length;
      const next = words[current];
      prev.classList.remove("is-current");
      prev.classList.add("is-leaving");
      next.classList.remove("is-leaving");
      next.classList.add("is-current");
      setTimeout(() => prev.classList.remove("is-leaving"), 650);
    }, 2700);
  }

  /* ---------------- Line splitter (masked reveals) ---------------- */
  const splitTargets = [...document.querySelectorAll("[data-split]")];
  const originals = new Map(splitTargets.map((el) => [el, el.innerHTML]));

  const splitLines = (el) => {
    el.innerHTML = originals.get(el);
    if (reduceMotion) return;

    // tokenize into word units; keep inline elements (em) as whole units
    const units = [];
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/\s+/).filter(Boolean).forEach((w) => units.push(w));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        units.push(node.outerHTML);
      }
    });
    el.innerHTML = units.map((u) => `<span class="su">${u}</span>`).join(" ");
    el.querySelectorAll(".su").forEach((s) => { s.style.display = "inline-block"; });

    // group by rendered row
    const rows = [];
    let lastTop = null;
    el.querySelectorAll(".su").forEach((s) => {
      const top = s.offsetTop;
      if (top !== lastTop) { rows.push([]); lastTop = top; }
      rows[rows.length - 1].push(s.outerHTML.replace(/ style="[^"]*"/, ""));
    });
    el.innerHTML = rows
      .map((row, i) =>
        `<span class="line"><span class="line-inner" style="--li:${i}">${row.join(" ")}</span></span>`)
      .join("");
  };

  const splitObserver = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in-view");
        splitObserver.unobserve(en.target);
      }
    }),
    { threshold: 0.35 }
  );

  let splitWidth = window.innerWidth;
  const runSplits = () => {
    splitTargets.forEach((el) => {
      const wasSeen = el.classList.contains("in-view");
      splitLines(el);
      if (wasSeen || reduceMotion) el.classList.add("in-view");
      else splitObserver.observe(el);
    });
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runSplits);
  } else {
    runSplits();
  }
  window.addEventListener("resize", () => {
    if (Math.abs(window.innerWidth - splitWidth) < 60) return;
    splitWidth = window.innerWidth;
    clearTimeout(runSplits._t);
    runSplits._t = setTimeout(runSplits, 250);
  }, { passive: true });

  /* ---------------- Manifesto word scrub ---------------- */
  const manifesto = document.getElementById("manifestoText");
  let manifestoWords = [];
  if (manifesto && !reduceMotion) {
    const wrapWords = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((piece) => {
            if (/^\s+$/.test(piece) || piece === "") {
              frag.appendChild(document.createTextNode(piece));
            } else {
              const s = document.createElement("span");
              s.className = "w";
              s.textContent = piece;
              frag.appendChild(s);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrapWords(child);
        }
      });
    };
    wrapWords(manifesto);
    manifestoWords = [...manifesto.querySelectorAll(".w")];
  }
  let manifestoLit = -1;

  /* ---------------- Reveals / counters / active nav ---------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in-view");
        revealObserver.unobserve(en.target);
      }
    }),
    { threshold: 0.16, rootMargin: "0px 0px -30px 0px" }
  );
  document.querySelectorAll("[data-reveal], .work-card").forEach((el) => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      counterObserver.unobserve(en.target);
      const el = en.target;
      const target = parseFloat(el.dataset.countTo);
      if (reduceMotion) { el.textContent = target; return; }
      const start = performance.now();
      const tick = (now) => {
        const p = clamp((now - start) / 1500, 0, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }),
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count-to]").forEach((el) => counterObserver.observe(el));

  const linkMap = new Map(
    [...document.querySelectorAll(".nav-link")].map((a) => [a.getAttribute("href").slice(1), a])
  );
  const sectionObserver = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      linkMap.forEach((l) => l.classList.remove("is-active"));
      const link = linkMap.get(en.target.id);
      if (link) link.classList.add("is-active");
    }),
    { rootMargin: "-40% 0px -52% 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));

  /* ---------------- Pinned horizontal works gallery ---------------- */
  const worksSection = document.getElementById("work");
  const worksTrack = document.getElementById("worksTrack");
  const worksIdx = document.getElementById("worksIdx");
  const worksBar = document.getElementById("worksBar");
  const workCardCount = 6;
  const coverCards = worksTrack ? [...worksTrack.querySelectorAll(".work-card")] : [];
  let worksTop = 0;
  let worksMaxX = 0;

  const layoutWorks = () => {
    if (!worksSection) return;
    if (window.innerWidth <= 900 || reduceMotion) {
      worksSection.style.height = "";
      worksMaxX = 0;
      worksTrack.style.transform = "";
      return;
    }
    worksSection.style.height = "";
    worksMaxX = Math.max(0, worksTrack.scrollWidth - window.innerWidth);
    worksSection.style.height = `${window.innerHeight + worksMaxX}px`;
    worksTop = worksSection.getBoundingClientRect().top + window.scrollY;
  };

  /* ---------------- Scroll-scrubbed cinematic reel ----------------
     The pinned reel maps scroll distance to video.currentTime, so the
     clip plays forward as you scroll down and reverses as you scroll up.
     The all-intra encode (every frame a keyframe) makes those seeks
     instant in both directions; an extra lerp on the time keeps it silky.
     Desktop scrubs; mobile / reduced-motion fall back to a plain plate. */
  const reelSection = document.getElementById("reel");
  const reelVideo = document.getElementById("reelVideo");
  const reelStage = document.getElementById("reelStage");
  const reelBarFill = document.getElementById("reelBarFill");
  const reelScenes = [...document.querySelectorAll("#reelScenes .reel-scene")];
  const REEL_SCRUB_VH = 4.6; // viewport-heights of scroll across the whole sequence
  // each scene's [in, out] window along sequence progress p ∈ [0,1]
  const REEL_WINDOWS = [
    { in: -0.03, out: 0.18 }, // intro title
    { in: 0.22, out: 0.48 },  // stats
    { in: 0.52, out: 0.86 },  // manifesto
    { in: 0.90, out: 1.06 },  // outro
  ];
  const REEL_FADE = 0.05;
  let reelTop = 0, reelMaxScroll = 0, reelDuration = 0, reelDisplayTime = 0;
  let reelReady = false, reelLoaded = false, reelScrub = false;

  // stat counters — run once when the stats scene lights up
  const reelCounters = [...document.querySelectorAll("[data-rcount]")];
  let reelCounted = false;
  const runReelCounters = () => {
    if (reelCounted) return;
    reelCounted = true;
    reelCounters.forEach((el) => {
      const target = parseFloat(el.dataset.rcount);
      if (reduceMotion) { el.textContent = target; return; }
      const start = performance.now();
      const tick = (now) => {
        const t = clamp((now - start) / 1400, 0, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  // manifesto word-by-word illumination (tied to its scene's scroll window)
  const reelManifesto = document.getElementById("reelManifesto");
  let reelMfWords = [];
  let reelMfLit = -1;
  if (reelManifesto && !reduceMotion) {
    const wrapReelWords = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((piece) => {
            if (piece === "" || /^\s+$/.test(piece)) {
              frag.appendChild(document.createTextNode(piece));
            } else {
              const s = document.createElement("span");
              s.className = "w";
              s.textContent = piece;
              frag.appendChild(s);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrapReelWords(child);
        }
      });
    };
    wrapReelWords(reelManifesto);
    reelMfWords = [...reelManifesto.querySelectorAll(".w")];
  }

  // 0→1→0 envelope across a scene window, with soft fades at each edge
  const reelEnvelope = (p, w) => {
    if (p <= w.in || p >= w.out) return 0;
    return Math.max(0, Math.min(1, (p - w.in) / REEL_FADE, (w.out - p) / REEL_FADE));
  };

  const layoutReel = () => {
    if (!reelSection) return;
    reelScrub = window.innerWidth > 900 && !reduceMotion;
    if (!reelScrub) {
      reelSection.style.height = "";
      reelMaxScroll = 0;
      if (reelStage) reelStage.style.transform = "";
      reelScenes.forEach((s) => { s.style.opacity = ""; s.style.transform = ""; s.style.visibility = ""; });
      return;
    }
    reelSection.style.height = `${window.innerHeight * (1 + REEL_SCRUB_VH)}px`;
    reelMaxScroll = window.innerHeight * REEL_SCRUB_VH;
    reelTop = reelSection.getBoundingClientRect().top + window.scrollY;
  };

  if (reelVideo) {
    const loadReel = () => {
      if (reelLoaded || reduceMotion) return;
      reelLoaded = true;
      // small screens never scrub — give them the light 720p loop instead
      reelVideo.src = window.innerWidth <= 900
        ? "assets/video/reel-mobile.mp4"
        : "assets/video/reel.mp4";
      reelVideo.load();
    };

    reelVideo.addEventListener("loadedmetadata", () => {
      reelDuration = reelVideo.duration || 7;
      reelReady = true;
    });

    // load lazily as the reel approaches; loop-play it where we don't scrub
    const reelIO = new IntersectionObserver(([en]) => {
      if (en.isIntersecting) {
        loadReel();
        if (!reelScrub && !reduceMotion) {
          reelVideo.loop = true;
          reelVideo.play().catch(() => {});
        }
      } else if (!reelScrub) {
        reelVideo.pause();
      }
    }, { rootMargin: "60% 0px 60% 0px" });
    reelIO.observe(reelSection);
  }

  // when we're NOT scrubbing (mobile / reduced-motion), the scenes are just
  // stacked — so count the stats up the usual way, on scroll into view.
  const reelStatsEl = document.querySelector(".reel-stats");
  if (reelStatsEl) {
    const reelStatsIO = new IntersectionObserver(([en]) => {
      if (en.isIntersecting && !reelScrub) { runReelCounters(); reelStatsIO.disconnect(); }
    }, { threshold: 0.35 });
    reelStatsIO.observe(reelStatsEl);
  }

  /* ---------------- Story stacking cards ---------------- */
  const storyCards = [...document.querySelectorAll(".story-card")];

  /* ---------------- Header / hero / scrub loop ---------------- */
  const header = document.getElementById("header");
  const scrollProgress = document.getElementById("scrollProgress");
  const heroInner = document.getElementById("heroInner");
  const marqueeBig = document.getElementById("marqueeBig");
  let marqueeX = 0;
  let marqueeWidth = 0;
  let marqueeVisible = false;
  let lastY = window.scrollY;

  if (marqueeBig) {
    const vis = new IntersectionObserver(([en]) => { marqueeVisible = en.isIntersecting; });
    vis.observe(marqueeBig.parentElement);
  }

  const measureMarquee = () => {
    if (marqueeBig) marqueeWidth = marqueeBig.children[0].getBoundingClientRect().width;
  };

  const scrub = (y, vh, frameVelocity) => {
    // top progress
    const max = maxScroll();
    scrollProgress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    // header
    header.classList.toggle("is-scrolled", y > 14);
    if (!navLinks.classList.contains("is-open")) {
      if (y > 520 && y > lastY + 5) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 520) header.classList.remove("is-hidden");
    }
    lastY = y;

    if (reduceMotion) return;

    // hero drift + fade
    if (heroInner && y < vh * 1.25) {
      const p = clamp(y / (vh * 0.9), 0, 1);
      heroInner.style.transform = `translateY(${(y * 0.22).toFixed(1)}px)`;
      heroInner.style.opacity = String(1 - p * 1.06);
    }

    // manifesto fill
    if (manifestoWords.length) {
      const r = manifesto.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) {
        const total = r.height + vh * 0.34;
        const p = clamp((vh * 0.78 - r.top) / total, 0, 1);
        const lit = Math.floor(p * manifestoWords.length);
        if (lit !== manifestoLit) {
          const from = Math.min(lit, manifestoLit + 1);
          for (let i = 0; i < manifestoWords.length; i++) {
            manifestoWords[i].classList.toggle("lit", i < lit);
          }
          manifestoLit = lit;
        }
      }
    }

    // story stacking
    for (let i = 0; i < storyCards.length - 1; i++) {
      const nextTop = storyCards[i + 1].getBoundingClientRect().top;
      storyCards[i].classList.toggle("is-covered", nextTop < vh * 0.58);
    }

    // works gallery
    if (worksMaxX > 0) {
      const p = clamp((y - worksTop) / worksMaxX, 0, 1);
      worksTrack.style.transform = `translate3d(${(-p * worksMaxX).toFixed(1)}px, 0, 0)`;
      if (worksIdx) {
        worksIdx.textContent = String(1 + Math.round(p * (workCardCount - 1))).padStart(2, "0");
      }
      if (worksBar) worksBar.style.transform = `scaleX(${p})`;

      // coverflow: cards swing in 3D and recede as they leave centre
      const vcx = window.innerWidth / 2;
      for (const card of coverCards) {
        const r = card.getBoundingClientRect();
        const off = clamp((r.left + r.width / 2 - vcx) / window.innerWidth, -1, 1);
        card.style.setProperty("--cry", `${(-off * 24).toFixed(2)}deg`);
        card.style.setProperty("--cz", `${(-Math.abs(off) * 260).toFixed(1)}px`);
        card.style.setProperty("--cflat", (1 - Math.min(Math.abs(off) * 1.6, 0.7)).toFixed(3));
      }
    }

    // big marquee: constant drift + scroll-velocity skew
    if (marqueeBig && marqueeVisible && marqueeWidth > 0) {
      marqueeX = (marqueeX - 0.55 - Math.abs(frameVelocity) * 0.06) % marqueeWidth;
      const skew = clamp(frameVelocity * 0.045, -7, 7);
      marqueeBig.style.transform = `translate3d(${marqueeX.toFixed(1)}px, 0, 0) skewX(${skew.toFixed(2)}deg)`;
    }
  };

  /* ---------------- Master rAF loop ---------------- */
  const loop = () => {
    let frameVelocity = 0;

    if (smooth.enabled) {
      const diff = smooth.target - smooth.current;
      if (Math.abs(diff) > 0.06) {
        smooth.current = Math.abs(diff) < 0.5 ? smooth.target : lerp(smooth.current, smooth.target, 0.1);
        smooth.lastSet = Math.round(smooth.current);
        window.scrollTo(0, smooth.current);
        frameVelocity = diff;
      }
      smooth.velocity = frameVelocity;
    } else {
      frameVelocity = window.scrollY - smooth.current;
      smooth.current = window.scrollY;
    }

    scrub(window.scrollY, window.innerHeight, frameVelocity);
    requestAnimationFrame(loop);
  };

  /* ---------------- Cursor ---------------- */
  if (finePointer && !reduceMotion) {
    const cursor = document.getElementById("cursor");
    const cursorDot = document.getElementById("cursorDot");
    const cursorLabel = document.getElementById("cursorLabel");
    let mx = -100, my = -100, cx = -100, cy = -100;

    window.addEventListener("pointermove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!body.classList.contains("cursor-active")) body.classList.add("cursor-active");
      cursorDot.style.left = `${mx}px`;
      cursorDot.style.top = `${my}px`;
    }, { passive: true });

    document.addEventListener("pointerover", (e) => {
      const labelled = e.target.closest("[data-cursor]");
      const zone = e.target.closest("[data-cursor-zone]");
      const interactive = e.target.closest("a, button");
      const label = labelled ? labelled.dataset.cursor : (!interactive && zone && window.innerWidth > 900) ? zone.dataset.cursorZone : "";
      cursorLabel.textContent = label;
      cursor.classList.toggle("has-label", !!label);
      cursorDot.classList.toggle("is-hidden", !!label);
      cursor.classList.toggle("is-link", !label && !!interactive);
    });

    const cursorLoop = () => {
      cx = lerp(cx, mx, 0.17);
      cy = lerp(cy, my, 0.17);
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      requestAnimationFrame(cursorLoop);
    };
    cursorLoop();
  }

  /* ---------------- Hero WebGL scene lives in assets/js/hero3d.js ---------------- */

  /* ---------------- Tilt (work cards) ---------------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("pointerenter", () => {
        card.classList.add("is-tilting");
        card.classList.remove("is-tilt-leaving");
      });
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const rx = (0.5 - (e.clientY - r.top) / r.height) * 4.2;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 4.2;
        // Pointer tilt writes its own vars so it stacks with the
        // scroll-driven coverflow rotation instead of overwriting it.
        card.style.setProperty("--mrx", `${rx.toFixed(2)}deg`);
        card.style.setProperty("--mry", `${ry.toFixed(2)}deg`);
        const gx = ((e.clientX - r.left) / r.width * 100).toFixed(1);
        const gy = ((e.clientY - r.top) / r.height * 100).toFixed(1);
        card.style.setProperty("--gx", `${gx}%`);
        card.style.setProperty("--gy", `${gy}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.classList.add("is-tilt-leaving");
        card.style.setProperty("--mrx", "0deg");
        card.style.setProperty("--mry", "0deg");
        setTimeout(() => card.classList.remove("is-tilt-leaving"), 720);
      });
    });
  }

  /* ---------------- Magnetic ---------------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointerenter", () => el.classList.add("is-magnet"));
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(dx * 0.18).toFixed(1)}px, ${(dy * 0.26).toFixed(1)}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.classList.remove("is-magnet");
        el.style.transform = "";
      });
    });
  }

  /* ---------------- Copy email + toast ---------------- */
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  };

  const copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("karavelx@gmail.com");
        showToast("Email copied — talk soon");
      } catch {
        showToast("karavelx@gmail.com");
      }
    });
  }

  /* ---------------- Layout + boot ---------------- */
  const relayout = () => {
    layoutWorks();
    layoutReel();
    measureMarquee();
  };

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      relayout();
      if (canvas && !reduceMotion) {
        // dust canvas rebuild handled inside its own scope via event
      }
      smooth.target = clamp(smooth.target, 0, maxScroll());
    }, 180);
  }, { passive: true });

  window.addEventListener("load", relayout, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  relayout();
  loop();

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
