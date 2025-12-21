"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Polaroid from "@/components/fx/Polaroid.jsx";

export default function Scene02Corkboard() {
  const items = [
    { caption: "Case 014", className: "-rotate-6" },
    { caption: "Witness", className: "rotate-3" },
    { caption: "Evidence", className: "-rotate-2" },
  ];
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [pins, setPins] = useState([]);

  useLayoutEffect(() => {
    const updatePins = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const nextPins = items.map((_, index) => {
        const el = cardRefs.current[index];
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + 12,
        };
      });
      setPins(nextPins.filter(Boolean));
    };

    updatePins();
    const ro = new ResizeObserver(updatePins);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", updatePins);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePins);
    };
  }, [items.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6">
        <div
          ref={containerRef}
          className="relative flex items-center justify-center gap-10"
        >
          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full">
            {pins.slice(1).map((pin, index) => {
              const prev = pins[index];
              const midX = (prev.x + pin.x) / 2;
              const midY = Math.max(prev.y, pin.y) + 46;
              return (
                <path
                  key={`${prev.x}-${prev.y}-${pin.x}-${pin.y}`}
                  d={`M ${prev.x} ${prev.y} Q ${midX} ${midY} ${pin.x} ${pin.y}`}
                  stroke="#b91c1c"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </svg>
          {pins.map((pin, index) => (
            <div
              key={`${pin.x}-${pin.y}-${index}`}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ left: pin.x, top: pin.y }}
            >
              <div className="relative h-4 w-4 rounded-full border border-neutral-500 bg-neutral-300 shadow-[0_2px_0_rgba(0,0,0,0.35)]">
                <div className="absolute left-[3px] top-[3px] h-2 w-2 rounded-full bg-neutral-100" />
              </div>
            </div>
          ))}
          {items.map((item, index) => (
            <div
              key={item.caption}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="relative z-10"
            >
              <Polaroid caption={item.caption} className={item.className} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
