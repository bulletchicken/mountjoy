"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateLayout = () => {
      const compact = !media.matches;
      setIsCompact(compact);
      if (!compact) {
        setIsHidden(false);
      }
    };
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    if (!isCompact) {
      return;
    }

    const handleScroll = () => {
      if (ticking.current) {
        return;
      }
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const delta = currentY - lastScrollY.current;
        const shouldHide = delta > 2 && currentY > 20;
        const shouldShow = delta < -2 || currentY <= 10;
        if (shouldHide !== isHidden && (shouldHide || shouldShow)) {
          setIsHidden(shouldHide);
        }
        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCompact, isHidden]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: isHidden ? -120 : 0 }}
      transition={{ delay: 0, duration: 0.2, ease: "easeOut" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 px-4 pt-10 pb-6 sm:px-8 sm:py-10 md:justify-between md:px-12">
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
