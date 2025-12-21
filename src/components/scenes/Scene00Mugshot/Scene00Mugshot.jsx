"use client";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import Mugshot from "@/media/mugshot-lines.jpg";

export default function Page({ backgroundColor, scrollYProgress }) {
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.6], [1, 0]);

  return (
    <motion.div
      className="relative h-[150vh] w-full overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* radial blur effect */}
      {/* <div className="pointer-events-none absolute inset-0 z-20 [backdrop-filter:blur(10px)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" /> */}

      {/* Case number and location */}
      <motion.div
        className="fixed bottom-20 left-0 right-0 z-50"
        style={{ opacity: textOpacity }}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-8 font-mono text-sm uppercase tracking-wider text-black md:px-12 2xl:px-16">
        <div>Case Number: 20060621</div>
        <div>Toronto, Canada</div>
        <div>University of Waterloo</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
