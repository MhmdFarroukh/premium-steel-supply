import React, { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type P2 = { x: number; y: number; w: number };

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function damp(current: number, target: number, lambda: number, dt: number) {
  return mix(current, target, 1 - Math.exp(-lambda * dt));
}

function makeRing(n: number): P2[] {
  const pts: P2[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 1 + (Math.random() - 0.5) * 0.06;
    pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, w: 0.7 + Math.random() * 0.8 });
  }
  return pts;
}

function makeIBeam(n: number): P2[] {
  const pts: P2[] = [];
  const flangeN = Math.floor(n * 0.40);
  const webN = n - flangeN * 2;

  for (let i = 0; i < flangeN; i++) {
    const u = i / (flangeN - 1);
    pts.push({ x: (u - 0.5) * 2.0, y: -0.70 + (Math.random() - 0.5) * 0.06, w: 0.7 + Math.random() * 0.8 });
  }
  for (let i = 0; i < flangeN; i++) {
    const u = i / (flangeN - 1);
    pts.push({ x: (u - 0.5) * 2.0, y: 0.70 + (Math.random() - 0.5) * 0.06, w: 0.7 + Math.random() * 0.8 });
  }
  for (let i = 0; i < webN; i++) {
    const u = i / (webN - 1);
    pts.push({ x: (Math.random() - 0.5) * 0.22, y: (u - 0.5) * 1.25, w: 0.6 + Math.random() * 0.7 });
  }

  // shuffle
  for (let i = pts.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  return pts.slice(0, n);
}

function makeTextPoints(text: string, n: number): P2[] {
  const W = 960;
  const H = 420;

  const off = document.createElement("canvas");
  off.width = W;
  off.height = H;
  const c = off.getContext("2d");
  if (!c) return makeRing(n);

  c.clearRect(0, 0, W, H);
  c.fillStyle = "#fff";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.font = "900 280px ui-sans-serif, system-ui, -apple-system, Segoe UI, Inter, Arial";
  c.fillText(text, W / 2, H / 2 + 10);

  const img = c.getImageData(0, 0, W, H).data;
  const candidates: { x: number; y: number }[] = [];

  const step = 3;
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const a = img[(y * W + x) * 4 + 3];
      if (a > 25) candidates.push({ x, y });
    }
  }

  if (candidates.length === 0) return makeRing(n);

  const pts: P2[] = [];
  for (let i = 0; i < n; i++) {
    const p = candidates[(Math.random() * candidates.length) | 0];
    const nx = (p.x / W - 0.5) * 2;
    const ny = (p.y / H - 0.5) * 2;
    pts.push({ x: nx * 1.18, y: ny * 1.18, w: 0.75 + Math.random() * 0.7 });
  }
  return pts;
}

function morph(a: P2[], b: P2[], t: number, out: P2[]) {
  for (let i = 0; i < out.length; i++) {
    out[i].x = mix(a[i].x, b[i].x, t);
    out[i].y = mix(a[i].y, b[i].y, t);
    out[i].w = mix(a[i].w, b[i].w, t);
  }
}

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const progressRef = useRef(0);
  const hoverTargetRef = useRef(0);
  const hoverRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const lastMoveRef = useRef(0);

  const isActiveRef = useRef(true); // pauses drawing when not in view

  // MUCH lighter point count
  const N = useMemo(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w < 700) return 520;
    if (w < 1100) return 720;
    return 880;
  }, []);

  const ring = useMemo(() => makeRing(N), [N]);
  const beam = useMemo(() => makeIBeam(N), [N]);
  const iba = useMemo(() => makeTextPoints("IBA", N), [N]);
  const nowPts = useMemo<P2[]>(() => Array.from({ length: N }, () => ({ x: 0, y: 0, w: 1 })), [N]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const items = root.querySelectorAll("[data-in]");
    gsap.set(items, { opacity: 0, y: 12 });
    gsap.to(items, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.08, delay: 0.06 });

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => (progressRef.current = self.progress),
      onToggle: (self) => (isActiveRef.current = self.isActive),
    });

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      mouseRef.current = { x: clamp(x, 0, 1), y: clamp(y, 0, 1) };
      hoverTargetRef.current = 1;
      lastMoveRef.current = performance.now();
    };
    const onLeave = () => (hoverTargetRef.current = 0);

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const raw = window.devicePixelRatio || 1;
      const dpr = Math.min(raw, 1.35); // lower DPR for smoothness
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // 30 FPS cap (VERY smooth)
    const FPS = 30;
    const FRAME = 1000 / FPS;
    let lastDraw = 0;
    let raf = 0;
    let lastTime: number | null = null;

    const draw = (ts: number) => {
      raf = requestAnimationFrame(draw);

      if (!isActiveRef.current) return; // pause when hero off-screen
      if (ts - lastDraw < FRAME) return;
      lastDraw = ts;

      const dt = (() => {
        const prev = lastTime ?? ts;
        lastTime = ts;
        return clamp((ts - prev) / 1000, 0, 0.05);
      })();

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      const p = smooth(progressRef.current);
      const t = ts / 1000;

      // idle fade for hover
      if (ts - lastMoveRef.current > 650) hoverTargetRef.current = 0;

      hoverRef.current = damp(hoverRef.current, hoverTargetRef.current, 7.5, dt);
      const hover = smooth(clamp(hoverRef.current, 0, 1));

      const mx = mouseRef.current.x - 0.5;
      const my = mouseRef.current.y - 0.5;

      // clear
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#070707";
      ctx.fillRect(0, 0, w, h);

      // --- CHEAP cinematic sweeps (no heavy dot terrain) ---
      // warm sweep
      const sweep1 = ctx.createLinearGradient(0, h * 0.2, w, h * 0.7);
      sweep1.addColorStop(0, "rgba(255,85,0,0)");
      sweep1.addColorStop(0.45, `rgba(255,85,0,${0.10 + 0.08 * (1 - p)})`);
      sweep1.addColorStop(1, "rgba(255,85,0,0)");
      ctx.fillStyle = sweep1;
      ctx.globalAlpha = 0.8;
      ctx.translate(mx * 10, my * 8);
      ctx.fillRect(0, 0, w, h);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // cool white sweep
      const sweep2 = ctx.createRadialGradient(w * (0.65 + mx * 0.1), h * (0.22 + my * 0.08), 0, w * 0.65, h * 0.25, Math.max(w, h) * 0.7);
      sweep2.addColorStop(0, "rgba(255,255,255,0.08)");
      sweep2.addColorStop(0.35, "rgba(255,255,255,0.04)");
      sweep2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = sweep2;
      ctx.fillRect(0, 0, w, h);

      // subtle grain (super cheap)
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < 180; i++) {
        const x = ((Math.sin(i * 999 + t * 2.2) + 1) / 2) * w;
        const y = ((Math.cos(i * 777 + t * 1.9) + 1) / 2) * h;
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1;

      // --- SHAPE morph (cheap) ---
      // scroll morph: ring -> beam -> ring
      if (p < 0.55) {
        const tt = smooth(clamp((p - 0.12) / 0.35, 0, 1));
        morph(ring, beam, tt, nowPts);
      } else {
        const tt = smooth(clamp((p - 0.55) / 0.35, 0, 1));
        morph(beam, ring, tt, nowPts);
      }

      // hover morph into IBA
      if (hover > 0.001) {
        for (let i = 0; i < nowPts.length; i++) {
          nowPts[i].x = mix(nowPts[i].x, iba[i].x, hover);
          nowPts[i].y = mix(nowPts[i].y, iba[i].y, hover);
          nowPts[i].w = mix(nowPts[i].w, iba[i].w, hover);
        }
      }

      const cx = w * 0.60;
      const cy = h * (0.40 + 0.10 * p);
      const size = Math.min(w, h) * (0.16 + 0.06 * (1 - p) + hover * 0.05);

      // rotation is almost none
      const rot = (t * 0.08) * (1 - hover);
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);

      // draw points
      for (let i = 0; i < nowPts.length; i++) {
        const q = nowPts[i];
        const x1 = q.x * cr - q.y * sr;
        const y1 = q.x * sr + q.y * cr;

        const px = cx + x1 * size;
        const py = cy + y1 * size;

        const rr = (0.9 + q.w * 0.6) * (hover > 0.5 ? 1.05 : 1);
        const a = (0.13 + 0.14 * (1 - p)) * (0.75 + hover * 0.55);

        // orange accents
        const hot = hover > 0.55 ? (i % 7 === 0 ? 1 : 0) : (i % 11 === 0 ? 1 : 0);

        ctx.beginPath();
        ctx.fillStyle = hot ? `rgba(255,85,0,${a * 0.26})` : `rgba(255,255,255,${a})`;
        ctx.arc(px, py, rr, 0, Math.PI * 2);
        ctx.fill();
      }

      // vignette
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.55, Math.min(w, h) * 0.18, w * 0.5, h * 0.55, Math.max(w, h) * 0.64);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.60)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
    };

    raf = requestAnimationFrame(draw);

    const big = root.querySelector<HTMLElement>("[data-big]");
    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: true } });
    if (big) tl.fromTo(big, { yPercent: 18, opacity: 0.20 }, { yPercent: -2, opacity: 0.10, ease: "none" }, 0);

    return () => {
      st.kill();
      tl.kill();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [N, ring, beam, iba, nowPts]);

  return (
    <section id="hero" ref={rootRef as any} className="hero-og2">
      <div className="hero-og2__stage">
        <canvas ref={canvasRef} className="hero-og2__canvas" />
        <div className="hero-og2__topline" aria-hidden="true" />

        <div className="hero-og2__content">
          <div className="hero-og2__copy" data-in>
            <p className="hero-og2__kicker">STEEL SUPPLY • FABRICATION</p>

            <h1 className="hero-og2__title">
              Steel for <span className="hero-og2__accent">serious</span> projects.
            </h1>

            <p className="hero-og2__sub">
              Stock-ready supply + fabrication to spec. Clear timelines. Reliable delivery.
            </p>

            <div className="hero-og2__actions">
              <a className="hero-og2__btn hero-og2__btnPrimary" href="#contact">
                Request a quote
              </a>
              <a className="hero-og2__btn hero-og2__btnGhost" href="#products">
                Products
              </a>
            </div>
          </div>

          <div className="hero-og2__big" data-big aria-hidden="true">
            IBA&nbsp;STEEL
          </div>

          <div className="hero-og2__scrollHint" aria-hidden="true">
            <span>Scroll</span>
            <em />
          </div>
        </div>
      </div>

      <div className="hero-og2__scrollSpace" />
    </section>
  );
}
