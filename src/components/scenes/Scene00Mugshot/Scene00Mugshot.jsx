"use client";
import { motion, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
export default function Page({
  backgroundColor,
  scrollYProgress,
  onVideoReady,
  shouldPlay = true,
  textAnimationKey = 0,
}) {
  const photoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -12]);
  const videoRef = useRef(null);
  const hasNotifiedRef = useRef(false);

  const notifyVideoReady = useCallback(() => {
    if (hasNotifiedRef.current) return;
    hasNotifiedRef.current = true;
    if (onVideoReady) onVideoReady();
  }, [onVideoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 3) {
      notifyVideoReady();
    }
  }, [notifyVideoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      return;
    }
    video.pause();
    video.load();
  }, [shouldPlay]);

  return (
    <motion.div
      className="relative h-[175vh] w-full overflow-x-hidden"
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
            className="boomerang-video aspect-[3/2] min-h-[80vh] shrink-0 w-[250vw] object-contain object-bottom sm:w-[155vw] md:w-[115vw] lg:w-[100vw] xl:w-[80vw] max-w-none"
            autoPlay={shouldPlay}
            muted
            playsInline
            preload="auto"
            loop
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            onCanPlay={notifyVideoReady}
            onCanPlayThrough={notifyVideoReady}
            onPlaying={notifyVideoReady}
            onError={notifyVideoReady}
            >
              <source src="/Landing_page_video.mp4" type="video/mp4" />
            </video>
        </div>
      </motion.div>

      {/* Case number and location */}
      <motion.div
        key={`case-text-${textAnimationKey}`}
        className="pointer-events-none fixed bottom-20 left-0 right-0 z-50 hidden md:block mix-blend-difference"
        style={{
          opacity: photoOpacity,
          y: textY,
        }}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 pr-8 pl-[22px] font-mono text-sm uppercase tracking-wide text-white sm:pr-12 sm:pl-[34px] md:pr-16 md:pl-[50px]">
          <div className="type-line">
            <span
              className="type-text"
              style={{
                animationDelay: "1s",
                clipPath: "inset(0 100% 0 0)",
                "--type-steps": 22,
                "--type-duration": "0.8s",
              }}
            >
              Case Number: 20060621
            </span>
          </div>
          <div className="type-line">
            <span
              className="type-text"
              style={{
                animationDelay: "2.4s",
                clipPath: "inset(0 100% 0 0)",
                "--type-steps": 15,
                "--type-duration": "0.7s",
              }}
            >
              Toronto, Canada
            </span>
          </div>
          <div className="type-line">
            <span
              className="type-text"
              style={{
                animationDelay: "3.6s",
                clipPath: "inset(0 100% 0 0)",
                "--type-steps": 24,
                "--type-duration": "0.9s",
              }}
            >
              University of Waterloo
            </span>
          </div>
        </div>
      </motion.div>
      <style jsx>{`
        .type-line {
          white-space: nowrap;
        }

        .type-text {
          display: inline-block;
          padding-right: 1ch;
          clip-path: inset(0 100% 0 0);
          animation: type-in var(--type-duration, 1.4s)
            steps(var(--type-steps, 28), end) forwards;
        }

        @keyframes type-in {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 -1ch 0 0);
          }
        }
      `}</style>
    </motion.div>
  );
}
