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
    <div className="h-full w-full border-2 border-black bg-white font-mono text-[0.58rem] uppercase tracking-[0.18em] text-black">
      <div
        className="grid h-full"
        style={{
          gridTemplateRows: `${1 - notesRowWeight}fr ${notesRowWeight}fr`,
        }}
      >
        <div className="flex flex-col border-b-2 border-black">
          <div className="grid grid-cols-2 border-b-2 border-black">
            <div className="border-r-2 border-black p-2">
              Name:
              <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
                {name}
              </div>
            </div>
            <div className="p-2">
              Age:
              <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
                {age}
              </div>
            </div>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[0.4fr_0.6fr] grid-rows-2">
            <div className="border-b-2 border-r-2 border-black p-2 h-full">
              Name:
              <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
                {name}
              </div>
            </div>
            <div className="row-span-2 p-2 h-full">
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
            <div className="border-r-2 border-black p-2 h-full">
              Age:
              <div className="mt-1 text-[0.6rem] normal-case tracking-[0.08em]">
                {age}
              </div>
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

function NotesLinkedInPost({ src, isInteractive = true, saturation = 1 }) {
  return (
    <div className="absolute inset-0 h-full w-full">
      <iframe
        src={src}
        title="Embedded LinkedIn post"
        className={`h-full w-full ${
          isInteractive ? "" : "pointer-events-none"
        }`}
        style={{ filter: `saturate(${saturation})` }}
        allow="fullscreen; clipboard-write; camera; microphone"
        allowFullScreen
      />
      {!isInteractive ? (
        <div
          className="absolute inset-0 pointer-events-auto"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

export default function Scene03Files() {
  const secretRef = useRef(null);
  const retreatStart = 0.6;
  const retreatPause = 0.05;
  const retreatDistance = 90;
  const handRetreatDistance = retreatDistance;
  const handStartX = 30;
  const handMidX = -38;
  const handRightOffset = -20;
  const { scrollYProgress: secretScrollY } = useScroll({
    target: secretRef,
    offset: ["start 100%", "center start"],
  });
  const [showClosedHand, setShowClosedHand] = useState(false);
  const handX = useTransform(
    secretScrollY,
    [0, retreatStart, retreatStart + retreatPause, 1],
    [handStartX, handMidX, handMidX, handMidX + handRetreatDistance],
  );
  const handXValue = useMotionTemplate`${handX}vw`;
  const retreatX = useTransform(
    secretScrollY,
    [retreatStart + retreatPause, 1],
    [0, retreatDistance],
  );
  const secretX = useMotionTemplate`${retreatX}vw`;
  useMotionValueEvent(secretScrollY, "change", (value) => {
    setShowClosedHand(value >= retreatStart + retreatPause);
  });

  return (
    <section
      className="relative z-[200] isolate flex w-full items-center justify-center bg-white pt-0 pb-40"
      style={{
        backgroundImage: "url(/cork_texture.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 534px",
      }}
    >
      <div className="flex flex-col items-center gap-24 sm:gap-36 lg:gap-48 xl:gap-60">
        <div className="pointer-events-none relative flex w-full justify-center -mb-[12.5rem] -mt-[7.5rem]">
          <Image
            src="/evidence_files.png"
            alt="Evidence files"
            width={1411}
            height={1254}
            className="w-[64vw] max-w-[780px] -rotate-1"
            priority
          />
        </div>
        <FolderPair
          centerOffsetX={-400}
          folderProps={{
            label: "TED",
            folderRotation: "-2deg",
            paperRotation: "2deg",
            footerLines: [
              "AI teddy bear for sweet grandmas",
              "Healthcare companion teddy bear",
              "Funded by:",
            ],
            footerOverlays: [
              <a
                key="techyon-footer"
                href="https://techyon.org/"
                target="_blank"
                rel="noreferrer"
                className="absolute left-[23%] bottom-[-6%] w-[16%] -rotate-6 opacity-85"
              >
                <Image
                  src="/techyon-logo.png"
                  alt="Techyon"
                  width={1000}
                  height={722}
                  className="block w-full"
                />
              </a>,
              <a
                key="1517-footer"
                href="https://www.1517fund.com/"
                target="_blank"
                rel="noreferrer"
                className="absolute left-[40%] bottom-[3%] w-[20%] rotate-4 opacity-85"
              >
                <Image
                  src="/1517-logo.png"
                  alt="1517"
                  width={2154}
                  height={825}
                  className="block w-full"
                />
              </a>,
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
          folderContent={({ isOpen }) => (
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
                <NotesLinkedInPost
                  src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7307781039693668352?compact=0"
                  isInteractive={isOpen}
                  saturation={0.35}
                />
              }
            />
          )}
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
        <FolderPair
          centerOffsetX={-280}
          folderClosedClassName="translate-x-16"
          folderProps={{
            label: "Flying-v Guitar",
            folderRotation: "-3deg",
            paperRotation: "1deg",
            footerLines: ["Flying-v Guitar", "Short description", "TBD"],
            coverOverlays: (
              <div className="pointer-events-none absolute right-[10%] top-[0%] w-[32%] rotate-6">
                <div className="relative">
                  <Image
                    src="/costume_guitar.jpg"
                    alt="Guitar costume"
                    width={3213}
                    height={4947}
                    className="block w-full rounded-[6px] border-2 border-black bg-white"
                  />
                  <div className="absolute -top-2 left-4 h-6 w-4 -rotate-12 rounded-[4px] border-2 border-black bg-neutral-200" />
                </div>
              </div>
            ),
          }}
          folderContent={
            <div className="h-full w-full border-2 border-black bg-white">
              <div className="flex h-[16%] items-center justify-between border-b-2 border-black px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em]">
                <span>Flying-V Guitar</span>
                <span>Build log</span>
              </div>
              <div className="relative h-[80%] overflow-hidden p-3 pt-5">
                <Image
                  src="/guitar_paint.jpg"
                  alt="Guitar paint"
                  width={3213}
                  height={5712}
                  className="absolute left-[4%] top-[2%] w-[58%] rotate-[-2deg] border-2 border-black bg-white object-cover"
                />
                <Image
                  src="/guitar_model.png"
                  alt="Guitar CAD detail"
                  width={1889}
                  height={1560}
                  className="absolute right-[6%] top-[6%] w-[34%] rotate-[5deg] border-2 border-black bg-white object-cover"
                />
                <Image
                  src="/guitar_final.jpg"
                  alt="Guitar final build"
                  width={3213}
                  height={5712}
                  className="absolute bottom-[2%] right-[2%] w-[34%] rotate-[1deg] border-2 border-black bg-white object-cover"
                />
              </div>
            </div>
          }
          media={
            <div className="relative flex-shrink-0 h-[56vmin] w-[56vmin] sm:h-[60vmin] sm:w-[60vmin] md:h-[64vmin] md:w-[64vmin] lg:h-[68vmin] lg:w-[68vmin] xl:h-[72vmin] xl:w-[72vmin] overflow-visible">
              <div className="absolute inset-0 -translate-x-20 -translate-y-14 -rotate-26 flex items-center justify-center">
                <DitherShader
                  src="/guitar.png"
                  colorMode="grayscale"
                  threshold={0.25}
                  gridSize={1}
                  objectFit="contain"
                  className="h-[52vmin] w-[52vmin] sm:h-[60vmin] sm:w-[60vmin] md:h-[68vmin] md:w-[68vmin] lg:h-[74vmin] lg:w-[74vmin] xl:h-[82vmin] xl:w-[82vmin]"
                />
              </div>
            </div>
          }
        />
        <FolderPair
          reverse
          spineSide="right"
          centerOffsetX={360}
          folderProps={{
            label: "Placeholder",
            tabSide: "left",
            folderRotation: "1deg",
            paperRotation: "-1deg",
            footerLines: ["Placeholder project", "Short description", "TBD"],
          }}
          folderContent={
            <FolderReport
              name="Placeholder Name"
              age="Prototype"
              birthplace="Somewhere"
              residence="Everywhere"
              notesSmall="Placeholder summary"
              skills="Skill C · Skill D"
              notesContent={
                <div className="absolute inset-0 flex items-center justify-center text-[0.65rem] tracking-[0.12em]">
                  Placeholder notes
                </div>
              }
            />
          }
          media={
            <div className="rotate-1">
              <DitherShader
                src="/fpv_car.png"
                colorMode="grayscale"
                threshold={0.5}
                gridSize={1}
                objectFit="contain"
                className="h-[60vmin] w-[60vmin] sm:h-[66vmin] sm:w-[66vmin] md:h-[70vmin] md:w-[70vmin] lg:h-[74vmin] lg:w-[74vmin] xl:h-[78vmin] xl:w-[78vmin]"
              />
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
