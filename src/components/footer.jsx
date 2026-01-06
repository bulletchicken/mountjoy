"use client";

export default function Footer() {
  return (
    <footer className="w-full py-20 text-center font-mono text-xs uppercase tracking-[0.3em] text-black">
      <div className="flex items-center justify-center gap-4">
        <span>Designed and executed by Jeremy Su</span>
        <a
          href="https://www.linkedin.com/in/jeremy-su/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
          className="transition-opacity hover:opacity-70"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
          >
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0.5 23.5h4V7.98h-4V23.5zM8.5 7.98h3.8v2.1h.05c.53-1 1.82-2.06 3.74-2.06 4 0 4.74 2.63 4.74 6.05v9.43h-4v-8.36c0-2 0-4.58-2.79-4.58-2.79 0-3.22 2.18-3.22 4.44v8.5h-4V7.98z" />
          </svg>
        </a>
        <a
          href="https://devpost.com/jeremysu64"
          aria-label="Devpost"
          target="_blank"
          rel="noreferrer"
          className="transition-opacity hover:opacity-70"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
          >
            <path d="M3.2 4.5h7.3c3.8 0 6.7 2.7 6.7 7 0 4.4-2.9 7-6.7 7H3.2V4.5zm3.2 2.8v8.4h3.9c2.3 0 3.7-1.5 3.7-4.2 0-2.6-1.4-4.2-3.7-4.2H6.4zM18.4 4.5h2.4v13.9h-2.4V4.5z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
