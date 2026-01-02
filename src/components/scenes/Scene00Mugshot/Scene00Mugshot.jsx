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

    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const delta = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      const duration = video.duration || 0;
      if (!duration) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      let next = video.currentTime + delta * directionRef.current;
      if (next >= duration) {
        next = duration;
        directionRef.current = -1;
      } else if (next <= 0) {
        next = 0;
        directionRef.current = 1;
      }

      video.currentTime = next;
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      video
        .play()
        .catch(() => {})
        .finally(() => {
          video.pause();
          lastTsRef.current = null;
          rafRef.current = requestAnimationFrame(tick);
        });
    };

    video.addEventListener("loadedmetadata", start);
    return () => {
      video.removeEventListener("loadedmetadata", start);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      className="relative h-[150vh] w-full"
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
            className="aspect-[3/2] min-h-[125vh] shrink-0 w-[235vw] object-contain object-bottom sm:w-[170vw] md:w-[130vw] lg:w-[100vw] xl:w-[90vw] 2xl:w-[60vw] max-w-none"
            autoPlay
            muted
            playsInline
            preload="auto"
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
