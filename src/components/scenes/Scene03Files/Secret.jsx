"use client";

import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";

export default function Secret() {
  return (
    <div className="flex w-full justify-center max-sm:-translate-x-10 max-sm:translate-y-6 lg:justify-end lg:pr-24 xl:pr-36">
      <div className="relative">
        <BlackWhiteFolder
          label="Secret"
          tabSide="right"
          folderRotation="-2deg"
          paperRotation="2deg"
          className="max-sm:w-[86vmin] max-sm:max-w-[700px]"
          paperSheetClassName="[--paper-sheet-height:82%] max-sm:top-[14%] sm:[--paper-sheet-height:98%]"
          footerLines={["six-seven", "six-seven", ""]}
          footerRedactions={[true, true, false]}
          interactive={false}
        />
        <img
          className="pointer-events-none absolute left-[24%] top-[22%] z-40 w-[38%] rotate-[-12deg] opacity-80"
          src="/secret_stamp.png"
          alt="Top Secret stamp"
        />
      </div>
    </div>
  );
}
