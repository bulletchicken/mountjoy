"use client";

import { useEffect, useRef, useState } from "react";
import { Linkedin, Github, Mail, Clock } from "lucide-react";
import { DitherShader } from "@/components/ui/dither-shader";

export default function Footer() {
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
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
    {
      name: "fantaisie-impromptu",
      href: "https://en.wikipedia.org/wiki/Fantaisie-Impromptu",
      icon: Clock,
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
    return () => {
      if (hideEmailTooltipTimeout.current) {
        clearTimeout(hideEmailTooltipTimeout.current);
      }
    };
  }, []);

  return (
    <footer
      className="w-full pt-20 pb-0 text-center font-mono text-xs uppercase tracking-[0.3em] text-black"
      style={{
        backgroundImage: "url(/cork_texture.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 534px",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <span>
          Designed and executed by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Jeremy_Lin"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            Jeremy Su
          </a>
        </span>
        <div className="flex items-center gap-6">
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
            className="relative flex cursor-pointer flex-col items-center gap-2 transition-opacity hover:opacity-70"
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
      <div className="mt-12 w-full">
        <DitherShader
          src="/toronto-skyline.webp"
          colorMode="grayscale"
          gridSize={1}
          threshold={0.55}
          objectFit="cover"
          className="h-[320px] w-full sm:h-[360px] md:h-[420px]"
        />
      </div>
    </footer>
  );
}
