import type { Dictionary } from "@/lib/i18n";

export function MotionMarquee({ dict }: { dict: Dictionary }) {
  const items = [dict.services.items[0].title, dict.services.items[1].title, dict.services.items[2].title, ...dict.hero.trust];
  return <section className="motion-marquee" aria-label={dict.services.eyebrow}>
    <div className="motion-marquee-track">
      {[0, 1].map(group => <div className="motion-marquee-group" aria-hidden={group === 1} key={group}>{items.map((item, index) => <span key={`${group}-${index}`}><i aria-hidden="true" />{item}</span>)}</div>)}
    </div>
  </section>;
}
