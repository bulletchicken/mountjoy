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
import { useEffect, useRef, useState } from "react";

function FolderReport({
  name,
  nameBottomLabel = "Name",
  nameBottomValue,
  age,
  ageLabel = "Age",
  ageContent,
  ageBottomLabel,
  ageBottomContent,
  bottomLeftLabel,
  bottomLeftContent,
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
              <span className="font-bold">Name:</span>
              <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                {name}
              </div>
            </div>
            <div className="p-1.5">
              {showAgeTop ? (
                ageLabel ? (
                  <>
                    <span className="font-bold">{ageLabel}:</span>
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
              <span className="font-bold">{nameBottomLabel}:</span>
              <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                {nameBottomValue ?? name}
              </div>
            </div>
            <div className="row-span-2 p-1.5 h-full">
              {showHeaderDetails ? (
                <>
                  <span className="font-bold">What it does:</span>
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    {notesSmall}
                  </div>
                  <div className="mt-2">
                    <span className="font-bold">Skills / abilities:</span>
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      {skills}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-bold">Base:</span>
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
                bottomLeftLabel ? (
                  <>
                    <span className="font-bold">{bottomLeftLabel}:</span>
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      {bottomLeftContent}
                    </div>
                  </>
                ) : ageBottomLabel ?? ageLabel ? (
                  <>
                    <span className="font-bold">
                      {ageBottomLabel ?? ageLabel}:
                    </span>
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      {ageBottomContent ?? ageContent ?? age}
                    </div>
                  </>
                ) : (
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    {ageBottomContent ?? ageContent ?? age}
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
              <span className="font-bold">Notes:</span>
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
  const cipherRef = useRef(null);
  const retreatStart = 0.6;
  const retreatPause = 0.1;
  const [isBaseScreen, setIsBaseScreen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMdOnly, setIsMdOnly] = useState(false);
  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setIsBaseScreen(width < 640);
      setIsSmallScreen(width < 768);
      setIsMdOnly(width >= 768 && width < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const isSmOnly = isSmallScreen && !isBaseScreen;
  const retreatDistance = isBaseScreen ? 260 : isSmOnly ? 260 : isMdOnly ? 320 : 90;
  const handRetreatDistance = retreatDistance;
  const handStartX = isBaseScreen ? 60 : isSmOnly ? 60 : isMdOnly ? 84 : 30;
  const handMidX = isBaseScreen ? -90 : isSmOnly ? -90 : isMdOnly ? -116 : -38;
  const handRightOffset = isBaseScreen ? -52 : isSmOnly ? -52 : isMdOnly ? -72 : -20;
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

  const selectCipher = () => {
    const node = cipherRef.current;
    if (!node || typeof window === "undefined") {
      return;
    }
    const selection = window.getSelection();
    if (!selection) {
      return;
    }
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.addRange(range);
  };

  return (
    <section
      className="relative z-0 flex w-full items-center justify-center bg-white pt-0 pb-40"
      style={{
        backgroundImage: "url(/cork_texture.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "800px 534px",
      }}
    >
      <div className="flex flex-col items-center gap-28 sm:gap-24 lg:gap-32 xl:gap-40">
        <div className="pointer-events-none relative flex w-full justify-center -mb-16 -mt-40 sm:-mb-16 sm:pb-8">
          <Image
            src="/evidence_files.png"
            alt="Evidence files"
            width={1411}
            height={1254}
            className="w-[80vw] -rotate-1 sm:w-[80vw] md:w-[65vw] lg:w-[50vw]"
            priority
          />
        </div>
        <FolderPair
          centerOffsetX={-400}
          folderProps={{
            label: "TED",
            folderRotation: "-2deg",
            paperRotation: "2deg",
            className: "w-[72vmin] max-w-[560px]",
            paperStackClassName: "top-[6%] h-[80%] sm:-top-12 sm:h-[110%]",
            paperSheetClassName:
              "[--paper-sheet-height:84%] sm:[--paper-sheet-height:98%] max-sm:left-8 max-sm:right-8",
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
              name="TED"
              ageLabel="Age"
              ageContent="1 year old"
              showAgeTop={true}
              bottomLeftLabel="Funded by"
              bottomLeftContent={
                <span className="relative mt-0.5 block h-8">
                  <Image
                    src="/techyon-logo.png"
                    alt="Techyon"
                    width={1000}
                    height={722}
                    className="absolute left-[38%] top-1 h-8 w-auto -translate-x-full -rotate-6"
                  />
                  <Image
                    src="/1517-logo.png"
                    alt="1517"
                    width={2154}
                    height={825}
                    className="absolute left-[62%] top-2 h-8 w-auto -translate-x-1/2 rotate-3"
                  />
                </span>
              }
              nameBottomLabel="Personality"
              nameBottomValue="Snarky, sassy, way too talkative"
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
              headerRightMedia={
                <div className="h-full w-full p-2 text-[0.6rem] normal-case tracking-[0.08em]">
                  <span className="block text-[0.58rem] uppercase tracking-[0.18em]">
                    Notes:
                  </span>
                  <span className="mt-1 block">
                    Ted is a AI robot who cares about your health (mental and
                    physical). Kinda like Baymax, or Ted... from Ted... the
                    movie... smth like that
                  </span>
                </div>
              }
              notesContent={
                <NotesLinkedInPost src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7338595986090430464?compact=1" />
              }
            />
          }
          media={
            <div className="rotate-2 translate-x-12 translate-y-6 sm:translate-x-0 sm:translate-y-0">
              <DitherShader
                src="/ted.avif"
                colorMode="grayscale"
                threshold={0.5}
                gridSize={1}
                objectFit="contain"
                className="h-[70vmin] w-[70vmin] sm:h-[54vmin] sm:w-[54vmin] md:h-[58vmin] md:w-[58vmin] lg:h-[60vmin] lg:w-[60vmin] xl:h-[62vmin] xl:w-[62vmin]"
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
            className: "w-[72vmin] max-w-[560px]",
            paperStackClassName: "top-[6%] h-[80%] sm:-top-12 sm:h-[110%]",
            paperSheetClassName:
              "[--paper-sheet-height:84%] sm:[--paper-sheet-height:98%] max-sm:left-8 max-sm:right-8",
            footerLines: ["Viral Waterloo's Hot or Not", "500 users"],
            coverOverlays: (
              <>
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
                <div className="pointer-events-none absolute left-[10%] top-[34%] w-[86%] -rotate-2">
                  <Image
                    src="/UWS_email.png"
                    alt="UWSummit email"
                    width={1643}
                    height={748}
                    className="block w-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </>
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
            <div className="pizza-wrap -translate-x-12 translate-y-8 sm:translate-x-0 sm:translate-y-0">
              <div className="pizza-spin">
                <DitherShader
                  src="/pizza.png"
                  colorMode="grayscale"
                  gridSize={1}
                  objectFit="contain"
                  className="h-[78vmin] w-[78vmin] sm:h-[64vmin] sm:w-[64vmin] md:h-[68vmin] md:w-[68vmin] lg:h-[70vmin] lg:w-[70vmin] xl:h-[74vmin] xl:w-[74vmin]"
                />
              </div>
            </div>
          }
        />
        <FolderPair
          centerOffsetX={-400}
          folderClosedClassName="translate-x-16"
          folderProps={{
            label: "A guitar",
            folderRotation: "-3deg",
            paperRotation: "1deg",
            className: "w-[72vmin] max-w-[560px]",
            paperStackClassName: "top-[6%] h-[80%] sm:-top-12 sm:h-[110%]",
            paperSheetClassName:
              "[--paper-sheet-height:84%] sm:[--paper-sheet-height:98%] max-sm:left-8 max-sm:right-8",
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
                    style={{ transform: "translate(-74%, 18%) rotate(-6deg)" }}
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
              <div className="border-b-2 border-black px-3 py-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-black">
                <div className="text-[0.62rem] font-semibold tracking-[0.22em]">
                  Story:
                </div>
                <div className="mt-2 normal-case tracking-[0.08em] leading-relaxed">
                  I had 2 weeks to build my guitar for a Onceler costume for
                  Halloween. Coming to the day, I didn&apos;t have enough
                  filament so I had to redesign the guitar to be some hollow
                  futuristic version which IMO looks even better.
                </div>
              </div>
              <div className="relative h-[80%] overflow-visible p-3 pt-5">
                <Image
                  src="/guitar_paint.jpg"
                  alt="Guitar paint"
                  width={3213}
                  height={5712}
                  className="absolute left-[4%] top-[2%] w-[58%] rotate-[-2deg] border-[8px] border-[#f5f5f5] bg-[#f5f5f5] object-cover drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                />
                <Image
                  src="/guitar_model.png"
                  alt="Guitar CAD detail"
                  width={1889}
                  height={1560}
                  className="absolute right-[3%] top-[4%] w-[42%] rotate-[5deg] border-[8px] border-[#f5f5f5] bg-[#f5f5f5] object-cover drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                />
                <Image
                  src="/guitar_final.jpg"
                  alt="Guitar final build"
                  width={3213}
                  height={5712}
                  className="absolute bottom-[2%] right-[2%] w-[34%] rotate-[1deg] border-[8px] border-[#f5f5f5] bg-[#f5f5f5] object-cover drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          }
          media={
            <div className="relative flex-shrink-0 h-[72vmin] w-[72vmin] translate-x-6 translate-y-6 sm:h-[60vmin] sm:w-[60vmin] sm:translate-x-0 sm:translate-y-0 md:h-[64vmin] md:w-[64vmin] lg:h-[68vmin] lg:w-[68vmin] xl:h-[72vmin] xl:w-[72vmin] overflow-visible">
              <div className="absolute inset-0 -translate-x-12 -translate-y-14 -rotate-26 flex items-center justify-center sm:-translate-x-20">
                <DitherShader
                  src="/guitar.png"
                  colorMode="grayscale"
                  threshold={0.25}
                  gridSize={1}
                  objectFit="contain"
                  className="h-[66vmin] w-[66vmin] sm:h-[60vmin] sm:w-[60vmin] md:h-[68vmin] md:w-[68vmin] lg:h-[74vmin] lg:w-[74vmin] xl:h-[82vmin] xl:w-[82vmin]"
                />
              </div>
            </div>
          }
        />
        <FolderPair
          reverse
          spineSide="right"
          centerOffsetX={460}
          folderBaseShiftClassName="-translate-x-4"
          folderProps={{
            label: "Goose Cart",
            tabSide: "left",
            folderRotation: "1deg",
            paperRotation: "-1deg",
            className: "w-[72vmin] max-w-[560px]",
            paperStackClassName: "top-[6%] h-[80%] sm:-top-12 sm:h-[110%]",
            paperSheetClassName:
              "[--paper-sheet-height:84%] sm:[--paper-sheet-height:98%] max-sm:left-8 max-sm:right-8",
            modalContent: (
              <iframe
                src="https://www.youtube.com/embed/kwYwyRSzLE8"
                title="FPV RC minecart short"
                className="h-[70vh] w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ),
            footerLines: [
              "FPV RC minecart w/ a loud annoying duck",
              "HTN Organizer Project",
            ],
            paperContent: (
              <>
                <div className="absolute top-[-3%] h-[98%] rounded-[10px] border-2 border-black bg-neutral-100 right-2 left-14 rotate-[3deg]" />
                <div className="absolute left-1/2 top-0 h-[82%] w-[82%] -translate-x-1/2 overflow-hidden rounded-[10px] border-2 border-black bg-black sm:top-0 sm:h-[94%] sm:w-[92%] pointer-events-none sm:pointer-events-none">
                  <iframe
                    src="https://www.youtube.com/embed/kwYwyRSzLE8"
                    title="FPV RC minecart short"
                    className="h-full w-full pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    style={{ filter: "saturate(0.5)" }}
                    allowFullScreen
                  />
                </div>
              </>
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
            <div className="rotate-1 translate-x-10 translate-y-6 sm:translate-x-0 sm:translate-y-0">
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
        <div
          ref={secretRef}
          className="relative w-full flex justify-center"
          onClick={selectCipher}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="w-full flex justify-center">
              <p
                ref={cipherRef}
                className="w-[min(50vw,360px)] translate-y-24 -translate-x-60 max-sm:w-[min(44vw,320px)] max-sm:-translate-x-20 max-sm:translate-y-16 select-text text-left text-[1.2rem] font-mono font-bold uppercase leading-[1.4] tracking-[0.45em] text-black/15 [text-shadow:0_1px_0_rgba(0,0,0,0.2)] max-sm:text-[0.75rem] sm:text-[1.05rem] sm:-translate-x-12 sm:translate-y-20 md:text-[1.45rem] md:translate-y-20 lg:-translate-x-64"
              >
                WINSU NBYA RWIZS GAFDH, RGGT EKNRHCYUBV. ECYOJZ QIWVA NOBPTLVV
                GLV YBZC1 QRZKWP. SB1 RFAW8 IECPAEU JCZVUE
              </p>
            </div>
          </div>
          <motion.div
            style={{ x: secretX }}
            className="w-full flex justify-center translate-x-8 sm:translate-x-0"
          >
            <Secret />
          </motion.div>
          <motion.div
            style={{
              x: handXValue,
              right: `${handRightOffset}vw`,
              willChange: "transform",
            }}
            className="pointer-events-none absolute top-[84%] z-50 w-[140vw] max-w-[1900px] -translate-y-1/2 translate-y-[6vh] aspect-[3/1] relative overflow-hidden sm:w-[140vw] sm:max-w-[1900px] sm:top-[84%] sm:translate-y-[6vh] md:w-[160vw] md:max-w-[2200px]"
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
          href="https://devpost.com/jeremysu64"
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-1"
          aria-label="More projects on Devpost"
        >
          <Image
            src="/ball_button.png"
            alt="More projects on Devpost"
            width={980}
            height={980}
            className="h-[240px] w-[240px] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:rotate-[-4deg] group-hover:scale-[1.06] group-hover:drop-shadow-[0_14px_24px_rgba(0,0,0,0.4)] sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px] lg:h-[360px] lg:w-[360px]"
          />
          <Image
            src="/click_it.png"
            alt=""
            width={526}
            height={323}
            className="pointer-events-none absolute bottom-0 right-0 h-[84px] w-auto translate-x-[42%] translate-y-[42%] object-contain sm:h-[92px] md:h-[104px] lg:h-[118px]"
          />
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
