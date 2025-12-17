"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar({ textColor }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-[10%] sm:px-[20%] py-4">
        {/* Left side - Name */}
        <Link href="/">
          <motion.div
            style={{ color: textColor }}
            className="font-mono text-lg font-semibold uppercase tracking-wide transition-opacity hover:opacity-70"
          >
            Jeremy Su
          </motion.div>
        </Link>

        {/* Right side - Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/about">
            <motion.div
              style={{ color: textColor }}
              className="font-mono text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
            >
              About
            </motion.div>
          </Link>
          <Link href="/projects">
            <motion.div
              style={{ color: textColor }}
              className="font-mono text-sm uppercase tracking-wider transition-opacity hover:opacity-70"
            >
              Projects
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
