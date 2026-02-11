import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// One-time global motion setup:
// - Smooth scrolling (Lenis)
// - Scroll-triggered reveals via data attributes
// - Safe cleanup, respects prefers-reduced-motion
export default function MotionOrchestrator() {
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        smoothTouch: false,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Keep ScrollTrigger in sync with Lenis
      lenis.on("scroll", () => ScrollTrigger.update());
    }

    // Global reveal helpers (minimal authoring in components)
    const ctx = gsap.context(() => {
      const baseEase = "power3.out";

      // Fade/slide up
      gsap.utils.toArray<HTMLElement>("[data-reveal='up']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: baseEase,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      // Mask reveal (clip-path)
      gsap.utils.toArray<HTMLElement>("[data-reveal='mask']").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", opacity: 1 },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.05,
            ease: baseEase,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          }
        );
      });

      // Stagger children
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((wrap) => {
        const children = wrap.querySelectorAll<HTMLElement>("[data-stagger-item]");
        if (!children.length) return;
        gsap.fromTo(
          children,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: baseEase,
            stagger: 0.08,
            scrollTrigger: {
              trigger: wrap,
              start: "top 82%",
            },
          }
        );
      });

      // Subtle parallax for images
      if (!prefersReduced) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: -12 },
            {
              y: 12,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });
      }
    });

    // Anchor links use Lenis for smoothness
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      if (lenis && !prefersReduced) {
        lenis.scrollTo(el, { offset: -90 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}
