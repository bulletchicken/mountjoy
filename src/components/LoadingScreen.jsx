"use client";

import { useEffect, useState } from "react";

const DIGIT_SOURCES = {
  0: "/loader/zero.svg",
  1: "/loader/one.svg",
  2: "/loader/two.svg",
  3: "/loader/three.svg",
  4: "/loader/four.svg",
  5: "/loader/five.svg",
  6: "/loader/six.svg",
  7: "/loader/seven.svg",
  8: "/loader/eight.svg",
  9: "/loader/nine.svg",
};

const PERCENT_FRAMES = [
  "/loader/percent1.svg",
  "/loader/percent2.svg",
  "/loader/percent3.svg",
];

const digitClassName = "h-[clamp(36px,8vw,120px)] w-auto select-none";
const percentClassName = "h-[clamp(24px,6vw,90px)] w-auto select-none";

export default function LoadingScreen({ progress, isVisible }) {
  const [percentFrame, setPercentFrame] = useState(0);
  const digits = String(progress).split("");

  useEffect(() => {
    if (!isVisible) return;
    setPercentFrame(0);
    const id = setInterval(() => {
      setPercentFrame((prev) => (prev + 1) % PERCENT_FRAMES.length);
    }, 220);
    return () => clearInterval(id);
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="status"
      aria-label={`Loading ${progress}%`}
      aria-hidden={!isVisible}
    >
      <div
        className="flex items-center gap-[clamp(6px,1.5vw,16px)]"
        aria-hidden="true"
      >
        {digits.map((digit, index) => (
          <img
            key={`${digit}-${index}`}
            src={DIGIT_SOURCES[digit]}
            alt=""
            className={digitClassName}
            draggable="false"
          />
        ))}
        <img
          src={PERCENT_FRAMES[percentFrame]}
          alt=""
          className={percentClassName}
          draggable="false"
        />
      </div>
    </div>
  );
}
