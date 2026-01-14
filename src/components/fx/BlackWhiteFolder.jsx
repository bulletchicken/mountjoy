"use client";

import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BlackWhiteFolder = forwardRef(function BlackWhiteFolder(
  {
    label,
    children,
    footerLines = [],
    paperRotation = "0deg",
    paperOffsetX = 0,
    folderRotation = "0deg",
    tabSide = "right",
    hidePaperStack = false,
    isOpen: controlledOpen,
    interactive = true,
    className = "",
    onOpen,
    onClose,
    footerRedactions = [],
    coverStamps = [],
    coverOverlays = null,
    footerInlineStamps = [],
    footerOverlays = [],
    paperContent = null,
    paperStackClassName = "",
    paperSheetClassName = "",
    modalContent = null,
  },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isBaseScreen, setIsBaseScreen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const visualOpen = isOpen && !isSmallScreen;

  useEffect(() => {
    const update = () => {
      setIsSmallScreen(window.innerWidth < 768);
      setIsBaseScreen(window.innerWidth < 640);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

  const positionClass = interactive
    ? visualOpen
      ? "relative z-40 cursor-pointer"
      : "relative cursor-pointer"
    : "relative";

  const stackRotation = paperRotation;
  const hoverLiftClass = interactive && isHovered ? "-translate-y-3" : "";
  const hoverScaleClass =
    interactive && !visualOpen && isHovered ? "scale-[1.02]" : "";
  const hoverPaperTwist =
    interactive && !visualOpen && isHovered ? "rotate(2deg)" : "rotate(0deg)";
  const paperZClass = "z-20";
  const isFlipped = tabSide === "left";
  const paperStackPosition = isFlipped
    ? "absolute right-6 -left-10 -top-12 h-[110%] transition-transform duration-300 ease-out"
    : "absolute left-6 -right-10 -top-12 h-[110%] transition-transform duration-300 ease-out";
  const paperOnePosition = isFlipped ? "right-4 left-10" : "left-4 right-10";
  const paperTwoPosition = isFlipped ? "right-10 left-4" : "left-10 right-4";
  const paperOneRotation = isFlipped ? "rotate-[2deg]" : "rotate-[-2deg]";
  const paperTwoRotation = isFlipped ? "rotate-[-1.5deg]" : "rotate-[1.5deg]";
  const resolvedFooterLines = ["", ...footerLines.slice(-2)];
  while (resolvedFooterLines.length < 3) {
    resolvedFooterLines.push("");
  }

  const defaultReport = (
    <div className="h-full w-full border-2 border-black bg-white text-[0.58rem] uppercase tracking-[0.18em] text-black">
      <div className="grid h-full grid-rows-[auto_auto_auto_1fr_auto_auto]">
        <div className="grid grid-cols-2 border-b-2 border-black">
          <div className="border-r-2 border-black p-2">Name:</div>
          <div className="p-2">Age:</div>
        </div>
        <div className="grid grid-cols-2 border-b-2 border-black">
          <div className="border-r-2 border-black p-2">Birthplace:</div>
          <div className="p-2">Current residence:</div>
        </div>
        <div className="grid grid-cols-2 border-b-2 border-black">
          <div className="border-r-2 border-black p-2">Hair color:</div>
          <div className="p-2">Eye color:</div>
        </div>
        <div className="grid min-h-0 grid-cols-[0.38fr_0.62fr] border-b-2 border-black">
          <div className="grid grid-rows-[auto_auto_auto_1fr] border-r-2 border-black">
            <div className="grid grid-cols-2 gap-2 border-b-2 border-black p-2">
              <div className="h-16 w-full border-2 border-black" />
              <div className="h-16 w-full border-2 border-black" />
            </div>
            <div className="border-b-2 border-black p-2">Height:</div>
            <div className="border-b-2 border-black p-2">Weight:</div>
            <div className="p-2">What it does:</div>
          </div>
          <div className="grid grid-rows-[auto_1fr] p-2">
            <div className="mb-2 h-24 w-full border-2 border-black" />
            <div>Skills / abilities:</div>
          </div>
        </div>
        <div className="border-b-2 border-black p-2">Biography:</div>
        <div className="p-2">Notes:</div>
      </div>
    </div>
  );

  const footerLineMarkup = (
    <div className="absolute bottom-12 left-8 right-8 px-2 text-[0.85rem] font-mono font-bold tracking-[0.12em] text-black sm:left-10 sm:right-10 sm:px-3">
      <div className="relative">
        {resolvedFooterLines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className={`${index === 0 ? "" : "mt-3"} border-b-2 border-black pb-2`}
          >
            <span className="relative inline-block">
              {line}
              {footerRedactions[index] ? (
                <span className="pointer-events-none absolute inset-x-0 top-1/2 h-[0.45em] -translate-y-[35%] bg-black" />
              ) : null}
            </span>
            {footerInlineStamps[index]?.length ? (
              <span className="ml-2 inline-flex items-center gap-2 align-middle">
                {footerInlineStamps[index].map((stamp, stampIndex) => (
                  <img
                    key={`${stamp.src}-${stampIndex}`}
                    src={stamp.src}
                    alt={stamp.alt}
                    className={stamp.className || ""}
                  />
                ))}
              </span>
            ) : null}
          </div>
        ))}
        {footerOverlays?.length
          ? footerOverlays.map((overlay, index) => (
              <span key={`footer-overlay-${index}`}>{overlay}</span>
            ))
          : null}
      </div>
    </div>
  );

  const tabMarkup = (
    <div
      className={`relative mb-5 h-56 w-18 border-[3px] border-black bg-white ${
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
      <div className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-black uppercase">
        <span className="[writing-mode:vertical-rl] scale-x-90">{label}</span>
      </div>
    </div>
  );

  const reportVisibilityClass = isBaseScreen ? "opacity-0" : "";
  const paperStack = (
    <div className={`${paperStackPosition} ${paperZClass} ${paperStackClassName}`}>
      <div
        className="relative h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${paperOffsetX}px) rotate(${stackRotation}) ${hoverPaperTwist}`,
        }}
      >
        <div
          className={`relative h-full transition-transform duration-200 ease-out ${hoverLiftClass}`}
        >
          {paperContent ? (
            paperContent
          ) : (
            <>
              <div
                className={`absolute top-2 rounded-[10px] border-2 border-black bg-neutral-100 ${paperOnePosition} ${paperOneRotation} ${paperSheetClassName}`}
                style={{ height: "var(--paper-sheet-height, 98%)" }}
              ></div>
              <div
                className={`absolute top-0 rounded-[10px] border-2 border-black bg-white ${paperTwoPosition} ${paperTwoRotation} ${paperSheetClassName}`}
                style={{ height: "var(--paper-sheet-height, 98%)" }}
              >
                <div className={`report h-full w-full p-4 ${reportVisibilityClass}`}>
                  {children || defaultReport}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const coverStampsMarkup = coverStamps.map((stamp, index) => (
    <img
      key={`${stamp.src}-${index}`}
      src={stamp.src}
      alt={stamp.alt}
      className={`pointer-events-none absolute ${stamp.className || ""}`}
    />
  ));
  const coverOverlaysMarkup = coverOverlays
    ? Array.isArray(coverOverlays)
      ? coverOverlays
      : [coverOverlays]
    : [];

  const resolvedModalContent =
    modalContent ?? paperContent ?? children ?? defaultReport;
  const modalContentClass = (modalContent ?? paperContent)
    ? "h-[70vh] overflow-auto"
    : "h-[70vh] overflow-auto p-4 text-base sm:text-sm";

  const modalNode =
    isSmallScreen && isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-black/50 p-4"
            onClick={handleClose}
          >
            <div
              className="relative h-[70vh] w-[94vw] max-w-[640px] overflow-hidden rounded-[18px] border-2 border-black bg-white shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className={modalContentClass}>
                {resolvedModalContent}
              </div>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-6 py-3 text-base font-black uppercase tracking-[0.12em]"
              aria-label="Close"
              onClick={(event) => {
                event.stopPropagation();
                handleClose();
              }}
            >
              <span className="text-2xl leading-none">×</span>
              Close
            </button>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        ref={ref}
        className={`${positionClass} h-[54vmin] min-h-[380px] w-[66vmin] max-w-[520px] sm:h-[60vmin] sm:min-h-[440px] sm:w-[74vmin] sm:max-w-[580px] md:h-[64vmin] md:min-h-[480px] md:w-[78vmin] md:max-w-[610px] lg:h-[66vmin] lg:min-h-[500px] lg:w-[80vmin] lg:max-w-[620px] xl:h-[70vmin] xl:min-h-[520px] xl:w-[82vmin] xl:max-w-[640px] transition-transform duration-300 ease-out ${hoverScaleClass} ${className}`}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-expanded={interactive ? isOpen : undefined}
        aria-label={`${label || "Case file"} folder`}
        onPointerEnter={
          interactive ? () => setIsHovered(true) : undefined
        }
        onPointerLeave={
          interactive ? () => setIsHovered(false) : undefined
        }
        onClick={interactive ? handleToggle : undefined}
        onKeyDown={
          interactive
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleToggle();
                }
              }
            : undefined
        }
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
                {visualOpen ? (
                  <div
                    className={`absolute top-0 h-full w-full border-[3px] border-black bg-white ${
                      isFlipped
                        ? "left-full rounded-tr-[16px] rounded-br-[16px] border-l-0"
                        : "-left-full rounded-tl-[16px] rounded-bl-[16px] border-r-0"
                    }`}
                  >
                    {!visualOpen ? footerLineMarkup : null}
                  </div>
                ) : null}
                <div
                  data-folder-panel
                  className={`relative h-full w-full border-[3px] border-black bg-white ${
                    visualOpen
                      ? isFlipped
                        ? "z-10 rounded-tl-[16px] rounded-bl-[16px] border-r-0"
                      : "z-10 rounded-tr-[16px] rounded-br-[16px] border-l-0"
                    : "z-30 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px]"
                  }`}
                >
                  {!visualOpen ? footerLineMarkup : null}
                  {!visualOpen ? coverStampsMarkup : null}
                  {!visualOpen
                    ? coverOverlaysMarkup.map((overlay, index) => (
                        <span key={`cover-overlay-${index}`}>{overlay}</span>
                      ))
                    : null}
                </div>
                {visualOpen ? (
                  <div
                    className={`absolute top-0 h-full w-[3px] bg-black ${
                      isFlipped ? "right-0" : "left-0"
                    }`}
                  ></div>
                ) : null}
                {hidePaperStack ? null : paperStack}
                {visualOpen ? null : null}
              </div>
              {tabMarkup}
            </div>
          </div>
        </div>
      </div>
      {modalNode}
    </>
  );
});

BlackWhiteFolder.displayName = "BlackWhiteFolder";

export default BlackWhiteFolder;
