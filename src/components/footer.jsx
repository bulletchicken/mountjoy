"use client";

import { Linkedin, Github, Mail, CodeXml } from "lucide-react";

export default function Footer() {
  const links = [
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/jeremy-su/",
      icon: Linkedin,
    },
    {
      name: "github",
      href: "https://github.com/bulletchicken",
      icon: Github,
    },
    {
      name: "email",
      href: "mailto:nwjeremysu@gmail.com",
      icon: Mail,
    },
    {
      name: "repo",
      href: "https://github.com/bulletchicken/mountjoy",
      icon: CodeXml,
    },
  ];

  return (
    <footer className="w-full pt-20 pb-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-black">
      <div className="flex flex-col items-center justify-center gap-10">
        <span>Designed and executed by Jeremy Su</span>
        <div className="flex items-center gap-6">
          {links.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              aria-label={name}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
