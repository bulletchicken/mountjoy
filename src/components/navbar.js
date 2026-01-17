"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Navbar({ isVisible = true }) {
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const hideEmailTooltipTimeout = useRef(null);
  const emailAddress = "nwjeremysu@gmail.com";

  const links = [
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/jeremy-su/",
      icon: Linkedin,
    },
    {
      name: "github",
      href: "https://github.com/bulletchicken",
      icon: Github,
    },
  ];

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setShowEmailTooltip(true);
      if (hideEmailTooltipTimeout.current) {
        clearTimeout(hideEmailTooltipTimeout.current);
      }
      hideEmailTooltipTimeout.current = setTimeout(() => {
        setShowEmailTooltip(false);
      }, 1600);
    } catch (error) {
      console.error("Failed to copy email address:", error);
    }
  };

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

  useEffect(() => {
    return () => {
      if (hideEmailTooltipTimeout.current) {
        clearTimeout(hideEmailTooltipTimeout.current);
      }
    };
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? (isHidden ? -120 : 0) : -20,
      }}
      transition={{ delay: 0, duration: 0.35, ease: "easeOut" }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 px-4 pt-10 pb-6 sm:px-8 sm:py-10 md:justify-between md:px-12">
        {/* Left side - Name */}
        <Link href="/">
          <motion.div className="font-mono text-4xl font-semibold uppercase tracking-wide transition-opacity hover:opacity-70 sm:text-3xl md:text-lg">
            Jeremy Su
          </motion.div>
        </Link>

        {/* Right side - Navigation Links */}
        <div className="hidden items-center gap-6 md:flex md:gap-6">
          {links.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <button
            type="button"
            onClick={handleEmailClick}
            aria-label="email"
            className="relative flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
          >
            <span
              className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white transition-opacity ${
                showEmailTooltip ? "opacity-100" : "opacity-0"
              }`}
              role="status"
              aria-live="polite"
            >
              Email copied
            </span>
            <Mail className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
