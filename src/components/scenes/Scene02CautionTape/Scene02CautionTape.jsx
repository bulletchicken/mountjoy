"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Scene02CautionTape() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to x positions for each tape
  const tape1X = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const tape2X = useTransform(scrollYProgress, [0.2, 0.6], ["100%", "0%"]);
  const tape3X = useTransform(scrollYProgress, [0.4, 1], ["-100%", "0%"]);

  const TapeContent = () =>
    Array.from({ length: 20 }, (_, i) => (
      <span key={i} className="whitespace-nowrap px-4 font-black">
        CRIME SCENE DO NOT CROSS
      </span>
    ));

  return (
    <div ref={containerRef} className="w-full min-h-screen relative mt-100">
      {/* First Caution Tape */}
      <motion.div
        style={{ x: tape1X }}
        className="absolute left-[-5vw] w-[300vw] bg-white min-h-[5vh] py-8 flex items-center justify-start text-center overflow-hidden text-3xl border-4 border-black rotate-[3deg] z-10"
      >
        <div className="flex">
          <TapeContent />
        </div>
      </motion.div>

      {/* Second Caution Tape */}
      <motion.div
        style={{ x: tape2X }}
        className="absolute top-[50%] left-0 w-[200vw] bg-whte min-h-[5vh] py-8 flex items-center justify-start text-center overflow-hidden text-3xl border-4 border-black rotate-[50deg]"
      >
        <div className="flex">
          <TapeContent />
        </div>
      </motion.div>

      {/* Third Caution Tape */}
      <motion.div
        style={{ x: tape3X }}
        className="absolute top-[80%] left-0 w-[200vw] bg-white min-h-[5vh] py-8 flex items-center justify-start text-center overflow-hidden text-3xl border-4 border-black rotate-[-2deg]"
      >
        <div className="flex">
          <TapeContent />
        </div>
      </motion.div>
    </div>
  );
}
