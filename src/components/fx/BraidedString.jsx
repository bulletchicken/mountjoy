"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useTransform } from "framer-motion";

const TAU = Math.PI * 2;
const STRAND_COLORS = ["#e24545", "#bf1f1f", "#871414"];
const CORE_COLOR = "#8d1313";
const FIBER_COLOR = "#b91c1c";
const SHADOW_COLOR = "rgba(28,8,4,0.32)";

// Small deterministic noise so each string keeps the same fray between frames.
function rand(seed, i) {
  const x = Math.sin(seed * 12.9898 + i * 78.233 + 1.7) * 43758.5453;
  return x - Math.floor(x);
}

function smoothstep(a, b, x) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function fmt(n) {
  return Math.round(n * 10) / 10;
}

function toPath(points) {
  let d = "";
  for (let i = 0; i < points.length; i += 1) {
    d += `${i === 0 ? "M" : "L"}${fmt(points[i].x)} ${fmt(points[i].y)}`;
  }
  return d;
}

// Resample the quadratic bezier from -> ctrl -> to into points evenly spaced
// by arc length, with tangents and normals.
function samplePath(from, ctrl, to, step) {
  const coarse = [];
  const M = 48;
  let length = 0;
  for (let i = 0; i <= M; i += 1) {
    const t = i / M;
    const mt = 1 - t;
    const x = mt * mt * from.x + 2 * mt * t * ctrl.x + t * t * to.x;
    const y = mt * mt * from.y + 2 * mt * t * ctrl.y + t * t * to.y;
    if (i > 0) {
      const p = coarse[i - 1];
      length += Math.hypot(x - p.x, y - p.y);
    }
    coarse.push({ x, y, d: length });
  }
  const count = Math.max(16, Math.min(420, Math.round(length / step)));
  const points = [];
  let j = 0;
  for (let i = 0; i <= count; i += 1) {
    const target = (i / count) * length;
    while (j < M - 1 && coarse[j + 1].d < target) j += 1;
    const a = coarse[j];
    const b = coarse[j + 1];
    const span = b.d - a.d || 1;
    const u = Math.min(1, Math.max(0, (target - a.d) / span));
    points.push({
      x: a.x + (b.x - a.x) * u,
      y: a.y + (b.y - a.y) * u,
      d: target,
    });
  }
  for (let i = 0; i <= count; i += 1) {
    const p = points[Math.max(0, i - 1)];
    const q = points[Math.min(count, i + 1)];
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    points[i].tx = dx / len;
    points[i].ty = dy / len;
    points[i].nx = -dy / len;
    points[i].ny = dx / len;
  }
  return { points, length };
}

function pointAt(points, length, d) {
  const count = points.length - 1;
  const f = Math.min(1, Math.max(0, d / (length || 1))) * count;
  const i = Math.min(count - 1, Math.floor(f));
  const u = f - i;
  const a = points[i];
  const b = points[i + 1];
  return {
    x: a.x + (b.x - a.x) * u,
    y: a.y + (b.y - a.y) * u,
    tx: a.tx,
    ty: a.ty,
    nx: a.nx,
    ny: a.ny,
    d,
  };
}

// A short curved fibre poking out of the cord.
function hair(base, dirX, dirY, len, bend) {
  const midX = base.x + dirX * len * 0.5 - dirY * bend;
  const midY = base.y + dirY * len * 0.5 + dirX * bend;
  return `M${fmt(base.x)} ${fmt(base.y)}Q${fmt(midX)} ${fmt(midY)} ${fmt(
    base.x + dirX * len,
  )} ${fmt(base.y + dirY * len)}`;
}

function buildGeometry({ from, to, sag, width, seed, draw }) {
  // The string is pulled taut as it reaches the second pin.
  const sagMult = 1 + 0.22 * (1 - smoothstep(0.45, 1, draw));
  const ctrl = {
    x: (from.x + to.x) / 2,
    y: Math.max(from.y, to.y) + sag * sagMult,
  };
  const { points, length } = samplePath(
    from,
    ctrl,
    to,
    Math.max(1.8, width * 0.36),
  );
  const visibleLen = draw * length;

  // Near the moving tip the three strands hang loose and twist together
  // behind it; once the string is fully pinned everything is tight.
  const tipLoose = 1 - smoothstep(0.86, 1, draw);
  const looseSpan = Math.max(90, width * 18);
  const aTight = width * 0.3;
  const aLoose = width * 1.1;
  const period = width * 2.6;

  const core = [];
  const strands = [[], [], []];
  let phase = seed * 1.3;
  let prevD = 0;

  const pushPoint = (p, index) => {
    const behind = visibleLen - p.d;
    const loose = (1 - smoothstep(0, looseSpan, behind)) * tipLoose;
    phase += ((p.d - prevD) / period) * TAU;
    prevD = p.d;
    core.push(p);
    for (let k = 0; k < 3; k += 1) {
      const jitter = (rand(seed, index * 3 + k) - 0.5) * width * 0.14;
      // Tight braid behind the tip; the three fibres fan apart and waver
      // slightly in the loose stretch right behind the moving tip.
      const braid = aTight * Math.sin(phase + (k * TAU) / 3) * (1 - loose);
      const fan =
        loose *
        aLoose *
        ((k - 1) * 0.9 + 0.35 * Math.sin(p.d / (width * 3.2) + k * 2.1));
      const off = braid + fan + jitter;
      strands[k].push({ x: p.x + p.nx * off, y: p.y + p.ny * off });
    }
  };

  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    if (p.d > visibleLen) {
      if (i > 0) pushPoint(pointAt(points, length, visibleLen), i);
      break;
    }
    pushPoint(p, i);
  }

  // Sparse fuzz along the cord.
  let fuzz = "";
  let cursor = 40 + rand(seed, 900) * 40;
  let n = 0;
  while (cursor < length - 30) {
    if (cursor < visibleLen - 4) {
      const base = pointAt(points, length, cursor);
      const side = rand(seed, 1000 + n) > 0.5 ? 1 : -1;
      const tilt = (rand(seed, 1100 + n) - 0.5) * 1.1;
      const dirX = (base.nx * side + base.tx * tilt) / Math.hypot(1, tilt);
      const dirY = (base.ny * side + base.ty * tilt) / Math.hypot(1, tilt);
      const len = width * (0.55 + rand(seed, 1200 + n) * 0.5);
      const start = {
        x: base.x + base.nx * side * width * 0.32,
        y: base.y + base.ny * side * width * 0.32,
      };
      fuzz += hair(start, dirX, dirY, len, (rand(seed, 1300 + n) - 0.5) * 2);
    }
    cursor += 85 + rand(seed, 1400 + n) * 50;
    n += 1;
  }

  // Frayed ends beside each pin.
  const frayAt = (d, backward, offset) => {
    let path = "";
    for (let k = 0; k < 3; k += 1) {
      const base = pointAt(points, length, d + k * 2.4 * (backward ? 1 : -1));
      const side = k % 2 === 0 ? 1 : -1;
      const theta = 0.55 + rand(seed, offset + k) * 0.7;
      const along = backward ? -1 : 1;
      const dirX = base.tx * along * Math.cos(theta) + base.nx * side * Math.sin(theta);
      const dirY = base.ty * along * Math.cos(theta) + base.ny * side * Math.sin(theta);
      const len = width * (0.9 + rand(seed, offset + 10 + k) * 0.7);
      path += hair(base, dirX, dirY, len, (rand(seed, offset + 20 + k) - 0.5) * 2.5);
    }
    return path;
  };
  const frayStart = length > 40 ? frayAt(9, true, 2000) : "";
  const frayEnd = length > 40 ? frayAt(length - 9, false, 3000) : "";

  return {
    core: toPath(core),
    strands: strands.map(toPath),
    fuzz,
    frayStart,
    frayEnd,
    frayStartOpacity: smoothstep(0.02, 0.08, draw),
    frayEndOpacity: smoothstep(0.94, 1, draw),
    opacity: smoothstep(0, 0.03, draw),
  };
}

export default function BraidedString({
  from,
  to,
  sag,
  start,
  end,
  progress,
  width = 6,
  seed = 1,
}) {
  const draw = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const groupRef = useRef(null);
  const shadowRef = useRef(null);
  const coreRef = useRef(null);
  const strandRefs = [useRef(null), useRef(null), useRef(null)];
  const fuzzRef = useRef(null);
  const frayStartRef = useRef(null);
  const frayEndRef = useRef(null);

  const render = (value) => {
    if (!groupRef.current) return;
    if (value <= 0) {
      groupRef.current.setAttribute("opacity", "0");
      return;
    }
    const g = buildGeometry({ from, to, sag, width, seed, draw: value });
    groupRef.current.setAttribute("opacity", String(g.opacity));
    shadowRef.current?.setAttribute("d", g.core);
    coreRef.current?.setAttribute("d", g.core);
    strandRefs.forEach((ref, k) => ref.current?.setAttribute("d", g.strands[k]));
    fuzzRef.current?.setAttribute("d", g.fuzz);
    if (frayStartRef.current) {
      frayStartRef.current.setAttribute("d", g.frayStart);
      frayStartRef.current.setAttribute("opacity", String(g.frayStartOpacity));
    }
    if (frayEndRef.current) {
      frayEndRef.current.setAttribute("d", g.frayEnd);
      frayEndRef.current.setAttribute("opacity", String(g.frayEndOpacity));
    }
  };

  useMotionValueEvent(draw, "change", render);
  useEffect(() => {
    render(draw.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from.x, from.y, to.x, to.y, sag, width, seed]);

  return (
    <g
      ref={groupRef}
      opacity="0"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        ref={shadowRef}
        stroke={SHADOW_COLOR}
        strokeWidth={width * 1.05}
        transform="translate(1.6 2.4)"
      />
      <path ref={coreRef} stroke={CORE_COLOR} strokeWidth={width * 0.9} />
      {STRAND_COLORS.map((color, k) => (
        <path
          key={color}
          ref={strandRefs[k]}
          stroke={color}
          strokeWidth={width * 0.46}
        />
      ))}
      <path
        ref={fuzzRef}
        stroke={FIBER_COLOR}
        strokeWidth={Math.max(0.8, width * 0.14)}
        opacity="0.75"
      />
      <path
        ref={frayStartRef}
        stroke={FIBER_COLOR}
        strokeWidth={Math.max(0.9, width * 0.17)}
      />
      <path
        ref={frayEndRef}
        stroke={FIBER_COLOR}
        strokeWidth={Math.max(0.9, width * 0.17)}
      />
    </g>
  );
}
