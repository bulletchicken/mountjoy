"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Mugshot from "@/components/scenes/Scene00Mugshot/Scene00Mugshot.jsx";
import SwingLight from "@/components/scenes/Scene01SwingLightStatue/Scene01SwingLightStatue.jsx";
import CautionTape from "@/components/fx/CautionTape.jsx";
import Corkboard from "@/components/scenes/Scene02Corkboard/Scene02Corkboard.jsx";
import Files from "@/components/scenes/Scene03Files/Scene03Files.jsx";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("pigscanfly");
  }, []);

  useEffect(() => {
    const loggedSizes = new Set();
    const sizeMessages = [
      {
        width: 80,
        height: 16,
        message:
          "waIt...no Way...mqgkTgBEEx4 | timecode 03:17 | only polyrhythm Is difficult; Listen Better.",
      },
      {
        width: 31,
        height: 48,
        message:
          "wHat...How...cQJx8LwH2mE | teMpo 120bpm | only polYrhythm is diffIcult; liSten Better.",
      },
      {
        width: 44,
        height: 19,
        message:
          "yoU're kidding...L9mV7nQ4pV0 | bAr 7 of 12 | only polYrHyThm is difficult; liSten betTer.",
      },
      {
        width: 52,
        height: 88,
        message:
          "nO shot...u6tRzF2H1sC | tiMe 00:42 | only polyRhythm is diFficult; lisTen better.",
      },
      {
        width: 63,
        height: 37,
        message:
          "seRiously?!...b3Kp9zN6wQh | 4/4 drIft | only polYrhythm is diFficult; lisTen beTter.",
      },
      {
        width: 71,
        height: 102,
        message:
          "caN't be...nV2tR0mQ8yS | tiMe 02:09 | only polYrhythm is dIfficult; lIsten better.",
      },
      {
        width: 89,
        height: 24,
        message:
          "hOld up...h7Wk1pZ4aJd | teMpo 88bpm | only polYrhyThm is difficult; Listen betTer.",
      },
      {
        width: 96,
        height: 57,
        message:
          "aRe you for real...x2Nf8rC5mTa | tiMe 01:33 | only polyrHyThm is difficult; lIsten better.",
      },
      {
        width: 127,
        height: 33,
        message:
          "weLl I'll be...p9Tq3vL2sHk | bArline 16 | only poLyrhythm is dIfficult; liSten better.",
      },
    ];

    const checkExactSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      sizeMessages.forEach(({ width: targetW, height: targetH, message }) => {
        const key = `${targetW}x${targetH}`;
        if (loggedSizes.has(key)) return;
        if (width === targetW && height === targetH) {
          console.log(message);
          loggedSizes.add(key);
        }
      });
    };

    checkExactSize();
    window.addEventListener("resize", checkExactSize);

    return () => {
      window.removeEventListener("resize", checkExactSize);
    };
  }, []);

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
          className="pointer-events-none absolute left-1/2 top-[150vh] z-60 w-[90px] -translate-x-1/2 sm:w-[105px] md:left-[50%] md:w-[120px] lg:left-[30%] aspect-[431/683] relative"
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
          className="pointer-events-none absolute left-[52%] top-[142.8vh] z-60 w-[420px] -translate-x-full -translate-y-1/2 rotate-[-25deg] origin-right aspect-[5051/1655] relative sm:left-[51.5%] sm:top-[141vh] sm:w-[480px] md:left-[50.5%] md:top-[141vh] md:w-[620px] lg:left-[30%] lg:top-[142vh] lg:w-[640px] xl:left-[30%]"
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
