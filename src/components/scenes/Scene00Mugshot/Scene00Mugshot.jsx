"use client";
import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
export default function Page({ backgroundColor, scrollYProgress }) {
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
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
            className="boomerang-video aspect-[3/2] min-h-[80vh] shrink-0 w-[150vw] object-contain object-bottom sm:w-[120vw] md:w-[100vw] lg:w-[80vw] xl:w-[72vw] 2xl:w-[50vw] max-w-none"
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
