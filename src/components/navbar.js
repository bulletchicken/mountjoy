"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-8 py-10 md:px-12 2xl:px-16">
        {/* Left side - Name */}
        <Link href="/">
          <motion.div className="font-mono text-lg font-semibold uppercase tracking-wide transition-opacity hover:opacity-70">
            Jeremy Su
          </motion.div>
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex items-center gap-12">
          <Link href="/about">
            <motion.div className="font-mono text-sm uppercase tracking-wider transition-opacity hover:opacity-70">
              About
            </motion.div>
          </Link>
          <Link href="/projects">
            <motion.div className="font-mono text-sm uppercase tracking-wider transition-opacity hover:opacity-70">
              Projects
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
