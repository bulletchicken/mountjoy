"use client";

import Navbar from "@/components/navbar";
import Mugshot from "@/components/scenes/Scene00Mugshot/Scene00Mugshot.jsx";
import SwingLight from "@/components/scenes/Scene01SwingLightStatue/Scene01SwingLightStatue.jsx";
import CautionTape from "@/components/scenes/Scene02CautionTape/Scene02CautionTape.jsx";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

  // text color fades from black to white
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)"],
  );

  return (
    <>
      <Navbar textColor={textColor} />
      <div ref={containerRef}>
        <div className="h-screen w-full">
          <Mugshot
            backgroundColor={backgroundColor}
            scrollYProgress={scrollYProgress}
          />
        </div>

        <div className="h-screen w-full">
          <SwingLight backgroundColor={backgroundColor} />
        </div>
      </div>
      <CautionTape />
    </>
    
  );
}
