"use client";

import Polaroid from "@/components/fx/Polaroid.jsx";

export default function Scene02Corkboard() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center gap-10 px-6">
        <Polaroid caption="Case 014" className="-rotate-6" />
        <Polaroid caption="Witness" className="rotate-3" />
        <Polaroid caption="Evidence" className="-rotate-2" />
      </div>
    </section>
  );
}
