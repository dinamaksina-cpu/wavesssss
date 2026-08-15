"use client";

import { useEffect } from "react";

const selectors = [
  ".section-heading",
  ".service-card",
  ".benefit-grid article",
  ".gallery-item",
  ".steps-grid > *",
  ".contact-card",
  ".price-row",
  ".accordion-item",
  ".about-visual",
  ".service-detail-image",
  ".contact-cta-inner",
];

export function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.classList.add("bw-motion-ready");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")));

    nodes.forEach((node, index) => {
      node.classList.add("bw-reveal");
      node.style.setProperty("--bw-delay", `${Math.min((index % 4) * 70, 210)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("bw-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));

    const hero = document.querySelector<HTMLElement>(".hero");
    if (hero) requestAnimationFrame(() => hero.classList.add("bw-hero-ready"));

    return () => {
      observer.disconnect();
      root.classList.remove("bw-motion-ready");
      nodes.forEach((node) => {
        node.classList.remove("bw-reveal", "bw-revealed");
        node.style.removeProperty("--bw-delay");
      });
      hero?.classList.remove("bw-hero-ready");
    };
  }, []);

  return null;
}
