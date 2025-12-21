"use client";

import Image from "next/image";

export default function Polaroid({
  src,
  alt,
  caption,
  sizeClass = "w-56",
  imageClass = "w-36 h-36",
  className = "",
}) {
  return (
    <div
      className={`relative flex flex-col items-center rounded-[0.2rem] border border-neutral-900/80 bg-[linear-gradient(135deg,#fffdf7_0%,#f2e5d0_100%)] px-4 pt-4 pb-8 shadow-[0_18px_30px_rgba(0,0,0,0.22),_0_2px_0_rgba(0,0,0,0.18)] ${sizeClass} ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[0.2rem] bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:6px_6px] opacity-35"
      />
      <div
        className={`relative z-10 mx-auto flex items-center justify-center overflow-hidden rounded-[0.15rem] border border-neutral-900/80 bg-white shadow-[0_6px_12px_rgba(0,0,0,0.18)] ${imageClass}`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-center p-2 saturate-110 contrast-105"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,#e9e2d6,#f7f2e8)]" />
        )}
      </div>
      {caption ? (
        <div className="relative z-10 mt-4 text-center text-[0.95rem] font-['Caveat',_'Bradley_Hand',_cursive] tracking-wide text-neutral-800">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
