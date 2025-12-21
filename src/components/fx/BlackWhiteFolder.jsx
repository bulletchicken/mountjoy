"use client";

import { useEffect, useRef, useState } from "react";

export default function BlackWhiteFolder({
  label,
  children,
  paperRotation = "0deg",
  folderRotation = "0deg",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const updateOffset = (open = false) => {
    if (!wrapperRef.current) {
      return;
    }
    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2;
    const extraX = open ? rect.width / 2 : 0;
    setOffset({
      x: Math.round(targetX - centerX + extraX),
      y: Math.round(targetY - centerY),
    });
  };

  const handleOpen = () => {
    if (isOpen) {
      return;
    }
    updateOffset(true);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    updateOffset(true);
    const handleResize = () => updateOffset(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const positionClass = isOpen ? "relative z-50" : "relative cursor-pointer";

  const sizeClass = "h-[54vmin] min-h-[400px] w-[64vmin] max-w-[480px]";

  const stackRotation = paperRotation;
  const hoverLiftClass = !isOpen && isHovered ? "-translate-y-3" : "";
  const paperZClass = isOpen ? "z-30" : "z-0";

  const tabMarkup = (
    <div className="relative mb-5 h-50 w-15 rounded-r-[15px] border-t-[3px] border-r-[3px] border-b-[3px] border-black bg-white">
      <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl uppercase">
        <span className="[writing-mode:vertical-rl] scale-x-90">{label}</span>
      </div>
    </div>
  );

  const paperStack = (
    <div
      className={`absolute left-6 right-6 -top-14 h-[92%] transition-transform duration-300 ease-out ${paperZClass}`}
    >
      <div
        className="relative h-full"
        style={{ transform: `rotate(${stackRotation})` }}
      >
        <div
          className={`relative h-full transition-transform duration-200 ease-out ${hoverLiftClass}`}
        >
          <div className="absolute left-4 right-10 top-2 h-[98%] rotate-[-2deg] rounded-[10px] border-2 border-black bg-neutral-100"></div>
          <div className="absolute left-10 right-4 top-0 h-[98%] rotate-[1.5deg] rounded-[10px] border-2 border-black bg-white">
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
      ref={wrapperRef}
      className={`${positionClass} ${sizeClass} transition-transform duration-700 ease-in-out`}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      aria-label={`${label || "Case file"} folder`}
      style={{
        transform: isOpen
          ? `translate(${offset.x}px, ${offset.y}px)`
          : "translate(0px, 0px)",
        willChange: "transform",
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpen();
        }
      }}
    >
      <div className="relative h-full w-full">
        <div
          className="relative h-full w-full overflow-visible"
          style={{ transform: `rotate(${folderRotation})` }}
        >
          <div className="relative flex h-full items-end">
            <div className="relative h-full w-full overflow-visible">
              {isOpen ? (
                <div className="absolute -left-full top-0 h-full w-full rounded-tl-[16px] rounded-bl-[16px] border-[3px] border-r-0 border-black bg-white">
                  <div className="absolute bottom-8 left-8 right-8 border-t-2 border-black pt-3 font-mono text-xs uppercase tracking-[0.35em] text-black"></div>
                </div>
              ) : null}
              <div
                className={`relative h-full w-full border-[3px] border-black bg-white ${
                  isOpen
                    ? "z-10 rounded-tr-[16px] rounded-br-[16px] border-l-0"
                    : "z-20 rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px]"
                }`}
              >
                <div className="absolute bottom-8 left-8 right-8 border-t-2 border-black pt-3 font-mono text-xs uppercase tracking-[0.35em] text-black"></div>
              </div>
              {isOpen ? (
                <div className="absolute left-0 top-0 h-full w-[3px] bg-black"></div>
              ) : null}
              {paperStack}
              {isOpen ? (
                <button
                  type="button"
                  className="absolute right-4 top-4 z-40 flex h-8 w-8 items-center justify-center border-2 border-black bg-white font-mono text-xs uppercase"
                  aria-label="Close folder"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClose();
                  }}
                >
                  X
                </button>
              ) : null}
            </div>
            {tabMarkup}
          </div>
        </div>
      </div>
    </div>
  );
}
