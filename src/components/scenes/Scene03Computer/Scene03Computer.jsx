"use client";

import Image from "next/image";

export default function Scene03Computer() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6">
        <div className="relative w-[360px] sm:w-[520px] md:w-[720px] lg:w-[860px] xl:w-[980px] max-w-none">
          <div className="absolute inset-[16%] bg-[#f3f4f6]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-black">
              <div className="text-xs uppercase tracking-[0.3em]">
                System Login
              </div>
              <div className="text-2xl font-semibold">Welcome Back</div>
              <div className="text-sm opacity-70">Enter credentials</div>
            </div>
          </div>
          <Image
            src="/computer_border.png"
            alt="Vintage monitor frame"
            width={3402}
            height={2716}
            priority
            className="absolute h-auto w-full z-30"
          />
        </div>
      </div>
    </section>
  );
}
