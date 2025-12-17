"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Mugshot from "@/media/mugshot-lines.jpg";

export default function Page({ backgroundColor }) {
  return (
    <motion.div
      className="relative h-[150vh] mb-40 w-full overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* radial blur effect */}
      <div className="pointer-events-none absolute inset-0 z-20 [backdrop-filter:blur(10px)] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Case number and location */}
      <div className="fixed bottom-20 pl-[10%] sm:pl-[20%] z-30 flex flex-col gap-2 font-mono text-sm uppercase tracking-wider text-black">
        <div>Case Number: 20060621</div>
        <div>Toronto, Canada</div>
        <div>University of Waterloo</div>
      </div>
    </motion.div>
  );
}
