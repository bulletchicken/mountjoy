"use client";

import Image from "next/image";

export default function Polaroid({
  src,
  alt,
  caption,
  cornerLabel,
  cornerPosition = "left",
  cornerRotation = "-12deg",
  sizeClass = "w-56",
  imageClass = "w-36 h-36",
  className = "",
}) {
  return (
    <div
      className={`relative bg-white border-2 border-black shadow-[6px_8px_0_rgba(0,0,0,0.35)] p-4 pb-8 ${sizeClass} ${className}`}
    >
      {cornerLabel ? (
        <div
          className={`absolute top-2 ${
            cornerPosition === "right" ? "right-2" : "left-2"
          } text-[0.6rem] font-mono uppercase tracking-[0.2em] text-black`}
          style={{ transform: `rotate(${cornerRotation})` }}
        >
          {cornerLabel}
        </div>
      ) : null}
      <div
        className={`relative overflow-hidden border border-black ${imageClass}`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain saturate-50 contrast-90 brightness-95 p-2"
          />
        ) : (
          <div className="h-full w-full bg-neutral-200" />
        )}
      </div>
      {caption ? (
        <div className="mt-3 text-center text-xs font-mono uppercase tracking-widest text-black">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
