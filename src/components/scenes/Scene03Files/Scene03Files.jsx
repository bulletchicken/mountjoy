"use client";

import FolderPair from "@/components/scenes/Scene03Files/FolderPair";
import { DitherShader } from "@/components/ui/dither-shader";
import Secret from "@/components/scenes/Scene03Files/Secret";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

function FolderReport({
  name,
  age,
  ageLabel = "Age",
  ageContent,
  showAgeTop = true,
  showAgeBottom = true,
  birthplace,
  residence,
  notesSmall,
  skills,
  notesContent,
  layout = "default",
  notesVariant = "default",
  showHeaderDetails = true,
  headerRightMedia,
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
      <div className="grid h-full grid-rows-[220px_1fr]">
        <div className="flex h-[220px] flex-col border-b-2 border-black">
          <div className="grid grid-cols-2 border-b-2 border-black">
            <div className="border-r-2 border-black p-1.5">
              Name:
              <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                {name}
              </div>
            </div>
            <div className="p-1.5">
              {showAgeTop ? (
                ageLabel ? (
                  <>
                    {ageLabel}:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      {ageContent ?? age}
                    </div>
                  </>
                ) : (
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    {ageContent ?? age}
                  </div>
                )
              ) : null}
            </div>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-[0.4fr_0.6fr] grid-rows-2">
            <div className="border-b-2 border-r-2 border-black p-1.5 h-full">
              Name:
              <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                {name}
              </div>
            </div>
            <div className="row-span-2 p-1.5 h-full">
              {showHeaderDetails ? (
                <>
                  What it does:
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    {notesSmall}
                  </div>
                  <div className="mt-2">
                    Skills / abilities:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      {skills}
                    </div>
                  </div>
                  <div className="mt-2">
                    Base:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      {birthplace} · {residence}
                    </div>
                  </div>
                </>
              ) : null}
              {headerRightMedia ? (
                <div
                  className={`w-full relative overflow-hidden ${
                    showHeaderDetails
                      ? "mt-2 h-20 border-2 border-black"
                      : "h-full overflow-visible"
                  }`}
                >
                  {headerRightMedia}
                </div>
              ) : null}
            </div>
            <div className="border-r-2 border-black p-1.5 h-full">
              {showAgeBottom ? (
                ageLabel ? (
                  <>
                    {ageLabel}:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      {ageContent ?? age}
                    </div>
                  </>
                ) : (
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    {ageContent ?? age}
                  </div>
                )
              ) : null}
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
  const retreatPause = 0.1;
  const retreatDistance = 90;
  const handRetreatDistance = retreatDistance;
  const handStartX = 30;
  const handMidX = -38;
  const handRightOffset = -20;
  const { scrollYProgress: secretScrollY } = useScroll({
    target: secretRef,
    offset: ["start 100%", "center start"],
  });
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
  const handClosedOpacity = useTransform(secretScrollY, (value) =>
    value >= retreatStart + retreatPause ? 1 : 0,
  );
  const handOpenOpacity = useTransform(secretScrollY, (value) =>
    value >= retreatStart + retreatPause ? 0 : 1,
  );

  return (
    <section
      className="relative z-0 flex w-full items-center justify-center bg-white pt-0 pb-40"
      style={{
        backgroundImage: "url(/cork_texture.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 534px",
      }}
    >
      <div className="flex flex-col items-center gap-16 pt-12 sm:gap-24 lg:gap-32 xl:gap-40">
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
            coverOverlays: (
              <>
                <div className="pointer-events-none absolute left-[14%] top-[-2%] z-10 w-[34%] rotate-5">
                  <div className="relative">
                    <Image
                      src="/ted_polaroid.png"
                      alt="TED polaroid"
                      width={1179}
                      height={1769}
                      className="block w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                    />
                    <div className="absolute -top-2 left-16 h-6 w-4 -rotate-12 rounded-[4px] border-2 border-black bg-neutral-200" />
                  </div>
                </div>
                <div className="pointer-events-none absolute right-[8%] top-[14%] w-[52%] -rotate-3">
                  <Image
                    src="/ted_model.png"
                    alt="TED model"
                    width={1564}
                    height={1562}
                    className="block w-full rounded-[6px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </>
            ),
          }}
          folderContent={
            <FolderReport
              name="AI Teddy Bear"
              age="Prototype"
              ageLabel="Funded by"
              ageContent={
                <span className="relative mt-1 block h-8">
                  <Image
                    src="/techyon-logo.png"
                    alt="Techyon"
                    width={1000}
                    height={722}
                    className="absolute left-[40%] top-2 h-8 w-auto -translate-x-full -rotate-6"
                  />
                  <Image
                    src="/1517-logo.png"
                    alt="1517"
                    width={2154}
                    height={825}
                    className="absolute left-[60%] top-4 h-8 w-auto -translate-x-1/2 rotate-3"
                  />
                </span>
              }
              showAgeTop={false}
              birthplace="Waterloo"
              residence="Care homes"
              hair="Plush"
              eye="LED glow"
              height="24 in"
              weight="3 lb"
              notesSmall="Grandma-safe"
              skills="Check-ins · med reminders"
              showHeaderDetails={false}
              notesVariant="full"
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
              "Viral Waterloo's Hot or Not",
              "500 users",
            ],
            coverOverlays: (
              <div className="pointer-events-none absolute left-[8%] top-[0%] w-[84%] rotate-1">
                <div className="relative">
                  <Image
                    src="/UWS_photo.png"
                    alt="UWSummit landing"
                    width={3024}
                    height={1456}
                    className="block w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                  />
                  <div className="absolute -top-2 left-10 h-6 w-4 -rotate-12 rounded-[4px] border-2 border-black bg-neutral-200" />
                  <div className="absolute -top-2 right-10 h-6 w-4 rotate-12 rounded-[4px] border-2 border-black bg-neutral-200" />
                </div>
              </div>
            ),
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
            label: "A guitar",
            folderRotation: "-3deg",
            paperRotation: "1deg",
            footerLines: ["Flying-v Guitar", "Short description", "TBD"],
            coverOverlays: (
              <div className="pointer-events-none absolute right-[14%] top-[-4%] w-[32%] rotate-6">
                <div className="relative">
                  <Image
                    src="/guitar_ref.png"
                    alt="Guitar reference"
                    width={1740}
                    height={1043}
                    className="absolute left-1/2 top-[14%] w-[260%] max-w-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                    style={{ transform: "translate(-74%, 10%) rotate(-6deg)" }}
                  />
                  <div className="relative translate-y-3">
                    <Image
                      src="/polaroid_costume_guitar.png"
                      alt="Guitar costume"
                      width={2688}
                      height={4032}
                      className="block w-full rounded-[6px] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                    />
                    <div className="absolute -top-2 left-4 h-6 w-4 -rotate-12 rounded-[4px] border-2 border-black bg-neutral-200" />
                  </div>
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
              <div className="relative h-[80%] overflow-visible p-3 pt-5">
                <Image
                  src="/guitar_paint.jpg"
                  alt="Guitar paint"
                  width={3213}
                  height={5712}
                  className="absolute left-[4%] top-[2%] w-[58%] rotate-[-2deg] border-[8px] border-[#fdfbf6] bg-[#fdfbf6] object-cover drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                />
                <Image
                  src="/guitar_model.png"
                  alt="Guitar CAD detail"
                  width={1889}
                  height={1560}
                  className="absolute right-[3%] top-[4%] w-[42%] rotate-[5deg] border-[8px] border-[#fdfbf6] bg-[#fdfbf6] object-cover drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                />
                <Image
                  src="/guitar_final.jpg"
                  alt="Guitar final build"
                  width={3213}
                  height={5712}
                  className="absolute bottom-[2%] right-[2%] w-[34%] rotate-[1deg] border-[8px] border-[#fdfbf6] bg-[#fdfbf6] object-cover drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
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
            label: "Goose Cart",
            tabSide: "left",
            folderRotation: "1deg",
            paperRotation: "-1deg",
            footerLines: [
              "FPV RC minecart w/ a loud annoying duck",
              "HTN Organizer Project",
            ],
            paperContent: (
              <div className="absolute left-1/2 top-0 h-[94%] w-[92%] -translate-x-1/2 overflow-hidden rounded-[10px] border-2 border-black bg-black">
                <iframe
                  src="https://www.youtube.com/embed/kwYwyRSzLE8"
                  title="FPV RC minecart short"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  style={{ filter: "saturate(0.5)" }}
                  allowFullScreen
                />
              </div>
            ),
            coverOverlays: (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <Image
                  src="/duck_feet.png"
                  alt="Duck footprints"
                  fill
                  className="object-cover -translate-y-30"
                />
              </div>
            ),
          }}
          folderContent={null}
          media={
            <div className="rotate-1">
              <DitherShader
                src="/fpv_goose.png"
                colorMode="grayscale"
                threshold={0.1}
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
            style={{
              x: handXValue,
              right: `${handRightOffset}vw`,
              willChange: "transform",
            }}
            className="pointer-events-none absolute top-[92%] z-50 w-[105vw] max-w-[1500px] -translate-y-1/2 translate-y-[14vh] aspect-[3/1] relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0"
              style={{ opacity: handOpenOpacity, willChange: "opacity" }}
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
              className="absolute inset-0"
              style={{ opacity: handClosedOpacity, willChange: "opacity" }}
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
