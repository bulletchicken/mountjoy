"use client";

import { useEffect, useRef, useState } from "react";
import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";

export default function FolderPair({
  folderProps,
  media,
  folderContent,
  reverse = false,
  centerOffsetX = 0,
  spineSide = "left",
  targetXRatio = 0.5,
  targetXRatioLarge,
  largeBreakpoint = 1280,
  smallBreakpoint = 640,
  maxOffsetXSmall = 120,
  folderClosedClassName = "",
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

  const resolvedFolderContent =
    typeof folderContent === "function"
      ? folderContent({ isOpen })
      : folderContent;

  const folderNode = (
    <div
      ref={folderRef}
      className={`relative z-20 transition-transform duration-700 ease-in-out ${
        isOpen ? "z-50" : folderClosedClassName
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
      >
        {resolvedFolderContent}
      </BlackWhiteFolder>
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
    <div className="flex flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 xl:gap-24">
      {reverse ? mediaNode : folderNode}
      {reverse ? folderNode : mediaNode}
    </div>
  );
}
