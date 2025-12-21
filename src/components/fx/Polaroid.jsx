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
    <div className={`bg-white p-4 pb-8 ${sizeClass} ${className}`}>
      <div className={`relative overflow-hidden ${imageClass}`}>
        {src ? (
          <Image src={src} alt={alt} fill className="object-cover" />
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
