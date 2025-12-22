"use client";

import { useEffect, useRef, useState } from "react";
import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";
import { DitherShader } from "@/components/ui/dither-shader";

function FolderPair({
  folderProps,
  media,
  reverse = false,
  centerOffsetX = 0,
  spineSide = "left",
  targetXRatio = 0.5,
  targetXRatioLarge,
  largeBreakpoint = 1280,
  smallBreakpoint = 640,
  maxOffsetXSmall = 120,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const folderRef = useRef(null);

  const updateOffset = () => {
    if (!folderRef.current) {
      return;
    }
    const rect = folderRef.current.getBoundingClientRect();
    const spineLeft = spineSide === "right" ? rect.right : rect.left;
    const isSmall = window.innerWidth < smallBreakpoint;
    const ratio =
      targetXRatioLarge !== undefined && window.innerWidth >= largeBreakpoint
        ? targetXRatioLarge
        : targetXRatio;
    const targetX = window.innerWidth * (isSmall ? 0.5 : ratio);
    const rawX = Math.round(
      targetX - spineLeft + (isSmall ? 0 : centerOffsetX),
    );
    const cappedX = isSmall
      ? Math.max(-maxOffsetXSmall, Math.min(maxOffsetXSmall, rawX))
      : rawX;
    setOffset({
      x: cappedX,
      y: 0,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    updateOffset();
    const handleResize = () => updateOffset();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const folderNode = (
    <div
      ref={folderRef}
      className={`relative z-20 transition-transform duration-700 ease-in-out ${
        isOpen ? "z-50" : ""
      }`}
      style={{
        transform: isOpen
          ? `translate(${offset.x}px, ${offset.y}px)`
          : "translate(0px, 0px)",
        willChange: "transform",
      }}
    >
      <BlackWhiteFolder
        isOpen={isOpen}
        onOpen={() => {
          updateOffset();
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
          setOffset({ x: 0, y: 0 });
        }}
        {...folderProps}
      />
    </div>
  );

  const shiftDirection = reverse ? -1 : 1;
  const mediaNode = (
    <div
      className="relative z-10 transition-transform duration-700 ease-in-out"
      style={{
        transform: isOpen
          ? `translateX(${shiftDirection * 60}px) rotate(${
              shiftDirection * 5
            }deg)`
          : "translateX(0px) rotate(0deg)",
        willChange: "transform",
      }}
    >
      {media}
    </div>
  );

  return (
    <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-6 md:gap-12 lg:gap-22 xl:gap-32">
      {reverse ? mediaNode : folderNode}
      {reverse ? folderNode : mediaNode}
    </div>
  );
}

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
