"use client";

import Navbar from "@/components/navbar";
import Mugshot from "@/components/scenes/Scene00Mugshot/Scene00Mugshot.jsx";
import SwingLight from "@/components/scenes/Scene01SwingLightStatue/Scene01SwingLightStatue.jsx";
import CautionTape from "@/components/fx/CautionTape.jsx";
import Corkboard from "@/components/scenes/Scene02Corkboard/Scene02Corkboard.jsx";
import Computer from "@/components/scenes/Scene03Computer/Scene03Computer.jsx";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // background fades to black as you scroll down
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    ["rgb(255,255,255)", "rgb(0,0,0)"],
  );

  // FLICK effect - appears instantly when lights go out, then fades
  const flickOpacity = useTransform(
    scrollYProgress,
    [0.499, 0.5, 0.7, 0.9],
    [0, 1, 1, 0],
  );

  return (
    <div className="relative">
      <Navbar />
      <div ref={containerRef}>
        <Mugshot
          backgroundColor={backgroundColor}
          scrollYProgress={scrollYProgress}
        />
        <SwingLight backgroundColor={backgroundColor} />
      </div>
      <CautionTape backgroundColor={backgroundColor} />

      <Corkboard />
      <Computer />
    </div>
  );
}
