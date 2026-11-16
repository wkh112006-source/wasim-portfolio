"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Shared so the header can pause scrolling while the mobile menu is open.
export const lenisRef: { current: Lenis | null } = { current: null };

const $$ = <T extends HTMLElement = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

export function Motion() {
  useEffect(() => {
    const root = document.documentElement;

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const target = a.hash === "#top" ? 0 : document.querySelector<HTMLElement>(a.hash);
      if (target === null) return;
      e.preventDefault();
      if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 1.6 });
      else if (target === 0) window.scrollTo({ top: 0 });
      else target.scrollIntoView();
    };
    document.addEventListener("click", onAnchor);

    ScrollTrigger.config({ ignoreMobileResize: true });
    const mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" },
      (ctx) => {
        const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
        if (!motion) {
          root.removeAttribute("data-intro");
          return;
        }
        root.classList.add("motion");
        const cleanups: (() => void)[] = [];

        // ---------- Smooth scroll ----------
        const lenis = new Lenis({ lerp: 0.09 });
        lenisRef.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        const nav = document.querySelector<HTMLElement>("[data-nav]")!;
        const setProgress = gsap.quickSetter("[data-progress]", "scaleX");
        lenis.on("scroll", (l: Lenis) => {
          setProgress(l.progress || 0);
          nav.toggleAttribute("data-hidden", l.direction === 1 && l.scroll > 240);
          nav.toggleAttribute("data-scrolled", l.scroll > 40);
        });

        // ---------- Hero entrance (played by the intro, or right away) ----------
        const heroSplits = $$("[data-hero-name] [data-split]").map((el) =>
          SplitText.create(el, { type: "words,chars", mask: "chars" }),
        );
        const hero = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out" } })
          .from(heroSplits.flatMap((s) => s.chars), { yPercent: 115, duration: 1.4, stagger: 0.04 })
          .from("[data-hero-photo]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0)
          .from("[data-hero-photo] img", { scale: 1.4, duration: 1.8 }, 0)
          .from("[data-hero-copy] > *, .hero__meta > *", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.4)
          .from("[data-nav]", { yPercent: -120, duration: 1 }, 0.5)
          .from("[data-hero-scroll]", { autoAlpha: 0, duration: 1 }, 0.9);

        // ---------- Intro ----------
        const introEl = document.querySelector<HTMLElement>("[data-intro-el]");
        if (root.hasAttribute("data-intro") && introEl) {
          lenis.stop();
          window.scrollTo(0, 0);
          const counter = introEl.querySelector("[data-intro-count]")!;
          const count = { v: 0 };
          const name = SplitText.create("[data-intro-name]", { type: "words,chars", mask: "chars" });
          const intro = gsap
            .timeline({
              defaults: { ease: "expo.out" },
              onComplete: () => {
                root.removeAttribute("data-intro");
                try {
                  sessionStorage.setItem("intro", "1");
                } catch {}
                lenis.start();
              },
            })
            .from("[data-intro-log] p", { autoAlpha: 0, x: -16, stagger: 0.3, duration: 0.5, ease: "power2.out" }, 0)
            .to(count, {
              v: 100,
              duration: 2.1,
              ease: "power2.inOut",
              onUpdate: () => {
                counter.textContent = String(Math.round(count.v)).padStart(3, "0");
              },
            }, 0)
            .fromTo("[data-intro-bar]", { scaleX: 0 }, { scaleX: 1, duration: 2.1, ease: "power2.inOut" }, 0)
            .from(name.chars, { yPercent: 115, stagger: 0.035, duration: 1.1 }, 0.25)
            .to(name.chars, { yPercent: -115, stagger: 0.015, duration: 0.55, ease: "power3.in" }, 2.15)
            .to(introEl, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.15, ease: "expo.inOut" }, 2.45)
            .add(() => {
              hero.play();
            }, 2.95);
          const skip = () => intro.timeScale(6);
          introEl.addEventListener("click", skip);
          cleanups.push(() => introEl.removeEventListener("click", skip));
        } else {
          hero.play();
        }

        // Hero subtle parallax on desktop only
        if (window.matchMedia("(min-width: 769px)").matches) {
          gsap
            .timeline({ scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } })
            .to("[data-hero-name]", { yPercent: -15, ease: "none" }, 0)
            .to("[data-hero-photo]", { yPercent: -10, ease: "none" }, 0);
        }

        // ---------- Responsive Card Stacking Animation ----------
        const stackSections = [
          document.querySelector<HTMLElement>("[data-hero]"),
          document.querySelector<HTMLElement>("#about"),
          document.querySelector<HTMLElement>("#projects"),
          document.querySelector<HTMLElement>("#skills"),
          document.querySelector<HTMLElement>("#experience"),
          document.querySelector<HTMLElement>("#education"),
          document.querySelector<HTMLElement>("#contact"),
        ].filter(Boolean) as HTMLElement[];

        stackSections.forEach((sec, idx) => {
          const nextSec = stackSections[idx + 1];
          if (!nextSec) return;

          gsap.to(sec, {
            scale: 0.95,
            opacity: 0.85,
            ease: "none",
            transformOrigin: "center top",
            scrollTrigger: {
              trigger: nextSec,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          });
        });

        // ---------- Projects: horizontal slider (desktop) / touch carousel (mobile) ----------
        const projects = document.querySelector<HTMLElement>("[data-projects]");
        const track = projects?.querySelector<HTMLElement>("[data-track]");
        const cards = track ? $$("[data-project]", track) : [];
        const indexEl = projects?.querySelector("[data-project-index]");
        const setBar = gsap.quickSetter("[data-project-bar]", "scaleX");
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const dist = () => (track ? Math.max(0, track.offsetWidth - window.innerWidth + 60) : 0);

        if (isDesktop && projects && track && dist() > 0) {
          const slide = gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: projects,
              start: "top top",
              end: () => `+=${dist()}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                setBar(p);
                if (indexEl) {
                  indexEl.textContent = String(Math.round(p * (cards.length - 1)) + 1).padStart(2, "0");
                }
              },
            },
          });

          cards.forEach((card) => {
            gsap.from(card.querySelectorAll(".project__body > *"), {
              y: 35,
              autoAlpha: 0,
              stagger: 0.05,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 85%" },
            });
          });
        } else {
          cards.forEach((card) => {
            gsap.from(card.querySelectorAll(".project__body > *"), {
              y: 30,
              autoAlpha: 0,
              stagger: 0.05,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            });
          });
        }

        // ---------- Text reveals ----------
        $$("[data-split]")
          .filter((el) => !el.closest("[data-hero-name]"))
          .forEach((el) => {
            const split = SplitText.create(el, { type: "words,chars", mask: "chars" });
            gsap.from(split.chars, {
              yPercent: 115,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.018,
              scrollTrigger: { trigger: el, start: "top 88%" },
            });
          });

        $$("[data-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
            },
          );
        });

        gsap.set("[data-fade]", { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch("[data-fade]", {
          start: "top 92%",
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" }),
        });

        $$("[data-skill-row]").forEach((row) => {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 88%" }, defaults: { ease: "power3.out" } })
            .from(row, { "--draw": 0, duration: 1.2, ease: "expo.inOut" })
            .from(row.querySelectorAll(".skills__idx, .skills__cat"), { y: 30, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.15)
            .from(row.querySelectorAll("li"), { y: 20, autoAlpha: 0, scale: 0.9, duration: 0.6, stagger: 0.04 }, 0.3);
        });

        $$("[data-timeline]").forEach((list) => {
          gsap.fromTo(
            list.querySelector("[data-timeline-line]"),
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 80%", end: "bottom 60%", scrub: true } },
          );
        });

        // Footer name rises out of the floor.
        gsap.from(".footer__big", {
          yPercent: 60,
          ease: "none",
          scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true },
        });

        // ---------- Marquee: constant drift, speeds up with scroll velocity ----------
        const marquee = gsap.to("[data-marquee]", { xPercent: -50, repeat: -1, duration: 28, ease: "none" });
        lenis.on("scroll", (l: Lenis) => {
          gsap.to(marquee, { timeScale: 1 + Math.min(Math.abs(l.velocity) / 8, 5), duration: 0.4, overwrite: true });
        });

        // ---------- Active nav link ----------
        $$("[data-nav-link]").forEach((link) => {
          const section = document.getElementById(link.dataset.navLink!);
          if (!section) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => link.classList.toggle("is-active", self.isActive),
          });
        });

        // ---------- Pointer niceties (mouse only) ----------
        if (fine) {
          const cursor = document.querySelector<HTMLElement>("[data-cursor]")!;
          const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
          const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
          const move = (e: PointerEvent) => {
            cx(e.clientX);
            cy(e.clientY);
            cursor.toggleAttribute("data-hover", !!(e.target as Element).closest("a, button"));
          };
          window.addEventListener("pointermove", move);
          cleanups.push(() => window.removeEventListener("pointermove", move));

          $$("[data-magnetic]").forEach((el) => {
            const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const onMove = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              mx((e.clientX - r.left - r.width / 2) * 0.3);
              my((e.clientY - r.top - r.height / 2) * 0.3);
            };
            const onLeave = () => {
              mx(0);
              my(0);
            };
            el.addEventListener("pointermove", onMove);
            el.addEventListener("pointerleave", onLeave);
            cleanups.push(() => {
              el.removeEventListener("pointermove", onMove);
              el.removeEventListener("pointerleave", onLeave);
            });
          });
        }

        document.fonts.ready.then(() => ScrollTrigger.refresh());

        return () => {
          cleanups.forEach((fn) => fn());
          gsap.ticker.remove(raf);
          lenis.destroy();
          lenisRef.current = null;
          root.classList.remove("motion");
        };
      },
    );

    return () => {
      document.removeEventListener("click", onAnchor);
      mm.revert();
    };
  }, []);

  return null;
}
