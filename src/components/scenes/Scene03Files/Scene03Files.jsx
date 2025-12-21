"use client";

import { useEffect, useRef, useState } from "react";
import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";
import { DitherShader } from "@/components/ui/dither-shader";

function FolderPair({ folderProps, media, reverse = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const folderRef = useRef(null);

  const updateOffset = () => {
    if (!folderRef.current) {
      return;
    }
    const rect = folderRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2;
    const extraX = rect.width / 2;
    setOffset({
      x: Math.round(targetX - centerX + extraX),
      y: Math.round(targetY - centerY),
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
    <BlackWhiteFolder
      ref={folderRef}
      isOpen={isOpen}
      onOpen={() => {
        updateOffset();
        setIsOpen(true);
      }}
      onClose={() => setIsOpen(false)}
      {...folderProps}
    />
  );

  return (
    <div
      className={`relative transition-transform duration-700 ease-in-out ${
        isOpen ? "z-50" : ""
      }`}
      style={{
        transform: isOpen
          ? `translate(${offset.x}px, ${offset.y}px)`
          : "translate(0px, 0px)",
        willChange: "transform",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-60">
        {reverse ? media : folderNode}
        {reverse ? folderNode : media}
      </div>
    </div>
  );
}

export default function Scene03Files() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-60">
        <FolderPair
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
                className="h-[50vmin] w-[50vmin]"
              />
            </div>
          }
        />
        <FolderPair
          reverse
          folderProps={{
            label: "UWSummit",
            folderRotation: "2deg",
            paperRotation: "-2deg",
          }}
          media={
            <DitherShader
              src="/pizza.png"
              colorMode="grayscale"
              gridSize={1}
              objectFit="contain"
              className="h-[60vmin] w-[60vmin]"
            />
          }
        />
      </div>
    </section>
  );
}
