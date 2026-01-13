"use client";

import Image from "next/image";

export default function Polaroid({
  src,
  alt,
  caption,
  sizeClass = "w-56",
  imageClass = "w-36 h-44",
  className = "",
}) {
  return (
    <figure
      className={[
        "relative isolate select-none drop-shadow-[0_1px_2px_rgba(0,0,0,1)]",
        "rounded-[0.4rem] bg-white",
        "px-1 pt-6 pb-14",
        sizeClass,
        className,
      ].join(" ")}
    >
      {/* inner photo well */}
      <div
        className={[
          "relative mx-auto overflow-hidden",
          "border border-black/20 bg-white",
          imageClass,
        ].join(" ")}
      >
        <div className="relative h-full w-full overflow-hidden bg-white">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 224px, 256px"
              priority={false}
            />
          ) : (
            <div className="h-full w-full bg-white" />
          )}
        </div>
      </div>

      {/* caption strip */}
      {caption ? (
        <figcaption
          className={[
            "mt-5 text-center",
            // handwritten-ish + slightly imperfect spacing
            "font-mono text-[0.92rem] uppercase tracking-[0.28em]",
            // tiny ink wobble effect using subtle text rendering choices
            "text-black",
          ].join(" ")}
        >
          {caption}
        </figcaption>
      ) : null}

      {/* little “print” imperfections: micro specks (still no shadows) */}
      <div className="pointer-events-none absolute inset-0 rounded-[0.45rem] border border-black/10" />
    </figure>
  );
}
