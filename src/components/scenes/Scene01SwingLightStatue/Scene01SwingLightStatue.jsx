"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

export default function Scene01TriangleRevealSwingFast({ backgroundColor }) {
  const hostRef = useRef(null);
  const [size, setSize] = useState({ w: 1200, h: 800 });

  useLayoutEffect(() => {
    if (!hostRef.current) return;
    const el = hostRef.current;

    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({
        w: Math.max(1, Math.round(r.width)),
        h: Math.max(1, Math.round(r.height)),
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
    const pivotY = Math.round(h * 0.28);
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

    // bigger beam
    const by = Math.round(h * 1.9);
    const half = Math.round(h * 1.1);

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

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "450vh" }}>
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor }}
      />
      <div
        ref={hostRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-white"
      >
        {/* Revealed layer (behind) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-black">
            <h2 className="text-7xl font-black tracking-tight">EVIDENCE LOG</h2>
            <p className="mt-4 text-lg opacity-80">
              you can’t see this unless the light hits it.
            </p>
          </div>
        </div>

        {/* Overlay drawn as a path-with-hole (NO MASK) */}
        <svg
          className="pointer-events-none absolute inset-0"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          preserveAspectRatio="xMidYMid meet"
          shapeRendering="geometricPrecision"
        >
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
              strokeWidth={Math.max(3, Math.round(size.h * 0.007))}
            />
            <polygon points={beam.lampPoints} fill="#6b7280" />
          </g>
          <line
            x1={beam.pivotX - Math.round(size.w * 0.04)}
            y1={beam.pivotY}
            x2={beam.pivotX + Math.round(size.w * 0.04)}
            y2={beam.pivotY}
            stroke="#6b7280"
            strokeWidth={Math.max(3, Math.round(size.h * 0.004))}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
