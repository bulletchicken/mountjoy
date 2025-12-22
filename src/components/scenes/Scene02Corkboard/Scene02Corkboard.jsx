"use client";

import Image from "next/image";

export default function Scene02Corkboard() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-12 px-6">
        <div className="relative w-full max-w-[420px]">
          <Image
            src="/waterloo_sticky.png"
            alt="Waterloo crest sticky"
            width={2048}
            height={2048}
            className="h-auto w-full"
          />
        </div>
        <div className="relative w-full max-w-[200px] -rotate-4">
          <Image
            src="/alicehacks_sticker.png"
            alt="AliceHacks sticker"
            width={1640}
            height={2360}
            className="h-auto w-full"
          />
        </div>
      </div>
      <div className="relative w-full max-w-[420px]">
        <Image
          src="/shopify_sticky.png"
          alt="Shopify sticker"
          width={1640}
          height={2360}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
