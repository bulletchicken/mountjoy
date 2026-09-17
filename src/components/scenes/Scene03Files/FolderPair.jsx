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
  folderBaseShiftClassName,
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
    // Measure the untransformed position so a resize while open does not
    // re-base the offset on the already-shifted folder.
    const transform = getComputedStyle(folderRef.current).transform;
    const currentTx =
      transform && transform !== "none"
        ? new DOMMatrixReadOnly(transform).m41
        : 0;
    const spineLeft =
      (spineSide === "right" ? rect.right : rect.left) - currentTx;
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

  const folderBaseShift =
    folderBaseShiftClassName ??
    (reverse ? "-translate-x-20" : "translate-x-20");
  const folderNode = (
    <div
      ref={folderRef}
      className={`relative z-20 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${folderBaseShift} sm:translate-x-0 ${
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
      className="relative z-10 transition-transform duration-700 delay-75 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none"
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
    <div className="flex flex-nowrap items-center justify-center gap-0 sm:gap-2 md:gap-4 lg:gap-8 xl:gap-12">
      {reverse ? mediaNode : folderNode}
      {reverse ? folderNode : mediaNode}
    </div>
  );
}
