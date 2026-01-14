"use client";
import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
export default function Page({ backgroundColor, scrollYProgress }) {
  const photoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -12]);
  const videoRef = useRef(null);

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
            className="boomerang-video aspect-[3/2] min-h-[80vh] shrink-0 w-[210vw] object-contain object-bottom sm:w-[155vw] md:w-[115vw] lg:w-[100vw] xl:w-[80vw] 2xl:w-[60vw] max-w-none"
            autoPlay
            muted
            playsInline
            preload="auto"
            loop
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
        className="pointer-events-none fixed bottom-20 left-0 right-0 z-50 hidden md:block mix-blend-difference"
        style={{
          opacity: photoOpacity,
          y: textY,
        }}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 pr-8 pl-[22px] font-mono text-sm uppercase tracking-wide text-white sm:pr-12 sm:pl-[34px] md:pr-16 md:pl-[50px] 2xl:pr-20 2xl:pl-[66px]">
          <div className="type-line">
            <span
              className="type-text"
              style={{
                animationDelay: "0.6s",
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
                animationDelay: "2s",
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
                animationDelay: "3.2s",
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
