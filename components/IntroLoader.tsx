"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function IntroLoader() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || sessionStorage.getItem("blue-wave-intro-v4")) return;
    sessionStorage.setItem("blue-wave-intro-v4", "shown");
    const reveal = window.setTimeout(() => setShow(true), 0);
    const timer = window.setTimeout(() => setShow(false), 1800);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-loader intro-loader-wave"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="intro-water-lines">
            <span />
            <span />
            <span />
          </div>

          <motion.div
            className="intro-wave-mark"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
            <div className="intro-ripple intro-ripple-one" />
            <div className="intro-ripple intro-ripple-two" />
          </motion.div>

          <motion.div
            className="intro-water-wipe"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
