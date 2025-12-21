"use client";

export default function Scene03Files() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f6f2ea]">
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#111_1px,transparent_1px)] [background-size:6px_6px]" />
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center px-6">
        <div className="w-full max-w-3xl rounded-2xl border-2 border-black bg-[#fcfaf6] p-8 shadow-[12px_14px_0_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-black">
              Case Files
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-black">
              Archive
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            {[
              "Subject_Overview.pdf",
              "Incident_Log_014.txt",
              "Witness_Statements.docx",
              "Evidence_Photos.zip",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-xl border border-black/60 bg-white px-5 py-4"
              >
                <div className="font-mono text-sm text-black">{item}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-black/70">
                  Locked
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right font-mono text-xs uppercase tracking-[0.25em] text-black/60">
            Access Restricted
          </div>
        </div>
      </div>
    </section>
  );
}
