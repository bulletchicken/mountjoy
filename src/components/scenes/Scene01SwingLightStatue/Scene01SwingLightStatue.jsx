"use client";

import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const serifTypeStyles = {
  lineHeight: "var(--tw-leading,.96)",
  fontWeight: 100,
};

const MONA_ASPECT = 725 / 980;
const LAYER_ANCHORS = {
  mona: {
    className:
      "absolute left-1/2 top-1/2 w-[14%] max-w-[180px] -translate-x-1/2 -translate-y-1/2",
    svg: {
      x: 0.5,
      y: 0.5,
      width: 0.14,
      maxWidth: 180,
      aspectRatio: MONA_ASPECT,
      alignX: 0,
      alignY: -0.9,
    },
  },
  statue: {
    className:
      "absolute bottom-0 left-[60%] w-[38%] max-w-[360px] -translate-x-1/2",
    svg: {
      x: 0.6,
      y: 1,
      width: 0.3,
      maxWidth: 300,
      alignX: -0.4,
      alignY: -1.2,
    },
  },
};
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function Scene01TriangleRevealSwingFast({ backgroundColor }) {
  const hostRef = useRef(null);
  const containerRef = useRef(null);
  const swingMaskRef = useRef(null);
  const swingGroupRef = useRef(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });

  useLayoutEffect(() => {
    if (!hostRef.current) return;
    const el = hostRef.current;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      const nextW = Math.max(1, width);
      const nextH = Math.max(1, height);
      setSize((prev) =>
        prev.w === nextW && prev.h === nextH ? prev : { w: nextW, h: nextH },
      );
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const beam = useMemo(() => {
    const w = size.w;
    const h = size.h;

    // pivot + lamp geometry
    const pivotX = Math.round(w * 0.5);
    const topBarStroke = Math.max(5, Math.round(h * 0.008));
    const pivotY = topBarStroke / 2; // put the ceiling line at the very top
    const ropeLen = Math.round(h * 0.045);
    const lampHalf = Math.round(h * 0.05);
    const lampHeight = Math.round(h * 0.06);
    const lampOffset = Math.round(h * 0.005);
    const lampTopY = pivotY + ropeLen + lampOffset;
    const lampBottomY = lampTopY + lampHeight;
    const lampPoints = `${pivotX},${lampTopY} ${pivotX - lampHalf},${lampBottomY} ${pivotX + lampHalf},${lampBottomY}`;

    // beam starts at lamp tip
    const ax = pivotX;
    const beamOverlap = Math.round(h * 0.03);
    const ay = lampBottomY - beamOverlap;

    // bigger beam; keep a margin from the viewport edges to avoid seam lines
    const by = h * 2 - 6;
    const half = h * 1.0;

    const triPoints = `${ax},${ay} ${ax + half},${by} ${ax - half},${by}`;

    // Big outer rect so rotating never reveals corners
    const pad = Math.max(w, h) * 1.2;
    const x0 = -pad;
    const y0 = -pad;
    const x1 = w + pad;
    const y1 = h + pad;

    // Path with a hole (evenodd)
    const d = [
      `M ${x0} ${y0} H ${x1} V ${y1} H ${x0} Z`,
      `M ${ax} ${ay} L ${ax + half} ${by} L ${ax - half} ${by} Z`,
    ].join(" ");

    const ropeOverlap = Math.round(h * 0.01);

    return {
      ax,
      ay,
      pivotX,
      pivotY,
      topBarStroke,
      lampTopY,
      lampBottomY,
      ropeOverlap,
      lampPoints,
      triPoints,
      overlayD: d,
    };
  }, [size.w, size.h]);

  const swingDeg = 24;
  const swingDur = "2.4s";
  const swing = useMotionValue(0);
  useAnimationFrame((time) => {
    const period = 2.4;
    const angle = Math.sin((time / 1000) * ((2 * Math.PI) / period)) * swingDeg;
    swing.set(angle);
    const transform = `rotate(${angle} ${beam.pivotX} ${beam.pivotY})`;
    if (swingMaskRef.current) {
      swingMaskRef.current.setAttribute("transform", transform);
    }
    if (swingGroupRef.current) {
      swingGroupRef.current.setAttribute("transform", transform);
    }
  });
  const layoutScale = 1;
  const layout = useMemo(() => {
    const vbPad = 0;
    const viewBox = `0 0 ${size.w + vbPad * 2} ${size.h + vbPad * 2}`;
    const textX = size.w * 0.08;
    const textY = size.h * 0.18;
    const textLineHeight = size.h * 0.06;
    const textFontSize = Math.max(16, size.h * 0.023);
    const headingX = size.w * 0.45;
    const headingFontSize = Math.max(64, Math.min(size.h * 0.1, 96));
    const headingYOffset = Math.max(headingFontSize * 0.9, size.h * 0.5);
    const headingY = size.h - headingYOffset;
    const rotValues = `${swingDeg} ${beam.pivotX} ${beam.pivotY}; ${-swingDeg} ${beam.pivotX} ${beam.pivotY}; ${swingDeg} ${beam.pivotX} ${beam.pivotY}`;
    return {
      viewBox,
      textX,
      textY,
      textLineHeight,
      textFontSize,
      headingX,
      headingFontSize,
      headingY,
      rotValues,
    };
  }, [beam.pivotX, beam.pivotY, size.h, size.w]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const statueY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);
  const monaY = useTransform(scrollYProgress, [0, 1], ["-45%", "45%"]);
  const underLayerItems = [
    {
      key: "mona-sketch",
      src: "/mona_lisa.png",
      alt: "Mona Lisa sketch",
      width: 1275,
      height: 1390,
      anchor: "mona",
      motionY: monaY,
      scale: 1,
      scaleSm: 1.85,
      scaleMd: 1.4,
      offsetYSm: 72,
      offsetYMd: 48,
      offsetXSm: -30,
      offsetXMd: 100,
      offsetXLg: 40,
    },
    {
      key: "spray-paint",
      src: "/spray_paint.png",
      alt: "Spray paint",
      width: 1462,
      height: 1796,
      anchor: "statue",
      motionY: statueY,
      offsetX: -380,
      scale: 1.12,
      offsetXSm: -160,
      offsetXMd: -210,
      offsetYSm: -40,
      offsetYMd: -30,
      offsetXLg: -235,
      scaleSm: 1.4,
      scaleMd: 1.12,
      scaleLg: 1.12,
      scaleXl: 1.25,
    },
    {
      key: "statue-sketch",
      src: "/statue.png",
      alt: "Statue sketch",
      width: 1600,
      height: 2400,
      anchor: "statue",
      motionY: statueY,
      offsetX: 60,
      scale: 1.04,
      offsetXSm: 60,
      offsetXMd: 140,
      offsetYSm: -40,
      offsetYMd: -30,
      offsetXLg: 70,
      scaleSm: 1.25,
      scaleMd: 1.04,
      scaleLg: 1.04,
      scaleXl: 1.15,
    },
  ];
  const topLayerItems = [
    {
      key: "mona-real",
      src: "/real_mona_lisa.jpg",
      alt: "Mona Lisa",
      width: 600,
      height: 780,
      anchor: "mona",
      motionY: monaY,
      mask: "beam",
      scale: 0.8,
      scaleSm: 1.6,
      scaleMd: 1.2,
      offsetYSm: 72,
      offsetYMd: 48,
      offsetXSm: -30,
      offsetXMd: 100,
      offsetXLg: 40,
    },
    {
      key: "statue",
      src: "/real_statue.png",
      alt: "Statue",
      width: 1600,
      height: 2400,
      anchor: "statue",
      motionY: statueY,
      mask: "beam",
      offsetX: 60,
      scale: 1.03,
      offsetXSm: 60,
      offsetXMd: 140,
      offsetYSm: -40,
      offsetYMd: -30,
      offsetXLg: 70,
      scaleSm: 1.25,
      scaleMd: 1.03,
      scaleLg: 1.0,
      scaleXl: 1.12,
    },
  ];
  const renderLayerItems = (items) =>
    items.map((item) => {
      const anchor = LAYER_ANCHORS[item.anchor];
      const rect = resolveAnchorRect(item);
      const style = rect
        ? {
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height,
            y: item.motionY,
          }
        : { y: item.motionY };
      const baseClass = rect
        ? "pointer-events-none absolute"
        : `pointer-events-none ${anchor?.className || ""}`;
      const objectFit = item.objectFit || "contain";
      return (
        <motion.div
          key={item.key}
          style={style}
          className={`${baseClass} ${item.className || ""}`}
        >
          <div className="relative h-full w-full">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={rect ? `${Math.round(rect.width)}px` : "100vw"}
              className={`${
                objectFit === "cover" ? "object-cover" : "object-contain"
              } ${item.imageClassName || ""}`}
            />
          </div>
        </motion.div>
      );
    });
  const resolveAnchorRect = (item) => {
    const anchor = LAYER_ANCHORS[item.anchor];
    if (!anchor?.svg) {
      return null;
    }
    const isSm = size.w < 768;
    const isMd = size.w < 1024;
    const isLg = size.w >= 1024 && size.w < 1280;
    const scaleOverride =
      isSm && item.scaleSm != null
        ? item.scaleSm
        : isMd && item.scaleMd != null
          ? item.scaleMd
          : isLg && item.scaleLg != null
            ? item.scaleLg
            : size.w >= 1280 && item.scaleXl != null
              ? item.scaleXl
              : (item.scale ?? 1);
    const combinedScale = scaleOverride * layoutScale;
    const itemOffsetX =
      isSm && item.offsetXSm != null
        ? item.offsetXSm
        : isMd && item.offsetXMd != null
          ? item.offsetXMd
          : isLg && item.offsetXLg != null
            ? item.offsetXLg
          : item.offsetX || 0;
    const itemOffsetY =
      isSm && item.offsetYSm != null
        ? item.offsetYSm
        : isMd && item.offsetYMd != null
          ? item.offsetYMd
          : item.offsetY || 0;
    const { x, y, width, maxWidth, alignX = 0, alignY = 0 } = anchor.svg;
    const widthPx = Math.min(size.w * width, maxWidth ?? Infinity);
    const aspectRatio = anchor.svg.aspectRatio ?? item.width / item.height;
    const heightPx = widthPx / aspectRatio;
    const scaledWidth = widthPx * combinedScale;
    const scaledHeight = heightPx * combinedScale;
    const frameOffsetX = (widthPx - scaledWidth) / 2;
    const frameOffsetY = (heightPx - scaledHeight) / 2;
    return {
      x:
        size.w * x +
        widthPx * alignX +
        frameOffsetX +
        itemOffsetX * layoutScale,
      y:
        size.h * y +
        heightPx * alignY +
        frameOffsetY +
        itemOffsetY * layoutScale,
      width: scaledWidth,
      height: scaledHeight,
    };
  };
  const maskedTopItems = topLayerItems.filter((item) => item.mask === "beam");
  const unmaskedTopItems = topLayerItems.filter((item) => item.mask !== "beam");
  const renderMaskedLayerItems = (items) =>
    items.map((item) => {
      const rect = resolveAnchorRect(item);
      if (!rect) {
        return null;
      }
      const motionStyle = item.motionY ? { y: item.motionY } : undefined;
      const preserveAspectRatio =
        item.objectFit === "cover" ? "xMidYMid slice" : "xMidYMid meet";
      return (
        <motion.g key={item.key} style={motionStyle}>
          <image
            href={item.src}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            preserveAspectRatio={preserveAspectRatio}
          />
        </motion.g>
      );
    });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden z-20"
    >
      <div className="absolute inset-0 -z-10 bg-white" />
      <div
        ref={hostRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-white"
      >
        {/* Revealed layer (behind) */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute inset-0">
            {renderLayerItems(underLayerItems)}
          </div>
          <div className="absolute inset-0 flex items-end justify-center pb-[46.5vh] text-black">
            {/* <h2
              className="text-7xl font-black tracking-tight"
              style={{ fontSize: layout.headingFontSize }}
            >
              EVIDENCE LOG
            </h2>*/}
            {/* <p
              className="mt-4 text-xl opacity-80"
              style={{
                fontFamily: "Times New Roman, Times, serif",
                ...serifTypeStyles,
              }}
            >
              Musée du Louvre, Paris, France
            </p> */}
          </div>
        </div>

        {/* Overlay drawn as a path-with-hole (NO MASK) */}
        <svg
          className="pointer-events-none absolute inset-0 z-40"
          width="100%"
          height="100%"
          viewBox={layout.viewBox}
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <mask id="beamMask" maskUnits="userSpaceOnUse">
              <g ref={swingMaskRef}>
                <path d={beam.overlayD} fill="white" fillRule="evenodd" />
              </g>
            </mask>
          </defs>

          {/* Swinging overlay with hole */}
          <g ref={swingGroupRef}>
            <motion.path
              d={beam.overlayD}
              fillRule="evenodd"
              style={{ fill: backgroundColor }}
            />
            <line
              x1={beam.pivotX}
              y1={beam.pivotY}
              x2={beam.pivotX}
              y2={beam.lampTopY + beam.ropeOverlap}
              stroke="#6b7280"
              strokeWidth={Math.max(5, Math.round(size.h * 0.01))}
            />
            <polygon points={beam.lampPoints} fill="#6b7280" />
          </g>
          <line
            x1={beam.pivotX - Math.round(size.w * 0.03)}
            y1={beam.pivotY}
            x2={beam.pivotX + Math.round(size.w * 0.03)}
            y2={beam.pivotY}
            stroke="#6b7280"
            strokeWidth={beam.topBarStroke}
            strokeLinecap="round"
          />
          {maskedTopItems.length ? (
            <g mask="url(#beamMask)">
              {renderMaskedLayerItems(maskedTopItems)}
            </g>
          ) : null}
          {/* <g mask="url(#beamMask)">
            <text
              x={layout.headingX}
              y={layout.headingY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={layout.headingFontSize}
              fill="#111827"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="-0.04em"
              style={{ paddingLeft: "1rem" }}
            >
              {"ABOUT\u00A0\u00A0\u00A0\u00A0ME "}
            </text>
          </g>*/}
          {/* <g mask="url(#beamMask)">
            <text
              x={textX}
              y={textY}
              fontSize={textFontSize}
              fill="#9ca3af"
              fontFamily="Times New Roman, Times, serif"
              fontWeight="500"
              style={serifTypeStyles}
            >
              <tspan x={textX} dy="0em">
                Studying Systems Design Engineering
              </tspan>
              <tspan x={textX} dy="1.5em">
                at the University of Waterloo.
              </tspan>
              <tspan x={textX} dy="1.5em">
                Loves hackathons, robotics, design,
              </tspan>
              <tspan x={textX} dy="1.5em">
                and was named MLH Top 50 Worldwide.
              </tspan>
            </text>
          </g> */}
        </svg>
        {unmaskedTopItems.length ? (
          <div className="pointer-events-none absolute inset-0 z-[45]">
            {renderLayerItems(unmaskedTopItems)}
          </div>
        ) : null}
        {/* Blur overlays with radial masks: edge vignette + focus around title */}
        {/* <div className="pointer-events-none absolute inset-0 z-50 [backdrop-filter:blur(10px)] [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black)] max-sm:[backdrop-filter:none]" /> */}
        <motion.div
          style={{ y: statueY }}
          className="pointer-events-none absolute left-1/2 top-[19%] z-50 max-w-[420px] -translate-x-1/2 text-center font-mono text-base mix-blend-difference text-white sm:text-lg md:left-[20%] md:top-[26%] md:translate-x-0 md:text-left lg:left-[24%] lg:top-[26%] lg:text-base"
        >
          <p className="text-lg leading-[1.15] tracking-[0.02em] sm:text-xl lg:text-xl xl:text-xl">
            MLH&apos;s Top 50 hacker with 25 hackathons and 15 wins.
          </p>
          <p className="mt-3 text-lg leading-[1.15] tracking-[0.02em] sm:text-xl lg:text-xl xl:text-xl">
            Loves teddy bears and his grandma.
          </p>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-white border-y-4 border-black" />
    </section>
  );
}
