"use client";

import { useEffect } from "react";

const selectors = [
  ".section-heading",
  ".service-card",
  ".benefit-grid > article",
  ".steps-grid > li",
  ".price-row",
  ".about-visual",
  ".about-grid > div:last-child",
  ".gallery-item",
  ".accordion-item",
  ".contact-card",
  ".contact-map-wrap",
  ".contact-social",
  ".service-detail-image",
  ".service-detail-copy",
  ".service-detail-grid > aside",
  ".contact-cta-inner > div",
  ".footer-grid > *",
  ".page-hero .container > *",
];

export function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    document.documentElement.classList.add("motion-enabled");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")));
    nodes.forEach((el, index) => {
      el.classList.add("motion-reveal");
      el.style.setProperty("--motion-order", String(index % 6));
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach(node => observer.observe(node));

    const hero = document.querySelector<HTMLElement>(".hero");
    const heroImage = document.querySelector<HTMLElement>(".hero-image");
    const heroContent = document.querySelector<HTMLElement>(".hero-content");
    const move = (event: PointerEvent) => {
      if (!hero || !heroImage || window.innerWidth < 800) return;
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty("--pointer-x", x.toFixed(3));
      hero.style.setProperty("--pointer-y", y.toFixed(3));
    };
    hero?.addEventListener("pointermove", move, { passive: true });

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (hero) hero.style.setProperty("--scroll-y", `${Math.min(y, 420)}px`);
        if (heroContent) heroContent.style.setProperty("--hero-scroll", `${Math.min(y * 0.08, 28)}px`);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      hero?.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
