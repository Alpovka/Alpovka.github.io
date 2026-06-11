/* ============================================================
   AlpovkApps — interaction engine
   Theme · preloader · cursor · particles · parallax · reveals
   counters · tilt · magnetic · story/process/timeline scrollers
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
    if (themeMeta) themeMeta.content = theme === "dark" ? "#07070d" : "#f7f7fc";
  };

  // Dark is the brand default; only an explicit visitor choice overrides it.
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === "light" || storedTheme === "dark") applyTheme(storedTheme);

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    const next = doc.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);

    const swap = () => {
      applyTheme(next);
      refreshParticleColor();
    };

    // Circular reveal from the toggle button (progressive enhancement)
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
            { duration: 620, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
          );
        })
        .catch(() => {});
    } else {
      swap();
    }
  });

  /* ---------------- Preloader ---------------- */
  const preloader = document.getElementById("preloader");
  const seen = sessionStorage.getItem("alpovkapps-seen");

  const finishLoading = () => {
    preloader.classList.add("is-done");
    body.classList.remove("is-loading");
    body.classList.add("is-ready");
  };

  if (reduceMotion || seen) {
    preloader.style.display = "none";
    body.classList.add("is-ready");
  } else {
    body.classList.add("is-loading");
    sessionStorage.setItem("alpovkapps-seen", "1");
    window.addEventListener("load", () => setTimeout(finishLoading, 950), { once: true });
    setTimeout(finishLoading, 2600); // hard cap, never trap the visitor
  }

  /* ---------------- Header ---------------- */
  const header = document.getElementById("header");
  let lastScrollY = window.scrollY;

  /* ---------------- Mobile nav ---------------- */
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    burger.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    const open = !navLinks.classList.contains("is-open");
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
      setTimeout(() => prev.classList.remove("is-leaving"), 600);
    }, 2600);
  }

  /* ---------------- Reveal on scroll ---------------- */
  const revealables = document.querySelectorAll("[data-reveal], .case-flagship");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );
  revealables.forEach((el) => revealObserver.observe(el));

  /* ---------------- Counters ---------------- */
  const counters = document.querySelectorAll("[data-count-to]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counterObserver.unobserve(entry.target);
        const el = entry.target;
        const target = parseFloat(el.dataset.countTo);
        if (reduceMotion) { el.textContent = target; return; }
        const start = performance.now();
        const duration = 1600;
        const tick = (now) => {
          const p = clamp((now - start) / duration, 0, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  /* ---------------- Active nav link ---------------- */
  const sections = document.querySelectorAll("section[id]");
  const linkMap = new Map(
    [...document.querySelectorAll(".nav-link")].map((a) => [a.getAttribute("href").slice(1), a])
  );
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        linkMap.forEach((link) => link.classList.remove("is-active"));
        const link = linkMap.get(entry.target.id);
        if (link) link.classList.add("is-active");
      });
    },
    { rootMargin: "-42% 0px -52% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------------- Story chapters ---------------- */
  const storyNum = document.getElementById("storyNum");
  const storyChapters = document.querySelectorAll(".story-chapter");
  if (storyNum && storyChapters.length) {
    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const num = entry.target.dataset.chapter;
          if (storyNum.textContent === num) return;
          if (reduceMotion) { storyNum.textContent = num; return; }
          storyNum.classList.add("is-swapping");
          setTimeout(() => {
            storyNum.textContent = num;
            storyNum.classList.remove("is-swapping");
          }, 300);
        });
      },
      { rootMargin: "-38% 0px -52% 0px" }
    );
    storyChapters.forEach((c) => chapterObserver.observe(c));
  }

  /* ---------------- Scroll-driven engine ----------------
     One rAF-throttled pass handles: progress bar, header state,
     hero drift, parallax layers, story/process/timeline fills. */
  const scrollProgress = document.getElementById("scrollProgress");
  const heroInner = document.getElementById("heroInner");
  const hero = document.querySelector(".hero");
  const parallaxEls = [...document.querySelectorAll("[data-parallax]")].map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax),
    fixed: !!el.closest(".ambient"),
  }));
  const storyChaptersWrap = document.querySelector(".story-chapters");
  const storyProgressBar = document.getElementById("storyProgressBar");
  const processLineFill = document.getElementById("processLineFill");
  const processTrack = document.querySelector(".process-track");
  const timelineFill = document.getElementById("timelineFill");
  const timeline = document.querySelector(".timeline");

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = doc.scrollHeight - vh;

      // top progress bar
      scrollProgress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

      // header: glass when scrolled, hide on fast downward scroll
      header.classList.toggle("is-scrolled", y > 14);
      if (!navLinks.classList.contains("is-open")) {
        if (y > 480 && y > lastScrollY + 6) header.classList.add("is-hidden");
        else if (y < lastScrollY - 4 || y < 480) header.classList.remove("is-hidden");
      }
      lastScrollY = y;

      if (reduceMotion) return;

      // hero drift + fade out
      if (hero && y < vh * 1.2) {
        const p = clamp(y / (vh * 0.85), 0, 1);
        heroInner.style.transform = `translateY(${y * 0.28}px)`;
        heroInner.style.opacity = String(1 - p * 1.05);
      }

      // parallax layers
      for (const item of parallaxEls) {
        if (item.fixed) {
          item.el.style.transform = `translate3d(0, ${y * item.speed}px, 0)`;
        } else {
          const r = item.el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const offset = (r.top + r.height / 2 - vh / 2) * item.speed;
          item.el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      }

      // story progress rail
      if (storyChaptersWrap && storyProgressBar) {
        const r = storyChaptersWrap.getBoundingClientRect();
        const p = clamp((vh * 0.55 - r.top) / r.height, 0, 1);
        storyProgressBar.style.transform = `scaleY(${p})`;
      }

      // process connecting line
      if (processTrack && processLineFill) {
        const r = processTrack.getBoundingClientRect();
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0, 1);
        processLineFill.style.transform = `scaleX(${p})`;
      }

      // journey timeline fill
      if (timeline && timelineFill) {
        const r = timeline.getBoundingClientRect();
        const p = clamp((vh * 0.7 - r.top) / r.height, 0, 1);
        timelineFill.style.transform = `scaleY(${p})`;
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---------------- Custom cursor ---------------- */
  if (finePointer && !reduceMotion) {
    const cursor = document.getElementById("cursor");
    const cursorDot = document.getElementById("cursorDot");
    let mx = -100, my = -100, cx = -100, cy = -100;

    window.addEventListener("pointermove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!body.classList.contains("cursor-active")) body.classList.add("cursor-active");
      cursorDot.style.left = `${mx}px`;
      cursorDot.style.top = `${my}px`;
    }, { passive: true });

    document.addEventListener("pointerover", (e) => {
      cursor.classList.toggle(
        "is-hovering",
        !!e.target.closest("a, button, [data-tilt]")
      );
    });

    const cursorLoop = () => {
      cx = lerp(cx, mx, 0.16);
      cy = lerp(cy, my, 0.16);
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      requestAnimationFrame(cursorLoop);
    };
    cursorLoop();
  }

  /* ---------------- Hero particle field ---------------- */
  const canvas = document.getElementById("heroCanvas");
  let particleRGB = "124, 108, 255";

  function refreshParticleColor() {
    particleRGB = getComputedStyle(doc).getPropertyValue("--particle").trim() || particleRGB;
  }

  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let width = 0, height = 0;
    let pointerX = -9999, pointerY = -9999;
    let running = true;

    refreshParticleColor();

    const build = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = clamp(Math.floor((width * height) / 17000), 28, 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.7 + 0.7,
      }));
    };

    const LINK_DIST = 130;

    const frame = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // gentle pointer repulsion
        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0.01) {
          const force = ((150 - dist) / 150) * 0.5;
          p.vx += (dx / dist) * force * 0.12;
          p.vy += (dy / dist) * force * 0.12;
        }
        p.vx = clamp(p.vx, -0.55, 0.55) * 0.996;
        p.vy = clamp(p.vy, -0.55, 0.55) * 0.996;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -12) p.x = width + 12; else if (p.x > width + 12) p.x = -12;
        if (p.y < -12) p.y = height + 12; else if (p.y > height + 12) p.y = -12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleRGB}, 0.55)`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x;
          if (dx > LINK_DIST || dx < -LINK_DIST) continue;
          const dy = a.y - b.y;
          if (dy > LINK_DIST || dy < -LINK_DIST) continue;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${particleRGB}, ${(0.22 * (1 - d / LINK_DIST)).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      requestAnimationFrame(frame);
    };

    canvas.parentElement.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    }, { passive: true });
    canvas.parentElement.addEventListener("pointerleave", () => {
      pointerX = -9999;
      pointerY = -9999;
    });

    // only burn cycles while the hero is on screen and the tab is visible
    const heroVisibility = new IntersectionObserver(([entry]) => {
      const shouldRun = entry.isIntersecting && !document.hidden;
      if (shouldRun && !running) { running = true; frame(); }
      else if (!shouldRun) running = false;
    });
    heroVisibility.observe(canvas.parentElement);
    document.addEventListener("visibilitychange", () => {
      const onScreen = canvas.parentElement.getBoundingClientRect().bottom > 0;
      const shouldRun = !document.hidden && onScreen;
      if (shouldRun && !running) { running = true; frame(); }
      else if (!shouldRun) running = false;
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 180);
    }, { passive: true });

    build();
    frame();
  }

  /* ---------------- 3D tilt cards ---------------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const max = card.hasAttribute("data-tilt-soft") ? 3 : 7;

      card.addEventListener("pointerenter", () => {
        card.classList.add("is-tilting");
        card.classList.remove("is-tilt-leaving");
      });

      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * max;
        const ry = (px - 0.5) * max;
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
        card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      });

      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.classList.add("is-tilt-leaving");
        card.style.transform = "";
        setTimeout(() => card.classList.remove("is-tilt-leaving"), 650);
      });
    });
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointerenter", () => el.classList.add("is-magnet"));
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(dx * 0.22).toFixed(1)}px, ${(dy * 0.3).toFixed(1)}px)`;
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
        showToast("Email copied — talk soon ✦");
      } catch {
        showToast("karavelx@gmail.com");
      }
    });
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
