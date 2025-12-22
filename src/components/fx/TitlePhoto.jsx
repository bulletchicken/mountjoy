"use client";

import { useEffect, useState } from "react";
import { DitherShader } from "@/components/ui/dither-shader";

export default function TitlePhoto({ className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DitherShader
      src="/title_photo.png"
      colorMode="grayscale"
      gridSize={1}
      objectFit="cover"
      className={`aspect-[3/2] ${className}`}
    />
  );
}
