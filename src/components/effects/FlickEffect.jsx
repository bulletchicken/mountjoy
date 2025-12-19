"use client";

import { motion } from "framer-motion";

export default function FlickEffect({ opacity }) {
  return (
    <motion.div
      style={{ opacity }}
      className="fixed top-40 left-60 z-[10] pointer-events-none"
    >
      <motion.div className="relative rotate-[-10deg]">
        {/* FLICK text with cartoon style */}
        <div className="relative">
          {/* Main text */}
          <div className="relative text-2xl text-white font-['Comic_Sans_MS',_cursive]">
            flick ~
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
