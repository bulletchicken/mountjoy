"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const serifTypeStyles = {
  lineHeight: "var(--tw-leading,.96)",
  fontWeight: 100,
};

export default function Scene01TriangleRevealSwingFast({ backgroundColor }) {
  const hostRef = useRef(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });

  useLayoutEffect(() => {
    if (!hostRef.current) return;
    const el = hostRef.current;

    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({
        // keep exact measured size to avoid subpixel gaps at edges
        w: Math.max(1, r.width),
        h: Math.max(1, r.height),
      });
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
  const rotValues = `${swingDeg} ${beam.pivotX} ${beam.pivotY}; ${-swingDeg} ${beam.pivotX} ${beam.pivotY}; ${swingDeg} ${beam.pivotX} ${beam.pivotY}`;
  const vbPad = 0;
  const viewBox = `0 0 ${size.w + vbPad * 2} ${size.h + vbPad * 2}`;
  const textX = size.w * 0.08;
  const textY = size.h * 0.18;
  const textLineHeight = size.h * 0.06;
  const textFontSize = Math.max(16, size.h * 0.023);
  const headingX = size.w * 0.45;
  const headingFontSize = Math.max(64, Math.min(size.h * 0.1, 96));
  const headingYOffset = Math.max(headingFontSize * 0.9, size.h * 0.12);
  const headingY = size.h - headingYOffset;

  return (
    <section className="relative w-full overflow-hidden min-h-screen pt-100">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor }}
      />
      <div
        ref={hostRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-white"
      >
        {/* Revealed layer (behind) */}
        <div className="absolute inset-0 flex items-end justify-center bg-red-500 pb-[8vh]">
          <div className="text-center text-black">
            <h2
              className="text-7xl font-black tracking-tight"
              style={{ fontSize: headingFontSize }}
            >
              EVIDENCE LOG
            </h2>
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
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <mask id="beamMask" maskUnits="userSpaceOnUse">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  dur={swingDur}
                  repeatCount="indefinite"
                  values={rotValues}
                  keyTimes="0; 0.5; 1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                />
                <path d={beam.overlayD} fill="white" fillRule="evenodd" />
              </g>
            </mask>
          </defs>

          {/* Swinging overlay with hole */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur={swingDur}
              repeatCount="indefinite"
              values={rotValues}
              keyTimes="0; 0.5; 1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
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
          <g mask="url(#beamMask)">
            <text
              x={headingX}
              y={headingY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={headingFontSize}
              fill="#111827"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="-0.04em"
              style={{ paddingLeft: "1rem" }}
            >
              {"ABOUT\u00A0\u00A0\u00A0\u00A0ME "}
            </text>
          </g>
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
        {/* Blur overlays with radial masks: edge vignette + focus around title */}
        <div className="pointer-events-none absolute inset-0 z-50 [backdrop-filter:blur(10px)] [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black)]" />
      </div>
    </section>
  );
}
