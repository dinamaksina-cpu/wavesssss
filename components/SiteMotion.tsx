"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelectors = [
  ".hero-content > *", ".hero-trust > span", ".section-heading > *", ".service-card",
  ".benefit-grid > article", ".steps-grid > li", ".price-row", ".about-visual",
  ".about-grid > div:last-child > *", ".gallery-item", ".accordion-item", ".contact-card",
  ".contact-map-wrap", ".contact-social", ".service-detail-image", ".service-detail-copy > *",
  ".service-detail-grid > aside", ".contact-cta-inner > div", ".footer-grid > *",
  ".footer-bottom > *", ".page-hero .container > *",
];
const tiltSelector = ".service-card, .gallery-item, .benefit-grid > article, .contact-card";
const parallaxSelector = ".hero-image, .gallery-item img, .about-visual > img, .service-detail-photo";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.add("motion-reduced");
      return () => root.classList.remove("motion-reduced");
    }

    root.classList.add("motion-enabled");
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors.join(",")));
    const tilts = Array.from(document.querySelectorAll<HTMLElement>(tiltSelector));
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>(parallaxSelector));
    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".button"));
    const processSections = Array.from(document.querySelectorAll<HTMLElement>(".steps-section"));

    reveals.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-order", String(index % 5));
      if (element.matches(".gallery-item:nth-child(even), .service-card:nth-child(even)")) element.style.setProperty("--reveal-x", "34px");
      if (element.matches(".gallery-item:nth-child(odd), .service-card:nth-child(odd)")) element.style.setProperty("--reveal-x", "-34px");
    });
    tilts.forEach(element => element.classList.add("motion-tilt"));
    parallaxItems.forEach(element => element.classList.add("motion-parallax"));
    buttons.forEach(element => element.classList.add("motion-magnetic"));

    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    reveals.forEach(element => revealObserver.observe(element));

    const pointerCleanups: Array<() => void> = [];
    const addPointerEffect = (element: HTMLElement, strength: number, tilt = false) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width) - 0.5;
        const y = clamp((event.clientY - rect.top) / rect.height) - 0.5;
        if (tilt) {
          element.style.setProperty("--tilt-x", `${(-y * strength).toFixed(2)}deg`);
          element.style.setProperty("--tilt-y", `${(x * strength).toFixed(2)}deg`);
          element.style.setProperty("--light-x", `${((x + 0.5) * 100).toFixed(1)}%`);
          element.style.setProperty("--light-y", `${((y + 0.5) * 100).toFixed(1)}%`);
        } else {
          element.style.setProperty("--magnet-x", `${(x * strength).toFixed(2)}px`);
          element.style.setProperty("--magnet-y", `${(y * strength).toFixed(2)}px`);
        }
      };
      const leave = () => {
        element.style.removeProperty(tilt ? "--tilt-x" : "--magnet-x");
        element.style.removeProperty(tilt ? "--tilt-y" : "--magnet-y");
        if (tilt) { element.style.removeProperty("--light-x"); element.style.removeProperty("--light-y"); }
      };
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", leave);
      pointerCleanups.push(() => { element.removeEventListener("pointermove", move); element.removeEventListener("pointerleave", leave); });
    };
    tilts.forEach(element => addPointerEffect(element, 7, true));
    buttons.forEach(element => addPointerEffect(element, 8));

    const hero = document.querySelector<HTMLElement>(".hero");
    const heroImage = document.querySelector<HTMLElement>(".hero-image");
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.classList.add("has-active-pointer");
      if (!hero || !heroImage || window.innerWidth < 800) return;
      const rect = hero.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width) - 0.5;
      const y = clamp((event.clientY - rect.top) / rect.height) - 0.5;
      heroImage.style.setProperty("--hero-pointer-x", `${(x * 16).toFixed(2)}px`);
      heroImage.style.setProperty("--hero-pointer-y", `${(y * 10).toFixed(2)}px`);
    };
    window.addEventListener("pointermove", pointerMove, { passive: true });

    let frame = 0;
    const updateScrollMotion = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
      root.style.setProperty("--scroll-progress", String(clamp(window.scrollY / scrollable)));
      for (const element of parallaxItems) {
        const rect = element.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = (center - viewportHeight / 2) / viewportHeight;
        const strength = element.classList.contains("hero-image") ? 18 : 24;
        element.style.setProperty("--parallax-shift", `${clamp(-distance, -1, 1) * strength}px`);
      }
      for (const section of processSections) {
        const rect = section.getBoundingClientRect();
        const progress = clamp((viewportHeight * 0.72 - rect.top) / Math.max(rect.height * 0.72, 1));
        section.style.setProperty("--process-progress", String(progress));
        const steps = Array.from(section.querySelectorAll<HTMLElement>(".steps-grid > li"));
        const activeIndex = Math.min(steps.length - 1, Math.max(0, Math.floor(progress * steps.length)));
        steps.forEach((step, index) => step.classList.toggle("is-process-active", index <= activeIndex));
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateScrollMotion);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollMotion();

    return () => {
      revealObserver.disconnect();
      pointerCleanups.forEach(cleanup => cleanup());
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("motion-enabled", "has-active-pointer");
      root.style.removeProperty("--scroll-progress");
    };
  }, [pathname]);

  return <><div className="site-scroll-progress" aria-hidden="true"><i /></div><div className="site-cursor-glow" aria-hidden="true" /></>;
}
