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
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 px-4 pt-10 pb-6 sm:px-8 sm:py-10 md:justify-between md:px-12 2xl:px-16">
        {/* Left side - Name */}
        <Link href="/">
          <motion.div className="font-mono text-4xl font-semibold uppercase tracking-wide transition-opacity hover:opacity-70 sm:text-3xl md:text-lg">
            Jeremy Su
          </motion.div>
        </Link>

        {/* Right side - Navigation Links */}
        <div className="hidden items-center gap-4 md:flex md:gap-8">
          <Link href="/about">
            <motion.div className="font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-70 sm:text-sm">
              About
            </motion.div>
          </Link>
          <Link href="/projects">
            <motion.div className="font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-70 sm:text-sm">
              Projects
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
