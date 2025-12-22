"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

export default function Scene02Corkboard() {
  const items = useMemo(
    () => [
      {
        id: "waterloo",
        src: "/waterloo_sticky.png",
        alt: "Waterloo crest sticky",
        width: 2048,
        height: 2048,
        className: "",
        maxWidth: "max-w-[420px]",
        imageClassName: "drop-shadow-[0_1px_2px_rgba(0,0,0,1)]",
        pins: [{ id: "waterloo-top", x: 0.5, y: 0.12 }],
      },
      {
        id: "alicehacks",
        src: "/alicehacks_sticker.png",
        alt: "AliceHacks sticker",
        width: 1640,
        height: 2360,
        className: "-rotate-4",
        maxWidth: "max-w-[200px]",
      },
      {
        id: "shopify",
        src: "/shopify_sticky.png",
        alt: "Shopify sticker",
        width: 1640,
        height: 2360,
        className: "",
        maxWidth: "max-w-[420px]",
        imageClassName: "drop-shadow-[0_1px_2px_rgba(0,0,0,1)]",
        pins: [{ id: "shopify-top", x: 0.5, y: 0.1 }],
      },
    ],
    [],
  );
  const connections = useMemo(
    () => [{ from: "waterloo-top", to: "shopify-top", sag: 56 }],
    [],
  );
  const containerRef = useRef(null);
  const itemRefs = useRef({});
  const [pinPositions, setPinPositions] = useState({});

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const updatePins = () => {
      if (!containerRef.current) {
        return;
      }
      const containerRect = containerRef.current.getBoundingClientRect();
      const nextPins = {};
      items.forEach((item) => {
        const el = itemRefs.current[item.id];
        if (!el) {
          return;
        }
        const rect = el.getBoundingClientRect();
        (item.pins ?? []).forEach((pin) => {
          nextPins[pin.id] = {
            x: rect.left - containerRect.left + rect.width * pin.x,
            y: rect.top - containerRect.top + rect.height * pin.y,
          };
        });
      });
      setPinPositions(nextPins);
    };

    updatePins();
    const ro = new ResizeObserver(updatePins);
    ro.observe(containerRef.current);
    Object.values(itemRefs.current).forEach((el) => {
      if (el) {
        ro.observe(el);
      }
    });
    window.addEventListener("resize", updatePins);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePins);
    };
  }, [items]);

  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      <div
        ref={containerRef}
        className="relative mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-12 px-6"
      >
        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full">
          {connections.map((connection) => {
            const from = pinPositions[connection.from];
            const to = pinPositions[connection.to];
            if (!from || !to) {
              return null;
            }
            const midX = (from.x + to.x) / 2;
            const sag =
              connection.sag ??
              Math.max(24, Math.min(80, Math.abs(to.x - from.x) * 0.18));
            const midY = Math.max(from.y, to.y) + sag;
            return (
              <path
                key={`${connection.from}-${connection.to}`}
                d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                stroke="#b91c1c"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>
        {Object.entries(pinPositions).map(([pinId, pos]) => (
          <div
            key={pinId}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: pos.x, top: pos.y }}
          >
            <div className="relative h-4 w-4 rounded-full border border-neutral-500 bg-neutral-300">
              <div className="absolute left-[3px] top-[3px] h-2 w-2 rounded-full bg-neutral-100" />
            </div>
          </div>
        ))}
        {items.map((item) => (
          <div
            key={item.id}
            ref={(el) => {
              itemRefs.current[item.id] = el;
            }}
            className={`relative w-full ${item.maxWidth} ${item.className}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className={`h-auto w-full ${item.imageClassName || ""}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
