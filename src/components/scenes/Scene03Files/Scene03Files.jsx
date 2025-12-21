"use client";

import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";
import { DitherShader } from "@/components/ui/dither-shader";

export default function Scene03Files() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-60">
        <div className="flex flex-wrap items-center justify-center gap-60">
          <BlackWhiteFolder
            label="TED"
            folderRotation="-2deg"
            paperRotation="2deg"
          />
          <div className="rotate-2">
            <DitherShader
              src="/ted.avif"
              colorMode="grayscale"
              threshold={0.5}
              gridSize={1}
              objectFit="contain"
              className="h-[50vmin] w-[50vmin]"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-60">
          <DitherShader
            src="/pizza.png"
            colorMode="grayscale"
            gridSize={1}
            objectFit="contain"
            className="h-[60vmin] w-[60vmin]"
          />
          <BlackWhiteFolder
            label="UWSummit"
            folderRotation="2deg"
            paperRotation="-2deg"
          />
        </div>
      </div>
    </section>
  );
}
