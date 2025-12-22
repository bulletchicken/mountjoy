"use client";
import { motion, useTransform } from "framer-motion";
import TitlePhoto from "@/components/fx/TitlePhoto.jsx";

export default function Page({ backgroundColor, scrollYProgress }) {
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <motion.div
      className="relative h-[150vh] w-full"
      style={{ backgroundColor }}
    >
      {/* radial blur effect */}
      {/* <div className="pointer-events-none absolute inset-0 z-20 [backdrop-filter:blur(10px)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" /> */}

      <motion.div
        className="pointer-events-none fixed left-1/2 top-[10vh] z-10 w-screen -translate-x-1/2"
        style={{ opacity: photoOpacity }}
      >
        <div className="mx-auto flex w-full justify-center overflow-visible">
          <TitlePhoto className="shrink-0 w-[220vw] sm:w-[160vw] md:w-[120vw] lg:w-[90vw] xl:w-[80vw] 2xl:w-[55vw] max-w-none" />
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
