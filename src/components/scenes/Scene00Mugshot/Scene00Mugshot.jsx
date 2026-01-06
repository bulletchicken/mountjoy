"use client";
import { motion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
export default function Page({ backgroundColor, scrollYProgress }) {
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const directionRef = useRef(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.loop = false;
    const EDGE_EPS = 0.035;

    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const delta = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const duration = video.duration || 0;
      if (!duration) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const edge = Math.min(EDGE_EPS, duration * 0.01);
      const minTime = edge;
      const maxTime = Math.max(edge, duration - edge);
      let next = video.currentTime + delta * directionRef.current;
      if (next >= maxTime) {
        next = maxTime;
        directionRef.current = -1;
      } else if (next <= minTime) {
        next = minTime;
        directionRef.current = 1;
      }

      video.currentTime = next;
      if (video.paused) video.play().catch(() => {});
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (rafRef.current) return;
      video.playbackRate = 0.5;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {}).finally(() => {
          lastTsRef.current = null;
          rafRef.current = requestAnimationFrame(tick);
        });
      } else {
        lastTsRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const ensurePlaying = () => {
      if (video.paused) video.play().catch(() => {});
      if (!rafRef.current && video.duration) {
        lastTsRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
      }
      const duration = video.duration || 0;
      if (duration) {
        const edge = Math.min(EDGE_EPS, duration * 0.01);
        if (video.currentTime >= duration - edge) {
          video.currentTime = duration - edge;
          directionRef.current = -1;
        } else if (video.currentTime <= edge) {
          video.currentTime = edge;
          directionRef.current = 1;
        }
      }
    };

    video.addEventListener("loadedmetadata", start);
    video.addEventListener("loadeddata", start);
    video.addEventListener("ended", ensurePlaying);
    video.addEventListener("pause", ensurePlaying);
    document.addEventListener("visibilitychange", ensurePlaying);
    window.addEventListener("focus", ensurePlaying);
    if (video.readyState >= 1) start();
    return () => {
      video.removeEventListener("loadedmetadata", start);
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("ended", ensurePlaying);
      video.removeEventListener("pause", ensurePlaying);
      document.removeEventListener("visibilitychange", ensurePlaying);
      window.removeEventListener("focus", ensurePlaying);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      className="relative h-[150vh] w-full overflow-x-hidden"
      style={{ backgroundColor }}
    >
      {/* radial blur effect */}
      {/* <div className="pointer-events-none absolute inset-0 z-20 [backdrop-filter:blur(10px)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" /> */}

      <motion.div
        className="pointer-events-none fixed bottom-0 left-1/2 z-10 w-screen -translate-x-1/2"
        style={{ opacity: photoOpacity }}
      >
        <div className="mx-auto flex w-full justify-center overflow-visible">
          <video
            ref={videoRef}
            className="boomerang-video aspect-[3/2] min-h-[125vh] shrink-0 w-[235vw] object-contain object-bottom sm:w-[170vw] md:w-[130vw] lg:w-[100vw] xl:w-[90vw] 2xl:w-[60vw] max-w-none"
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
          >
            <source src="/Landing_Page_video.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>

      {/* Case number and location */}
      <motion.div
        className="pointer-events-none fixed bottom-30 left-0 right-0 z-50"
        style={{ opacity: textOpacity }}
      >
        {/* <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-8 font-mono text-sm uppercase tracking-wider text-black md:px-12 2xl:px-16">
          <div>Case Number: 20060621</div>
          <div>Toronto, Canada</div>
          <div>University of Waterloo</div>
        </div>*/}
      </motion.div>
    </motion.div>
  );
}
