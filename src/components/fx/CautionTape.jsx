"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CautionTape() {
  const containerRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const update = () => setIsSmallScreen(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const tape1Range = isSmallScreen ? [0, 0.9] : [0, 1];
  const tape2Range = isSmallScreen ? [0, 0.6] : [0, 0.7];
  const tape3Range = isSmallScreen ? [0.3, 1] : [0.3, 0.8];

  const tape1X = useTransform(scrollYProgress, tape1Range, ["-100%", "0%"]);
  const tape2X = useTransform(scrollYProgress, tape2Range, ["100%", "0%"]);
  const tape3X = useTransform(scrollYProgress, tape3Range, ["-100%", "0%"]);

  const TapeContent = ({ count = 20 }) =>
    Array.from({ length: count }, (_, i) => (
      <span
        key={i}
        className="inline-block whitespace-nowrap px-4 font-black origin-center scale-y-200"
      >
        CRIME SCENE DO NOT CROSS
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] overflow-hidden pointer-events-none -mt-25"
      style={{
        backgroundImage: "url(/cork_texture.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 534px",
      }}
    >
      {/* Clip layer so huge/rotated absolute elements never create horizontal scroll */}
      <div className="inset-0 overflow-hidden">
        {/* First Caution Tape */}
        <motion.div
          style={{ x: tape1X, willChange: "transform" }}
          className="absolute origin-top-left w-[300vw] bg-white min-h-[5vh] py-8 flex items-center justify-start text-center overflow-hidden text-3xl 2xl:min-h-[9vh] 2xl:py-12 2xl:text-5xl border-4 border-black rotate-[6deg] z-30"
        >
          <div className="flex">
            <TapeContent />
          </div>
        </motion.div>

        {/* Second Caution Tape */}
        <motion.div
          style={{ x: tape2X, willChange: "transform" }}
          className="absolute top-[30%] -left-30 w-[200vw] bg-white min-h-[5vh] py-8 flex items-center justify-start text-center overflow-hidden text-3xl 2xl:min-h-[9vh] 2xl:py-12 2xl:text-5xl border-4 border-black rotate-40 2xl:-left-60 z-10"
        >
          <div className="flex">
            <TapeContent />
          </div>
        </motion.div>

        {/* Third Caution Tape */}
        <motion.div
          style={{ x: tape3X, willChange: "transform" }}
          className="absolute top-[58%] xl:top-[36%] 2xl:top-[4%] left-0 w-[350vw] bg-white min-h-[5vh] py-8 flex items-center justify-start text-center overflow-hidden text-3xl 2xl:min-h-[9vh] 2xl:py-12 2xl:text-5xl border-4 border-black rotate-[-2deg] xl:rotate-[-2deg] 2xl:rotate-[-2deg] z-0"
        >
          <div className="flex">
            <TapeContent count={48} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
