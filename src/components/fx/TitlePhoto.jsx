"use client";

import { DitherShader } from "@/components/ui/dither-shader";

export default function TitlePhoto({ className = "" }) {
  return (
    <DitherShader
      src="/title_photo.jpg"
      colorMode="grayscale"
      gridSize={1}
      objectFit="cover"
      className={`aspect-[3/2] ${className}`}
    />
  );
}
