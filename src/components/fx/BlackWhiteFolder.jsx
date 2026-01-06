"use client";

import { forwardRef, useState } from "react";

const BlackWhiteFolder = forwardRef(function BlackWhiteFolder(
  {
    label,
    children,
    footerLines = [],
    paperRotation = "0deg",
    paperOffsetX = 0,
    folderRotation = "0deg",
    tabSide = "right",
    isOpen: controlledOpen,
    onOpen,
    onClose,
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const handleOpen = () => {
    if (isOpen) {
      return;
    }
    onOpen?.();
    if (controlledOpen === undefined) {
      setInternalOpen(true);
    }
  };

  const handleClose = () => {
    onClose?.();
    if (controlledOpen === undefined) {
      setInternalOpen(false);
    }
  };
  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  const positionClass = isOpen
    ? "relative z-40 cursor-pointer"
    : "relative cursor-pointer";

  const stackRotation = paperRotation;
  const hoverLiftClass = isHovered ? "-translate-y-3" : "";
  const hoverScaleClass = !isOpen && isHovered ? "scale-[1.02]" : "";
  const hoverPaperTwist = !isOpen && isHovered ? "rotate(2deg)" : "rotate(0deg)";
  const paperZClass = "z-20";
  const isFlipped = tabSide === "left";
  const paperStackPosition = isFlipped
    ? "absolute right-6 -left-10 -top-12 h-[110%] transition-transform duration-300 ease-out"
    : "absolute left-6 -right-10 -top-12 h-[110%] transition-transform duration-300 ease-out";
  const paperOnePosition = isFlipped ? "right-4 left-10" : "left-4 right-10";
  const paperTwoPosition = isFlipped ? "right-10 left-4" : "left-10 right-4";
  const paperOneRotation = isFlipped ? "rotate-[2deg]" : "rotate-[-2deg]";
  const paperTwoRotation = isFlipped ? "rotate-[-1.5deg]" : "rotate-[1.5deg]";
  const resolvedFooterLines = footerLines.slice(0, 3);
  while (resolvedFooterLines.length < 3) {
    resolvedFooterLines.push("");
  }

  const footerLineMarkup = (
    <div
      className="absolute bottom-8 left-8 right-8 text-[0.85rem] tracking-[0.12em] text-black"
      style={{
        fontFamily:
          '"Chalkboard", "Chalkboard SE", "Marker Felt", "Noteworthy", "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive',
      }}
    >
      {resolvedFooterLines.map((line, index) => (
        <div
          key={`${line}-${index}`}
          className={`${index === 0 ? "" : "mt-3"} border-b-2 border-black pb-2`}
        >
          {line}
        </div>
      ))}
    </div>
  );

  const tabMarkup = (
    <div
      className={`relative mb-5 h-50 w-15 border-[3px] border-black bg-white ${
        isFlipped
          ? "rounded-l-[15px] border-r-0"
          : "rounded-r-[15px] border-l-0"
      } ${
        isOpen
          ? isFlipped
            ? "-mr-[2px] border-r-[2px] border-r-white z-10"
            : "-ml-[2px] border-l-[2px] border-l-white z-10"
          : "z-10"
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-bold uppercase">
        <span className="[writing-mode:vertical-rl] scale-x-90">{label}</span>
      </div>
    </div>
  );

  const paperStack = (
    <div className={`${paperStackPosition} ${paperZClass}`}>
      <div
        className="relative h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${paperOffsetX}px) rotate(${stackRotation}) ${hoverPaperTwist}`,
        }}
      >
        <div
          className={`relative h-full transition-transform duration-200 ease-out ${hoverLiftClass}`}
        >
          <div
            className={`absolute top-2 h-[98%] rounded-[10px] border-2 border-black bg-neutral-100 ${paperOnePosition} ${paperOneRotation}`}
          ></div>
          <div
            className={`absolute top-0 h-[98%] rounded-[10px] border-2 border-black bg-white ${paperTwoPosition} ${paperTwoRotation}`}
          >
            {isOpen ? (
              <div className="report h-full w-full p-4">{children}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`${positionClass} h-[58vmin] min-h-[420px] w-[72vmin] max-w-[560px] sm:h-[60vmin] sm:min-h-[440px] sm:w-[74vmin] sm:max-w-[580px] md:h-[64vmin] md:min-h-[480px] md:w-[78vmin] md:max-w-[610px] lg:h-[66vmin] lg:min-h-[500px] lg:w-[80vmin] lg:max-w-[620px] xl:h-[70vmin] xl:min-h-[520px] xl:w-[82vmin] xl:max-w-[640px] transition-transform duration-300 ease-out ${hoverScaleClass}`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${label || "Case file"} folder`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={handleToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleToggle();
        }
      }}
    >
      <div className="relative h-full w-full">
        <div
          className="relative h-full w-full overflow-visible"
          style={{ transform: `rotate(${folderRotation})` }}
        >
          <div
            className={`relative flex h-full items-end ${
              isFlipped ? "flex-row-reverse" : ""
            }`}
          >
            <div className="relative h-full w-full overflow-visible">
              {isOpen ? (
                <div
                  className={`absolute top-0 h-full w-full border-[3px] border-black bg-white ${
                    isFlipped
                      ? "left-full rounded-tr-[16px] rounded-br-[16px] border-l-0"
                      : "-left-full rounded-tl-[16px] rounded-bl-[16px] border-r-0"
                  }`}
                >
                  {!isOpen ? footerLineMarkup : null}
                </div>
              ) : null}
              <div
                data-folder-panel
                className={`relative h-full w-full border-[3px] border-black bg-white ${
                  isOpen
                    ? isFlipped
                      ? "z-10 rounded-tl-[16px] rounded-bl-[16px] border-r-0"
                    : "z-10 rounded-tr-[16px] rounded-br-[16px] border-l-0"
                  : "z-30 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px]"
                }`}
              >
                {!isOpen ? footerLineMarkup : null}
              </div>
              {isOpen ? (
                <div
                  className={`absolute top-0 h-full w-[3px] bg-black ${
                    isFlipped ? "right-0" : "left-0"
                  }`}
                ></div>
              ) : null}
              {paperStack}
              {isOpen ? null : null}
            </div>
            {tabMarkup}
          </div>
        </div>
      </div>
    </div>
  );
});

BlackWhiteFolder.displayName = "BlackWhiteFolder";

export default BlackWhiteFolder;
