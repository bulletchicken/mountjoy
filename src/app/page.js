"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LoadingScreen from "@/components/LoadingScreen";
import Mugshot from "@/components/scenes/Scene00Mugshot/Scene00Mugshot.jsx";
import SwingLight from "@/components/scenes/Scene01SwingLightStatue/Scene01SwingLightStatue.jsx";
import CautionTape from "@/components/fx/CautionTape.jsx";
import Corkboard from "@/components/scenes/Scene02Corkboard/Scene02Corkboard.jsx";
import Files from "@/components/scenes/Scene03Files/Scene03Files.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const HERO_ASSETS = [
  "/lightswitch_on.webp",
  "/lightswitch_off.webp",
  "/finger_up.webp",
  "/finger_down.webp",
];

export default function Home() {
  const containerRef = useRef(null);
  const [isSmUp, setIsSmUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  const progressRef = useRef(0);
  const LOADER_FADE_MS = 200;

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  useEffect(() => {
    console.log("pigscanfly");
  }, []);

  useEffect(() => {
    let cancelled = false;
    HERO_ASSETS.forEach((src) => {
      const img = new Image();
      let settled = false;
      const markLoaded = () => {
        if (settled || cancelled) return;
        settled = true;
        setLoadedAssets((prev) => prev + 1);
      };
      img.onload = markLoaded;
      img.onerror = markLoaded;
      img.src = src;
      if (img.complete) {
        markLoaded();
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) setFontsReady(true);
      });
      return () => {
        cancelled = true;
      };
    }
    setFontsReady(true);
    return () => {
      cancelled = true;
    };
  }, []);

  const maxBeforeReady = 95;
  const assetSteps = HERO_ASSETS.length + 1;
  const assetLoadedSteps = loadedAssets + (fontsReady ? 1 : 0);
  const assetProgress = Math.min(
    maxBeforeReady,
    Math.max(0, Math.floor((assetLoadedSteps / assetSteps) * maxBeforeReady)),
  );
  const targetProgress = isVideoReady ? 100 : assetProgress;

  useEffect(() => {
    if (!isLoading) return;
    let rafId;

    const tick = () => {
      const current = progressRef.current;
      if (current >= targetProgress) {
        if (targetProgress === 100 && current === 100) {
          setIsLoading(false);
        }
        return;
      }

      const gap = targetProgress - current;
      const increment = Math.max(1, Math.ceil(gap / 6));
      const next = Math.min(targetProgress, current + increment);
      progressRef.current = next;
      setLoadingProgress(next);

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isLoading, targetProgress]);

  useEffect(() => {
    if (!isLoading) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    const id = setTimeout(() => {
      setIsContentVisible(true);
    }, LOADER_FADE_MS);
    return () => clearTimeout(id);
  }, [isLoading]);

  useEffect(() => {
    progressRef.current = loadingProgress;
  }, [loadingProgress]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const handleChange = (event) => setIsSmUp(event.matches);
    handleChange(media);
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
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

  const handXVw = useTransform(scrollYProgress, [handStart, handEnd], [-60, 2]);
  const handXPx = useTransform(scrollYProgress, [handStart, handEnd], [
    -234,
    8,
  ]);
  const handXValueVw = useMotionTemplate`${handXVw}vw`;
  const handXValuePx = useMotionTemplate`${handXPx}px`;
  const handXValue = isSmUp ? handXValueVw : handXValuePx;
  const handDownOpacity = useTransform(scrollYProgress, (value) =>
    value >= switchFlipPoint + handPause ? 1 : 0,
  );
  const handUpOpacity = useTransform(scrollYProgress, (value) =>
    value >= switchFlipPoint + handPause ? 0 : 1,
  );

  return (
    <>
      <LoadingScreen isVisible={isLoading} progress={loadingProgress} />
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isContentVisible ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ pointerEvents: isContentVisible ? "auto" : "none" }}
        aria-hidden={!isContentVisible}
      >
        <Navbar isVisible={isContentVisible} />
        <div ref={containerRef} className="relative">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[150vh] z-60 w-[90px] -translate-x-1/2 sm:w-[105px] md:left-[50%] md:w-[120px] lg:left-[30%] aspect-[431/683] relative 2xl:w-[8vw]"
            style={{ willChange: "opacity, transform" }}
          >
            <motion.img
              className="absolute inset-0 h-full w-full object-contain"
              src="/lightswitch_on.webp"
              alt="Light switch on"
              loading="eager"
              style={{ opacity: handUpOpacity }}
            />
            <motion.img
              className="absolute inset-0 h-full w-full object-contain"
              src="/lightswitch_off.webp"
              alt="Light switch off"
              loading="eager"
              style={{ opacity: handDownOpacity }}
            />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute left-[52.5%] top-[calc(150vh-58px)] z-60 w-[420px] -translate-x-full -translate-y-1/2 rotate-[-25deg] origin-right aspect-[5051/1655] relative sm:left-[51.5%] sm:top-[141vh] sm:w-[480px] md:left-[50.5%] md:top-[141vh] md:w-[620px] lg:left-[30%] lg:top-[142vh] lg:w-[640px] xl:left-[30%] 2xl:w-[40vw]"
            style={{ x: handXValue }}
          >
            <motion.img
              className="absolute inset-0 h-full w-full object-contain"
              src="/finger_up.webp"
              alt="Pointing hand"
              loading="eager"
              style={{ opacity: handUpOpacity }}
            />
            <motion.img
              className="absolute inset-0 h-full w-full object-contain"
              src="/finger_down.webp"
              alt="Pressing hand"
              loading="eager"
              style={{ opacity: handDownOpacity }}
            />
          </motion.div>
          <Mugshot
            backgroundColor={backgroundColor}
            scrollYProgress={scrollYProgress}
            onVideoReady={handleVideoReady}
            shouldPlay={isContentVisible}
          />
          <SwingLight backgroundColor={backgroundColor} />
        </div>
        <div className="mb-40 sm:mb-0">
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
    </>
  );
}
