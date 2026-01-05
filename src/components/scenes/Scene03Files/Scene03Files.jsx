"use client";

import FolderPair from "@/components/scenes/Scene03Files/FolderPair";
import { DitherShader } from "@/components/ui/dither-shader";
import Secret from "@/components/scenes/Scene03Files/Secret";

export default function Scene03Files() {
  return (
    <section className="relative flex w-full items-center justify-center bg-white overflow-hidden py-40">
      <div className="flex flex-col items-center gap-24 sm:gap-36 lg:gap-48 xl:gap-60">
        <FolderPair
          centerOffsetX={-400}
          folderProps={{
            label: "TED",
            folderRotation: "-2deg",
            paperRotation: "2deg",
            footerLines: [
              "AI teddy bear for sweet grandmas",
              "Healthcare companion teddy bear",
              "Funding: 6.67k",
            ],
          }}
          media={
            <div className="rotate-2">
              <DitherShader
                src="/ted.avif"
                colorMode="grayscale"
                threshold={0.5}
                gridSize={1}
                objectFit="contain"
                className="h-[50vmin] w-[50vmin] sm:h-[54vmin] sm:w-[54vmin] md:h-[58vmin] md:w-[58vmin] lg:h-[60vmin] lg:w-[60vmin] xl:h-[62vmin] xl:w-[62vmin]"
              />
            </div>
          }
        />
        <FolderPair
          reverse
          spineSide="right"
          centerOffsetX={400}
          folderProps={{
            label: "UWSummit",
            tabSide: "left",
            folderRotation: "2deg",
            paperRotation: "-2deg",
            footerLines: [
              "Waterloo Hot or Not",
              "Viral app for UW students",
              "300k users",
            ],
          }}
          media={
            <div className="pizza-wrap">
              <div className="pizza-spin">
                <DitherShader
                  src="/pizza.png"
                  colorMode="grayscale"
                  gridSize={1}
                  objectFit="contain"
                  className="h-[58vmin] w-[58vmin] sm:h-[64vmin] sm:w-[64vmin] md:h-[68vmin] md:w-[68vmin] lg:h-[70vmin] lg:w-[70vmin] xl:h-[74vmin] xl:w-[74vmin]"
                />
              </div>
            </div>
          }
        />
        <Secret />
      </div>
      <style jsx>{`
        .pizza-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          clip-path: circle(35% at 50% 50%);
        }
        .pizza-spin {
          animation: pizza-spin 12s linear infinite;
          animation-play-state: paused;
          transform-origin: center;
          pointer-events: none;
        }
        .pizza-wrap:hover .pizza-spin {
          animation-play-state: running;
        }
        @keyframes pizza-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
