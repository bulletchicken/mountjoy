"use client";

import FolderPair from "@/components/scenes/Scene03Files/FolderPair";
import { DitherShader } from "@/components/ui/dither-shader";
import Secret from "@/components/scenes/Scene03Files/Secret";

function FolderReport({
  name,
  age,
  birthplace,
  residence,
  notesSmall,
  skills,
}) {
  return (
    <div className="h-full w-full border-2 border-black bg-white text-[0.58rem] uppercase tracking-[0.18em] text-black">
      <div className="grid h-full grid-rows-[0.4fr_0.6fr]">
        <div className="grid min-h-0 grid-cols-[0.4fr_0.6fr] grid-rows-2 border-b-2 border-black">
          <div className="border-b-2 border-r-2 border-black p-2">
            Name:
            <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
              {name}
            </div>
          </div>
          <div className="row-span-2 p-2">
            What it does:
            <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
              {notesSmall}
            </div>
            <div className="mt-3">
              Skills / abilities:
              <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
                {skills}
              </div>
            </div>
            <div className="mt-3">
              Base:
              <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
                {birthplace} · {residence}
              </div>
            </div>
          </div>
          <div className="border-r-2 border-black p-2">
            Age:
            <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
              {age}
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col p-2">
          Notes:
          <div className="mt-2 flex-1 border-2 border-black" />
        </div>
      </div>
    </div>
  );
}

export default function Scene03Files() {
  return (
    <section className="relative flex w-full items-center justify-center bg-white overflow-hidden py-40">
      <div className="flex flex-col items-center gap-24 sm:gap-36 lg:gap-48 xl:gap-60">
        <FolderPair
          centerOffsetX={-400}
          folderProps={{
            label: "TED",
            folderRotation: "-2deg",
            paperRotation: "2deg",
            footerLines: [
              "AI teddy bear for sweet grandmas",
              "Healthcare companion teddy bear",
              "Funding: 6.67k",
            ],
          }}
          folderContent={
            <FolderReport
              name="AI Teddy Bear"
              age="Prototype"
              birthplace="Waterloo"
              residence="Care homes"
              hair="Plush"
              eye="LED glow"
              height="24 in"
              weight="3 lb"
              notesSmall="Grandma-safe"
              skills="Check-ins · med reminders"
            />
          }
          media={
            <div className="rotate-2">
              <DitherShader
                src="/ted.avif"
                colorMode="grayscale"
                threshold={0.5}
                gridSize={1}
                objectFit="contain"
                className="h-[50vmin] w-[50vmin] sm:h-[54vmin] sm:w-[54vmin] md:h-[58vmin] md:w-[58vmin] lg:h-[60vmin] lg:w-[60vmin] xl:h-[62vmin] xl:w-[62vmin]"
              />
            </div>
          }
        />
        <FolderPair
          reverse
          spineSide="right"
          centerOffsetX={400}
          folderProps={{
            label: "UWSummit",
            tabSide: "left",
            folderRotation: "2deg",
            paperRotation: "-2deg",
            footerLines: [
              "Waterloo Hot or Not",
              "Viral app for UW students",
              "300k users",
            ],
          }}
          folderContent={
            <FolderReport
              name="Waterloo Hot or Not"
              age="Viral season"
              birthplace="UW campus"
              residence="Group chats"
              hair="N/A"
              eye="N/A"
              height="App"
              weight="Feather"
              notesSmall="Swipe-based"
              skills="Virality · social loops"
            />
          }
          media={
            <div className="pizza-wrap">
              <div className="pizza-spin">
                <DitherShader
                  src="/pizza.png"
                  colorMode="grayscale"
                  gridSize={1}
                  objectFit="contain"
                  className="h-[58vmin] w-[58vmin] sm:h-[64vmin] sm:w-[64vmin] md:h-[68vmin] md:w-[68vmin] lg:h-[70vmin] lg:w-[70vmin] xl:h-[74vmin] xl:w-[74vmin]"
                />
              </div>
            </div>
          }
        />
        <Secret />
      </div>
      <style jsx>{`
        .pizza-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          clip-path: circle(35% at 50% 50%);
        }
        .pizza-spin {
          animation: pizza-spin 12s linear infinite;
          animation-play-state: paused;
          transform-origin: center;
          pointer-events: none;
        }
        .pizza-wrap:hover .pizza-spin {
          animation-play-state: running;
        }
        @keyframes pizza-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
