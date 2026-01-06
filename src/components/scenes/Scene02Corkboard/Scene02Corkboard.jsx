"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Polaroid from "@/components/fx/Polaroid";

export default function Scene02Corkboard() {
  const waterlooRef = useRef(null);
  const waterlooPolaroidsRef = useRef(null);
  const waterlooStickyRef = useRef(null);
  const waterlooSydeRef = useRef(null);
  const shopifyRef = useRef(null);
  const quantoRef = useRef(null);
  const alicehacksRef = useRef(null);
  const waterlooNewsRef = useRef(null);
  const pinDefinitions = useMemo(
    () => [
      { id: "waterloo-sticky", ref: waterlooStickyRef, x: 0.5, y: 0.15 },
      { id: "waterloo-news", ref: waterlooNewsRef, x: 0.6, y: 0.375 },
      { id: "waterloo-syde", ref: waterlooSydeRef, x: 0.5, y: 0.3 },
      { id: "waterloo-polaroids", ref: waterlooPolaroidsRef, x: 0.4, y: 0.3 },
      { id: "shopify-top", ref: shopifyRef, x: 0.5, y: 0.1 },
      { id: "quanto-top", ref: quantoRef, x: 0.6, y: 0.15 },
    ],
    [],
  );
  const connections = useMemo(
    () => [
      { from: "waterloo-news", to: "waterloo-sticky", sag: 56 },
      { from: "waterloo-sticky", to: "waterloo-syde", sag: 56 },
      { from: "waterloo-syde", to: "waterloo-polaroids", sag: 56 },
      { from: "waterloo-polaroids", to: "quanto-top", sag: 56 },
      { from: "quanto-top", to: "shopify-top", sag: 40 },
    ],
    [],
  );
  const containerRef = useRef(null);
  const [pinPositions, setPinPositions] = useState({});
  const [waterlooHeight, setWaterlooHeight] = useState(0);

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
      pinDefinitions.forEach((pin) => {
        const el = pin.ref.current;
        if (!el) {
          return;
        }
        const rect = el.getBoundingClientRect();
        nextPins[pin.id] = {
          x: rect.left - containerRect.left + rect.width * pin.x,
          y: rect.top - containerRect.top + rect.height * pin.y,
        };
      });
      setPinPositions(nextPins);
    };

    const updateWaterlooHeight = () => {
      if (!waterlooRef.current) {
        return;
      }
      const sectionRect = waterlooRef.current.getBoundingClientRect();
      const bottoms = [
        waterlooStickyRef.current,
        waterlooNewsRef.current,
        waterlooSydeRef.current,
        waterlooPolaroidsRef.current,
      ]
        .filter(Boolean)
        .map((el) => el.getBoundingClientRect().bottom - sectionRect.top);
      const maxBottom = bottoms.length ? Math.max(...bottoms) : 0;
      setWaterlooHeight(Math.ceil(maxBottom));
    };

    const updateLayout = () => {
      updatePins();
      updateWaterlooHeight();
    };

    updateLayout();
    const ro = new ResizeObserver(updateLayout);
    ro.observe(containerRef.current);
    [
      waterlooRef,
      waterlooPolaroidsRef,
      waterlooStickyRef,
      waterlooSydeRef,
      shopifyRef,
      quantoRef,
      alicehacksRef,
      waterlooNewsRef,
    ].forEach((ref) => {
      if (ref.current) {
        ro.observe(ref.current);
      }
    });
    window.addEventListener("resize", updateLayout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [pinDefinitions]);

  return (
    <section className="relative w-full bg-white py-16 cursor-default">
      <div
        ref={containerRef}
        className="relative mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-12 px-6 overflow-visible"
      >
        <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full">
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
            className="pointer-events-none absolute z-40 -translate-x-1/2 -translate-y-1/2"
            style={{ left: pos.x, top: pos.y }}
          >
            <div className="relative h-4 w-4 rounded-full border border-neutral-500 bg-neutral-300">
              <div className="absolute left-[3px] top-[3px] h-2 w-2 rounded-full bg-neutral-100" />
            </div>
          </div>
        ))}
        <div
          ref={waterlooRef}
          className="relative w-full"
          style={waterlooHeight ? { height: `${waterlooHeight}px` } : undefined}
        >
          <div className="pointer-events-none absolute left-[-5%] top-[-70%] z-10 w-[min(80vw,760px)]">
            <Image
              src="/where_is_he.png"
              alt="Where is he note"
              width={2388}
              height={1668}
              className="h-auto w-full"
            />
          </div>
          <div
            ref={waterlooStickyRef}
            className="absolute left-[15%] top-[25%] rotate-3 mx-auto w-full max-w-[220px] z-20 transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src="/waterloo_sticky.png"
              alt="Waterloo crest sticky"
              width={2048}
              height={2048}
              className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
            />
          </div>
          <div
            ref={waterlooNewsRef}
            className="absolute left-[5%] top-[-52%] -rotate-2 w-[min(80vw,700px)] max-w-none z-0 transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src="/waterloo_news.png"
              alt="Waterloo engineering news"
              width={2048}
              height={2048}
              className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
            />
          </div>
          <div
            ref={waterlooSydeRef}
            className="absolute left-[50%] top-[-30%] rotate-1 w-[min(80vw,680px)] max-w-none z-0 transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src="/waterloo_syde.png"
              alt="Waterloo SYDE note"
              width={2048}
              height={2048}
              className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
            />
          </div>
          <div
            ref={waterlooPolaroidsRef}
            className="absolute left-[65%] top-48 w-[min(70vw,420px)] max-w-none z-10 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative w-full">
              <div className="absolute left-2 top-16 -rotate-8 z-0">
                <Polaroid
                  src="/the_cat.jpg"
                  alt="Polaroid cat"
                  sizeClass="w-44 sm:w-52"
                  imageClass="w-32 h-40 sm:w-40 sm:h-48"
                />
              </div>
              <div className="absolute left-12 top-14 rotate-5 z-10">
                <Polaroid
                  src="/the_cat.jpg"
                  alt="Polaroid cat"
                  sizeClass="w-44 sm:w-52"
                  imageClass="w-32 h-40 sm:w-40 sm:h-48"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                />
              </div>
              <div className="invisible">
                <Polaroid
                  src="/the_cat.jpg"
                  alt=""
                  sizeClass="w-44 sm:w-52"
                  imageClass="w-32 h-40 sm:w-40 sm:h-48"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full min-h-[320px] overflow-visible">
          <div className="relative mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-10 min-h-[520px] overflow-visible">
            <div
              ref={shopifyRef}
              className="absolute left-[60%] top-[300px] z-10 w-full max-w-[220px] transition-transform duration-200 hover:scale-[1.02]"
            >
              <Image
                src="/shopify_sticky.png"
                alt="Shopify sticker"
                width={1640}
                height={2360}
                className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
              />
            </div>
            <div className="absolute left-[-8%] top-0 -rotate-1 z-0 transition-transform duration-200 hover:scale-[1.02]">
              <div className="relative">
                <Polaroid
                  src="/title_photo.png"
                  alt="Polaroid work snapshot"
                  sizeClass="w-44 sm:w-52"
                  imageClass="w-32 h-40 sm:w-40 sm:h-48"
                  className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
                />
                <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2">
                  <div className="relative h-4 w-4 rounded-full border border-neutral-500 bg-neutral-300">
                    <div className="absolute left-[3px] top-[3px] h-2 w-2 rounded-full bg-neutral-100" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-[78%] top-[300px] w-[280px] shrink-0 -rotate-3 z-10">
              <Image
                src="/shopee_sticker.png"
                alt="Shopee sticker"
                width={2048}
                height={2048}
                className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
              />
            </div>
            <div
              ref={quantoRef}
              className="absolute left-[10%] top-[-80px] z-10 w-[200px] shrink-0 -rotate-10 scale-[1.1] transition-transform duration-200 hover:scale-[1.13]"
            >
              <Image
                src="/quanto_sticky.png"
                alt="Quanto Sticky"
                width={1000}
                height={1000}
                className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
              />
            </div>
            <div className="absolute left-[28%] top-[40px] -rotate-2 w-[min(80vw,700px)] max-w-none z-0 transition-transform duration-200 hover:scale-[1.02]">
              <Image
                src="/quanto_news.png"
                alt="Quanto news"
                width={2048}
                height={2048}
                className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
              />
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div
            ref={alicehacksRef}
            className="relative mx-auto w-full max-w-[120px] -rotate-4"
          >
            <Image
              src="/alicehacks_sticker.png"
              alt="AliceHacks sticker"
              width={1640}
              height={2360}
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
