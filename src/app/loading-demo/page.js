"use client";

import { useEffect, useRef, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const DURATION_MS = 3000;
const HOLD_MS = 600;

const easeInCubic = (t) => t * t * t;
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
const easeInOutWeighted = (t, split = 0.85) => {
  if (t <= split) {
    const local = t / split;
    return 0.5 * easeInCubic(local);
  }
  const local = (t - split) / (1 - split);
  return 0.5 + 0.5 * easeOutQuint(local);
};

export default function LoadingDemoPage() {
  const [rawProgress, setRawProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const timeoutRef = useRef(null);
  const endSequenceRef = useRef(false);

  useEffect(() => {
    const tick = (now) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      if (elapsed < HOLD_MS) {
        setRawProgress(0);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const activeElapsed = elapsed - HOLD_MS;
      const activeDuration = Math.max(1, DURATION_MS - HOLD_MS);
      const clamped = Math.min(1, activeElapsed / activeDuration);
      const eased = easeInOutWeighted(clamped);
      const next = Math.max(0, Math.round(eased * 100));
      setRawProgress(next);

      if (clamped < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (rawProgress < 88 || endSequenceRef.current) {
      if (endSequenceRef.current) return;
      const stepped = (() => {
        if (rawProgress >= 24 && rawProgress < 36) {
          return Math.round(rawProgress / 4) * 4;
        }
        if (rawProgress >= 36 && rawProgress < 62) {
          return Math.round(rawProgress / 6) * 6;
        }
        if (rawProgress >= 62 && rawProgress < 82) {
          return Math.round(rawProgress / 4) * 4;
        }
        if (rawProgress >= 82 && rawProgress < 88) {
          return Math.round(rawProgress / 2) * 2;
        }
        return Math.round(rawProgress);
      })();
      setDisplayProgress(stepped);
      return;
    }

    endSequenceRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const sequence = [
      { value: 88, delay: 300 },
      { value: 93, delay: 120 },
      { value: 94, delay: 140 },
      { value: 95, delay: 170 },
      { value: 96, delay: 210 },
      { value: 97, delay: 250 },
      { value: 98, delay: 300 },
      { value: 99, delay: 360 },
      { value: 100, delay: 420 },
    ];

    let index = 0;
    const step = () => {
      const current = sequence[index];
      if (!current) return;
      setDisplayProgress(current.value);
      index += 1;
      if (index < sequence.length) {
        timeoutRef.current = setTimeout(step, current.delay);
      }
    };

    step();
  }, [rawProgress]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <LoadingScreen isVisible progress={displayProgress} minDigits={2} />
    </main>
  );
}
