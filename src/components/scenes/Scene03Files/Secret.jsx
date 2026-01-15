"use client";

import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";

export default function Secret() {
  return (
    <div className="flex w-full justify-center max-sm:-translate-x-10 max-sm:translate-y-6 md:translate-x-28 lg:translate-x-0 lg:justify-end lg:pr-24 xl:pr-36">
      <div className="relative">
        <BlackWhiteFolder
          label="Secret"
          tabSide="right"
          folderRotation="-2deg"
          paperRotation="2deg"
          className="max-sm:w-[86vmin] max-sm:max-w-[700px]"
          paperSheetClassName="[--paper-sheet-height:82%] max-sm:top-[14%] sm:[--paper-sheet-height:98%]"
          footerLines={["six-seven", "six-seven", "vKELKP2"]}
          footerRedactions={[true, true, true]}
          interactive={false}
        >
          <div className="h-full w-full border-2 border-black bg-white text-[0.58rem] uppercase tracking-[0.18em] text-black">
            <div className="grid h-full grid-rows-[auto_auto_auto_1fr_auto_auto]">
              <div className="grid grid-cols-2 border-b-2 border-black">
                <div className="border-r-2 border-black p-2">
                  Name:
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    Subject 067
                  </div>
                </div>
                <div className="p-2">
                  Age:
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    Unknown
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b-2 border-black">
                <div className="border-r-2 border-black p-2">
                  Birthplace:
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    South loop alley
                  </div>
                </div>
                <div className="p-2">
                  Current residence:
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    Storage 12B
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b-2 border-black">
                <div className="border-r-2 border-black p-2">
                  Hair color:
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    Black
                  </div>
                </div>
                <div className="p-2">
                  Eye color:
                  <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                    Hazel
                  </div>
                </div>
              </div>
              <div className="grid min-h-0 grid-cols-[0.38fr_0.62fr] border-b-2 border-black">
                <div className="grid grid-rows-[auto_auto_auto_1fr] border-r-2 border-black">
                  <div className="grid grid-cols-2 gap-2 border-b-2 border-black p-2">
                    <div className="h-16 w-full border-2 border-black" />
                    <div className="h-16 w-full border-2 border-black" />
                  </div>
                  <div className="border-b-2 border-black p-2">
                    Height:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      5'10"
                    </div>
                  </div>
                  <div className="border-b-2 border-black p-2">
                    Weight:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      170 lb
                    </div>
                  </div>
                  <div className="p-2">
                    What it does:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      Archives anomalous files
                    </div>
                  </div>
                </div>
                <div className="grid grid-rows-[auto_1fr] p-2">
                  <div className="mb-2 h-24 w-full border-2 border-black" />
                  <div>
                    Skills / abilities:
                    <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                      Memory recall · encryption · pattern tracing
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-b-2 border-black p-2">
                Biography:
                <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                  Lived under multiple aliases. Operates in plain sight. Avoid
                  direct contact.
                </div>
              </div>
              <div className="p-2">
                URLs:
                <div className="mt-0.5 text-[0.6rem] normal-case tracking-[0.08em]">
                  Confidential files: https://drive.google.com/drive/folders/.....XCOU.......
                </div>
              </div>
            </div>
          </div>
        </BlackWhiteFolder>
        <img
          className="pointer-events-none absolute left-[24%] top-[22%] z-40 w-[38%] rotate-[-12deg] opacity-80"
          src="/secret_stamp.png"
          alt="Top Secret stamp"
        />
      </div>
    </div>
  );
}
