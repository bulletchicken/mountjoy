"use client";

import BlackWhiteFolder from "@/components/fx/BlackWhiteFolder.jsx";

export default function Secret() {
  return (
    <div className="flex w-full justify-start self-start">
      <BlackWhiteFolder
        label="Secret"
        tabSide="right"
        folderRotation="-2deg"
        paperRotation="2deg"
        footerLines={["Classified dossier", "Redacted summary", ""]}
      />
    </div>
  );
}
