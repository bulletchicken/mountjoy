"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Polaroid from "@/components/fx/Polaroid";

function AnimatedString({ d, start, end, progress }) {
  const duration = Math.max(0.001, end - start);
  const draw = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(
    progress,
    [start, start + duration * 0.2],
    [0, 1],
  );

  return (
    <motion.path
      d={d}
      stroke="#b91c1c"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
      pathLength={draw}
      style={{ opacity }}
    />
  );
}

export default function Scene02Corkboard() {
  const sectionRef = useRef(null);
  const waterlooRef = useRef(null);
  const waterlooPolaroidsRef = useRef(null);
  const waterlooStickyRef = useRef(null);
  const waterlooSydeRef = useRef(null);
  const shopifyRef = useRef(null);
  const htnRef = useRef(null);
  const quantoRef = useRef(null);
  const alicehacksRef = useRef(null);
  const waterlooNewsRef = useRef(null);
  const pinDefinitions = useMemo(
    () => [
      { id: "waterloo-sticky", ref: waterlooStickyRef, x: 0.5, y: 0.15 },
      { id: "waterloo-syde", ref: waterlooSydeRef, x: 0.5, y: 0.3 },
      { id: "shopify-top", ref: shopifyRef, x: 0.5, y: 0.1 },
      { id: "quanto-top", ref: quantoRef, x: 0.6, y: 0.15 },
      { id: "htn-pin", ref: htnRef, x: 0.5, y: 0.18 },
    ],
    [],
  );
  const connections = useMemo(
    () => [
      { from: "waterloo-sticky", to: "waterloo-syde", sag: 56, weight: 220 },
      { from: "waterloo-syde", to: "quanto-top", sag: 56 },
      { from: "quanto-top", to: "shopify-top", sag: 40 },
      { from: "shopify-top", to: "htn-pin", sag: 56 },
    ],
    [],
  );
  const containerRef = useRef(null);
  const [pinPositions, setPinPositions] = useState({});
  const [waterlooHeight, setWaterlooHeight] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const update = () => setIsSmallScreen(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 25%"],
  });
  const stringProgress = useTransform(
    scrollYProgress,
    isSmallScreen ? [0.05, 0.55] : [0.12, 0.55],
    [0, 1],
    { clamp: true },
  );

  const resolvedConnections = useMemo(() => {
    const items = connections
      .map((connection) => {
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
        const d = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
        const yTravel = Math.abs(to.y - from.y);
        const weight =
          connection.weight != null
            ? connection.weight
            : Math.max(20, yTravel);
        return { key: `${connection.from}-${connection.to}`, d, weight };
      })
      .filter(Boolean);

    if (!items.length) {
      return [];
    }
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (!totalWeight) {
      const segment = 1 / items.length;
      return items.map((item, index) => ({
        ...item,
        start: index * segment,
        end: (index + 1) * segment,
      }));
    }
    let cursor = 0;
    return items.map((item) => {
      const start = cursor / totalWeight;
      cursor += item.weight;
      const end = cursor / totalWeight;
      return { ...item, start, end };
    });
  }, [connections, pinPositions]);

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
      requestAnimationFrame(() => {
        updatePins();
        updateWaterlooHeight();
      });
    };

    updateLayout();
    const ro = new ResizeObserver(updateLayout);
    ro.observe(containerRef.current);
    const imageNodes = Array.from(
      containerRef.current.querySelectorAll("img"),
    );
    const handleImageLoad = () => {
      updateLayout();
    };
    imageNodes.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", handleImageLoad);
        img.addEventListener("error", handleImageLoad);
      }
    });
    [
      waterlooRef,
      waterlooPolaroidsRef,
      waterlooStickyRef,
      waterlooSydeRef,
      shopifyRef,
      htnRef,
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
      imageNodes.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, [pinDefinitions]);

  return (
    <section
      ref={sectionRef}
      className="relative z-0 isolate w-full bg-white pt-6 pb-10 -mt-24 cursor-default translate-x-8 overflow-visible"
      style={{
        backgroundImage: "url(/cork_texture.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 534px",
      }}
    >
      <div
        ref={containerRef}
        className="relative mx-auto -mt-80 flex w-full max-w-6xl flex-wrap items-center justify-center gap-12 px-6 overflow-visible"
      >
        <svg className="pointer-events-none absolute inset-0 z-30 h-full w-full">
          {resolvedConnections.map((connection) => (
            <AnimatedString
              key={connection.key}
              d={connection.d}
              start={connection.start}
              end={connection.end}
              progress={stringProgress}
            />
          ))}
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
        <div className="pointer-events-none w-full">
          <div className="mx-auto w-[min(80vw,720px)] rotate-10 pt-6 pb-4 -mb-16 translate-y-12 -translate-x-6">
            <Image
              src="/where_is_he.png"
              alt="Where is he note"
              width={1355}
              height={1029}
              className="h-auto w-full"
            />
          </div>
        </div>
        <div
          ref={waterlooRef}
          className="relative w-full -translate-x-20"
          style={waterlooHeight ? { height: `${waterlooHeight}px` } : undefined}
        >
          <div
            ref={waterlooStickyRef}
            className="absolute left-[15%] top-[25%] rotate-3 mx-auto w-[min(42vw,220px)] z-20 scale-[0.75] -translate-y-12 md:scale-100 md:translate-y-0 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[4deg]"
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
            className="absolute left-[5%] top-[-52%] -rotate-2 w-[min(80vw,700px)] max-w-none z-0 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-1deg]"
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
            className="absolute left-[50%] top-[-30%] rotate-1 w-[min(80vw,680px)] max-w-none z-0 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[2deg]"
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
            className="absolute left-[68%] top-16 md:top-48 w-[min(70vw,420px)] max-w-none z-10 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[1deg]"
          >
            <div className="relative w-full">
              <div className="absolute left-2 top-16 -rotate-8 z-0">
                  <Polaroid
                    src="/the_cat.jpg"
                    alt="Polaroid cat"
                    sizeClass="w-40 md:w-48"
                    imageClass="w-32 h-44 md:w-40 md:h-52"
                    className="scale-[0.8] md:scale-100"
                  />
              </div>
              <div className="absolute left-12 top-14 rotate-5 z-10">
                  <Polaroid
                    src="/the_cat.jpg"
                    alt="Polaroid cat"
                    sizeClass="w-40 md:w-48"
                    imageClass="w-32 h-44 md:w-40 md:h-52"
                    className="scale-[0.8] md:scale-100"
                  />
              </div>
              <div className="invisible">
                  <Polaroid
                    src="/the_cat.jpg"
                    alt=""
                    sizeClass="w-40 md:w-48"
                    imageClass="w-32 h-44 md:w-40 md:h-52"
                    className="scale-[0.8] md:scale-100"
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full min-h-[220px] overflow-visible">
          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 md:gap-8 overflow-visible -translate-y-[180px]">
            <div className="relative w-full min-h-[480px] overflow-visible">
              <div className="group absolute left-[-12%] top-[90px] translate-x-12 md:top-[40px] md:translate-x-0 w-[min(70vw,620px)] max-w-none">
                <div className="relative w-full">
                  <Image
                    src="/quanto_news.png"
                    alt="Quanto news"
                    width={2048}
                    height={2048}
                    className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)] transition-transform duration-200 group-hover:-translate-y-1 group-hover:rotate-[1deg]"
                  />
                  <div className="absolute -left-6 bottom-[-50%] z-10 -rotate-1 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-2deg]">
                    <div className="relative">
                      <Polaroid
                        src="/quanto_selfie.jpeg"
                        alt="Polaroid work snapshot"
                        sizeClass="w-40 md:w-48"
                        imageClass="w-32 h-44 md:w-40 md:h-52"
                        className="scale-[0.8] md:scale-100"
                      />
                    </div>
                  </div>
                  <div className="absolute left-[31%] bottom-[-48%] z-10 -rotate-2 scale-[0.8] md:scale-100">
                    <Image
                      src="/quanto_scribble.png"
                      alt="Software engineer scribble"
                      width={884}
                      height={685}
                      className="h-auto w-[220px] opacity-80"
                    />
                  </div>
                  <div
                    ref={quantoRef}
                    className="absolute right-6 bottom-[-6%] z-10 w-[200px] -rotate-10 scale-[0.82] translate-x-32 translate-y-4 md:scale-100 md:translate-x-0 md:translate-y-0 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-8deg]"
                  >
                    <Image
                      src="/quanto_sticky.png"
                      alt="Quanto Sticky"
                      width={1000}
                      height={1000}
                      className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full overflow-visible -mt-10 -translate-x-4 translate-y-8 md:translate-x-6 md:translate-y-0">
              <div
                ref={shopifyRef}
                className="absolute left-[6%] top-[-10%] z-10 w-full max-w-[220px] scale-[0.75] md:left-[70%] md:scale-100 md:translate-x-0 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[1deg]"
              >
                <Image
                  src="/shopify_sticky.png"
                  alt="Shopify sticker"
                  width={1640}
                  height={2360}
                  className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 md:left-[40%] md:translate-x-0 top-[15%] z-10 rotate-5 w-[520px] origin-top-left scale-[0.7] md:scale-[0.85]">
                <Image
                  src="/shopify_scribble.png"
                  alt="Engineering intern scribble"
                  width={1661}
                  height={463}
                  className="h-auto w-full opacity-80"
                />
              </div>
              <div className="absolute left-[40%] top-[-5%] w-65 shrink-0 -rotate-3 z-10 scale-[1.5]">
                <Image
                  src="/shopee_sticker.png"
                  alt="Shopee sticker"
                  width={2048}
                  height={2048}
                  className="h-auto w-full drop-shadow-[0_1px_1px_rgba(0,0,0,1)]"
                />
              </div>
              <div
                ref={htnRef}
                className="absolute left-[60%] top-[300px] z-10 w-full max-w-[220px] -rotate-2 scale-[0.75] md:left-[-10%] md:top-[280px] md:scale-[1.1] transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-1deg]"
              >
                <Image
                  src="/htn_sticky.png"
                  alt="Hack the North sticky"
                  width={2048}
                  height={2048}
                  className="h-auto w-full drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="absolute left-[-6%] top-[450px] z-0 -rotate-1">
                <Image
                  src="/htn_news.png"
                  alt="Hack the North news clipping"
                  width={1249}
                  height={418}
                  className="h-auto w-[560px] opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="absolute left-[28%] top-[300px] z-10 rotate-2 scale-[0.85] md:left-[20%] md:scale-100">
                <Image
                  src="/htn_scribble.png"
                  alt="Logistics organizer scribble"
                  width={949}
                  height={661}
                  className="h-auto w-[220px] opacity-80"
                />
              </div>
              <div className="relative z-10 mt-[480px] ml-[58%] w-fit -rotate-4 transition-transform duration-200 hover:-translate-y-1 hover:rotate-[-3deg]">
                <div className="relative">
                  <Polaroid
                    src="/htn_obama.jpg"
                    alt="HTN Obama snapshot"
                    sizeClass="w-40 md:w-48"
                    imageClass="w-32 h-44 md:w-40 md:h-52"
                    className="scale-[0.8] md:scale-100"
                  />
                </div>
              </div>
              <div className="absolute left-[-2%] top-[280px] z-10 rotate-8 w-[110px] md:left-[74%] md:top-[300px] transition-transform duration-200 hover:-translate-y-1 hover:rotate-[9deg]">
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
        </div>
      </div>
    </section>
  );
}
