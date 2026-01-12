"use client";

import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";

export default function Secret() {
  return (
    <div className="flex w-full justify-center lg:justify-end lg:pr-24 xl:pr-36">
      <div className="relative">
        <BlackWhiteFolder
          label="Secret"
          tabSide="right"
          folderRotation="-2deg"
          paperRotation="2deg"
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
