"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function IntroLoader() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || sessionStorage.getItem("blue-wave-intro")) return;
    sessionStorage.setItem("blue-wave-intro", "shown");
    const reveal = window.setTimeout(() => setShow(true), 0);
    const timer = window.setTimeout(() => setShow(false), 1550);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-loader intro-loader-water"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          aria-hidden="true"
        >
          <div className="intro-water-glow" />
          <motion.div
            className="intro-loader-logo-wrap"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/blue-wave-logo.png"
              alt=""
              width={1292}
              height={1424}
              className="intro-logo"
              priority
              unoptimized
            />
          </motion.div>
          <div className="intro-water-line intro-water-line-one" />
          <div className="intro-water-line intro-water-line-two" />
          <div className="intro-water-line intro-water-line-three" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
