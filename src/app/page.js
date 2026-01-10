"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Mugshot from "@/components/scenes/Scene00Mugshot/Scene00Mugshot.jsx";
import SwingLight from "@/components/scenes/Scene01SwingLightStatue/Scene01SwingLightStatue.jsx";
import CautionTape from "@/components/fx/CautionTape.jsx";
import Corkboard from "@/components/scenes/Scene02Corkboard/Scene02Corkboard.jsx";
import Files from "@/components/scenes/Scene03Files/Scene03Files.jsx";
import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const switchFlipPoint = 0.54;
  const [showHandDown, setShowHandDown] = useState(false);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, switchFlipPoint, switchFlipPoint + 0.03, 1],
    ["rgb(255,255,255)", "rgb(255,255,255)", "rgb(0,0,0)", "rgb(0,0,0)"],
  );

  // FLICK effect - appears instantly when lights go out, then fades
  const flickOpacity = useTransform(
    scrollYProgress,
    [0.499, 0.5, 0.7, 0.9],
    [0, 1, 1, 0],
  );

  const lightSwitchOpacity = useTransform(
    scrollYProgress,
    [0.24, 0.28],
    [0, 1],
  );
  const handX = useTransform(scrollYProgress, [0.22, 0.52], [-85, 2]);
  const handXValue = useMotionTemplate`${handX}vw`;
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setShowHandDown(value >= switchFlipPoint);
  });

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Navbar />
      <div ref={containerRef} className="relative">
        <motion.div
          className="pointer-events-none absolute left-[30%] top-[190vh] z-60 w-[80px] -translate-x-1/2 sm:w-[100px] md:w-[120px] aspect-[431/683] relative"
          style={{ opacity: lightSwitchOpacity }}
        >
          <img
            className={`absolute inset-0 h-full w-full object-contain ${showHandDown ? "opacity-0" : "opacity-100"}`}
            src="/lightswitch_on.png"
            alt="Light switch on"
            aria-hidden={showHandDown}
            loading="eager"
          />
          <img
            className={`absolute inset-0 h-full w-full object-contain ${showHandDown ? "opacity-100" : "opacity-0"}`}
            src="/lightswitch_off.png"
            alt="Light switch off"
            aria-hidden={!showHandDown}
            loading="eager"
          />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute left-[30%] top-[182vh] z-60 w-[44vw] max-w-[680px] -translate-x-full -translate-y-1/2 rotate-[-25deg] origin-right aspect-[5051/1655] relative"
          style={{ x: handXValue }}
        >
          <img
            className={`absolute inset-0 h-full w-full object-contain ${showHandDown ? "opacity-0" : "opacity-100"}`}
            src="/finger_up.png"
            alt="Pointing hand"
            aria-hidden={showHandDown}
            loading="eager"
          />
          <img
            className={`absolute inset-0 h-full w-full object-contain ${showHandDown ? "opacity-100" : "opacity-0"}`}
            src="/finger_down.png"
            alt="Pressing hand"
            aria-hidden={!showHandDown}
            loading="eager"
          />
        </motion.div>
        <Mugshot
          backgroundColor={backgroundColor}
          scrollYProgress={scrollYProgress}
        />
        <SwingLight />
      </div>
      <div className="mb-0">
        <CautionTape backgroundColor={backgroundColor} />
      </div>

      <Corkboard />
      <Files />
      <Footer />
    </motion.div>
  );
}
