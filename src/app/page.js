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

  // keep white until the switch flips, then go black
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
  const [showHandDown, setShowHandDown] = useState(false);
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
        <motion.img
          className="pointer-events-none absolute left-[30%] top-[190vh] z-60 w-[80px] -translate-x-1/2 sm:w-[100px] md:w-[120px]"
          style={{ opacity: lightSwitchOpacity }}
          src={showHandDown ? "/lightswitch_off.png" : "/lightswitch_on.png"}
          alt="Light switch"
        />
        <motion.img
          className="pointer-events-none absolute left-[30%] top-[203vh] z-60 w-[44vw] max-w-[680px] -translate-x-full -translate-y-1/2 rotate-[-25deg] origin-right"
          style={{ x: handXValue }}
          src={showHandDown ? "/finger_down.png" : "/finger_up.png"}
          alt="Pointing hand"
        />
        <Mugshot
          backgroundColor={backgroundColor}
          scrollYProgress={scrollYProgress}
        />
        <SwingLight backgroundColor={backgroundColor} />
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
