"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function IntroLoader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    setShow(true);
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const value = Math.min(100, Math.round(((now - started) / 1750) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => setShow(false), 1900);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: .7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="intro-orbit intro-orbit-one" />
          <div className="intro-orbit intro-orbit-two" />
          <motion.div className="intro-loader-core" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .55 }}>
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
              <Image src="/blue-wave-logo.png" alt="" width={1292} height={1424} className="intro-logo" priority unoptimized />
            </motion.div>
            <div className="intro-progress-row"><span>{String(progress).padStart(2, "0")}</span><span>100</span></div>
            <div className="intro-progress"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.65, ease: "easeInOut" }} /></div>
          </motion.div>
          <motion.div className="intro-wave intro-wave-a" initial={{ x: "-120%" }} animate={{ x: "120%" }} transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="intro-wave intro-wave-b" initial={{ x: "120%" }} animate={{ x: "-120%" }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
