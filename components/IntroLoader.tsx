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
    const timer = window.setTimeout(() => setShow(false), 1250);
    return () => { window.clearTimeout(reveal); window.clearTimeout(timer); };
  }, [reduced]);
  return (
    <AnimatePresence>
      {show && <motion.div className="intro-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }} aria-hidden="true">
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .45 }}>
          <Image src="/blue-wave-logo.png" alt="" width={1292} height={1424} className="intro-logo" priority unoptimized />
          <motion.div className="intro-wave" initial={{ x: "-140%" }} animate={{ x: "140%" }} transition={{ duration: .75, delay: .28, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
