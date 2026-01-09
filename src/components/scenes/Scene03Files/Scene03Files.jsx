"use client";

import FolderPair from "@/components/scenes/Scene03Files/FolderPair";
import { DitherShader } from "@/components/ui/dither-shader";
import Secret from "@/components/scenes/Scene03Files/Secret";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

function FolderReport({
  name,
  age,
  birthplace,
  residence,
  notesSmall,
  skills,
  notesContent,
  layout = "default",
  notesVariant = "default",
  notesRowWeight = 0.6,
}) {
  if (layout === "notes-only") {
    return (
      <div className="-m-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] overflow-hidden rounded-[14px] bg-white">
        <div className="relative h-full w-full">{notesContent}</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full border-2 border-black bg-white text-[0.58rem] uppercase tracking-[0.18em] text-black">
      <div
        className="grid h-full"
        style={{
          gridTemplateRows: `${1 - notesRowWeight}fr ${notesRowWeight}fr`,
        }}
      >
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
          {notesVariant === "full" ? (
            <div className="flex-1 -m-2 relative overflow-hidden">
              {notesContent}
            </div>
          ) : (
            <>
              Notes:
              <div className="mt-2 flex-1 border-2 border-black relative overflow-hidden">
                {notesContent}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NotesLinkedInPost({ src }) {
  return (
    <iframe
      src={src}
      title="Embedded LinkedIn post"
      className="absolute inset-0 h-full w-full"
    />
  );
}

export default function Scene03Files() {
  const secretRef = useRef(null);
  const retreatStart = 0.6;
  const retreatDistance = 90;
  const handRetreatDistance = retreatDistance;
  const handStartX = 18;
  const handMidX = -38;
  const handRightOffset = -20;
  const { scrollYProgress: secretScrollY } = useScroll({
    target: secretRef,
    offset: ["start 100%", "center start"],
  });
  const [showClosedHand, setShowClosedHand] = useState(false);
  const handX = useTransform(
    secretScrollY,
    [0, retreatStart, 1],
    [handStartX, handMidX, handMidX + handRetreatDistance],
  );
  const handXValue = useMotionTemplate`${handX}vw`;
  const retreatX = useTransform(
    secretScrollY,
    [retreatStart, 1],
    [0, retreatDistance],
  );
  const secretX = useMotionTemplate`${retreatX}vw`;
  useMotionValueEvent(secretScrollY, "change", (value) => {
    setShowClosedHand(value >= retreatStart);
  });

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
              notesVariant="full"
              notesRowWeight={0.5}
              notesContent={
                <NotesLinkedInPost src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7338595986090430464?compact=1" />
              }
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
              layout="notes-only"
              notesContent={
                <NotesLinkedInPost src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7307781039693668352?compact=0" />
              }
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
        <div ref={secretRef} className="relative w-full flex justify-center">
          <motion.div
            style={{ x: secretX }}
            className="w-full flex justify-center"
          >
            <Secret />
          </motion.div>
          <motion.div
            style={{ x: handXValue, right: `${handRightOffset}vw` }}
            className="pointer-events-none absolute top-[92%] z-50 w-[105vw] max-w-[1500px] -translate-y-1/2 translate-y-[14vh] aspect-[3/1] relative overflow-hidden"
          >
            <motion.div
              className={`absolute inset-0 ${showClosedHand ? "hidden" : ""}`}
            >
              <Image
                src="/hand_open.png"
                alt="Reaching hand"
                width={5914}
                height={1952}
                className="h-full w-full object-contain object-left"
                priority
              />
            </motion.div>
            <motion.div
              className={`absolute inset-0 ${showClosedHand ? "" : "hidden"}`}
            >
              <Image
                src="/hand_close.png"
                alt="Closing hand"
                width={6024}
                height={2034}
                className="h-full w-full object-contain object-left"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
        <a
          href="https://devpost.com/"
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex items-center gap-3 rounded-full border-2 border-black bg-white px-8 py-4 font-mono text-sm uppercase tracking-[0.28em] text-black transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        >
          Too lazy to add more... here's 20 more projects on Devpost
          <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
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
