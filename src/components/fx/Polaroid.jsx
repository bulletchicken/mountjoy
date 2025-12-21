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
      className={`relative flex flex-col items-center rounded-[0.2rem] border-2 border-black bg-white px-4 pt-4 pb-8 ${sizeClass} ${className}`}
    >
      <div
        className={`relative z-10 mx-auto flex items-center justify-center overflow-hidden rounded-[0.15rem] border-2 border-black bg-white ${imageClass}`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain object-center p-2"
          />
        ) : (
          <div className="h-full w-full bg-white" />
        )}
      </div>
      {caption ? (
        <div className="relative z-10 mt-4 text-center text-[0.95rem] font-mono uppercase tracking-[0.2em] text-black">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
