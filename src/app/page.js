"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Mugshot from "@/components/scenes/Scene00Mugshot/Scene00Mugshot.jsx";
import SwingLight from "@/components/scenes/Scene01SwingLightStatue/Scene01SwingLightStatue.jsx";
import CautionTape from "@/components/fx/CautionTape.jsx";
import Corkboard from "@/components/scenes/Scene02Corkboard/Scene02Corkboard.jsx";
import Files from "@/components/scenes/Scene03Files/Scene03Files.jsx";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handStart = 0.08;
  const handEnd = 0.42;
  const handPause = 0.03;
  const switchFlipPoint = handEnd + handPause;
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, switchFlipPoint, switchFlipPoint + 0.05, 1],
    ["rgb(255,255,255)", "rgb(255,255,255)", "rgb(0,0,0)", "rgb(0,0,0)"],
  );

  // FLICK effect - appears instantly when lights go out, then fades
  const flickOpacity = useTransform(
    scrollYProgress,
    [0.499, 0.5, 0.7, 0.9],
    [0, 1, 1, 0],
  );

  const handX = useTransform(scrollYProgress, [handStart, handEnd], [-60, 2]);
  const handXValue = useMotionTemplate`${handX}vw`;
  const handDownOpacity = useTransform(scrollYProgress, (value) =>
    value >= switchFlipPoint + handPause ? 1 : 0,
  );
  const handUpOpacity = useTransform(scrollYProgress, (value) =>
    value >= switchFlipPoint + handPause ? 0 : 1,
  );

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
          className="pointer-events-none absolute left-[30%] top-[150vh] z-60 w-[80px] -translate-x-1/2 sm:w-[100px] md:w-[120px] aspect-[431/683] relative"
          style={{ willChange: "opacity, transform" }}
        >
          <motion.img
            className="absolute inset-0 h-full w-full object-contain"
            src="/lightswitch_on.png"
            alt="Light switch on"
            loading="eager"
            style={{ opacity: handUpOpacity }}
          />
          <motion.img
            className="absolute inset-0 h-full w-full object-contain"
            src="/lightswitch_off.png"
            alt="Light switch off"
            loading="eager"
            style={{ opacity: handDownOpacity }}
          />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute left-[30%] top-[142vh] z-60 w-[44vw] max-w-[680px] -translate-x-full -translate-y-1/2 rotate-[-25deg] origin-right aspect-[5051/1655] relative"
          style={{ x: handXValue }}
        >
          <motion.img
            className="absolute inset-0 h-full w-full object-contain"
            src="/finger_up.png"
            alt="Pointing hand"
            loading="eager"
            style={{ opacity: handUpOpacity }}
          />
          <motion.img
            className="absolute inset-0 h-full w-full object-contain"
            src="/finger_down.png"
            alt="Pressing hand"
            loading="eager"
            style={{ opacity: handDownOpacity }}
          />
        </motion.div>
        <Mugshot
          backgroundColor={backgroundColor}
          scrollYProgress={scrollYProgress}
        />
        <SwingLight backgroundColor={backgroundColor} />
      </div>
      <div className="mb-0">
        <CautionTape backgroundColor={backgroundColor} />
      </div>

      <div className="relative z-0">
        <Corkboard />
      </div>
      <div className="relative z-0">
        <Files />
      </div>
      <Footer />
    </motion.div>
  );
}
