"use client";

export default function BlackWhiteFolder({ label }) {
  return (
    <div className="relative w-[64vmin] max-w-[480px]">
      <div className="relative flex items-end">
        <div className="relative h-[54vmin] min-h-[400px] w-full rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[16px] rounded-br-[16px] border-[3px] border-black bg-white">
          <div className="absolute bottom-8 left-8 right-8 border-t-2 border-black pt-3 font-mono text-xs uppercase tracking-[0.35em] text-black"></div>
        </div>
        <div className="relative mb-5 h-50 w-15 rounded-r-[15px] border-t-[3px] border-r-[3px] border-b-[3px] border-black bg-white">
          <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl uppercase">
            <span className="[writing-mode:vertical-rl] scale-x-90">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
