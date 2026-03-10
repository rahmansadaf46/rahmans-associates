"use client";

import { useEffect, useRef, useState } from "react";

type HeroSignalLineProps = {
  label: string;
  lines: string[];
};

const SCRAMBLE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_(){}[]<>/:-.=+";
const LINE_HOLD_MS = 2600;
const FRAME_MS = 36;

function scrambleLine(target: string, revealCount: number) {
  return target
    .split("")
    .map((character, index) => {
      if (character === " ") {
        return " ";
      }

      if (index < revealCount) {
        return target[index];
      }

      return SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)];
    })
    .join("");
}

export function HeroSignalLine({ label, lines }: HeroSignalLineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayLine, setDisplayLine] = useState(() => lines[0] ?? "");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (lines.length < 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % lines.length);
    }, LINE_HOLD_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, lines.length]);

  useEffect(() => {
    const target = lines[activeIndex] ?? lines[0] ?? "";

    if (!target) {
      return;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let frame = 0;
    const totalFrames = Math.max(16, target.length + 6);
    const intervalId = window.setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * target.length);

      if (frame >= totalFrames) {
        setDisplayLine(target);
        window.clearInterval(intervalId);
        return;
      }

      setDisplayLine(scrambleLine(target, revealCount));
    }, FRAME_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, lines]);

  return (
    <div className="max-w-2xl rounded-[28px] border border-[color:var(--border-strong)] bg-[linear-gradient(180deg,rgba(7,12,20,0.98),rgba(16,24,38,0.95))] p-4 shadow-[0_24px_70px_rgba(6,10,18,0.16)] sm:p-5">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
        {label}
      </p>
      <div className="mt-3 flex items-start gap-3 text-base leading-7 text-white/88 sm:text-[1.18rem] sm:leading-8">
        <span className="mt-2 size-2 rounded-full bg-[color:var(--accent-strong)] shadow-[0_0_0_6px_rgba(226,192,120,0.08)]" />
        <p aria-live="polite" className="min-w-0 break-words">
          {displayLine}
          <span className="ml-1 inline-block h-[1.05em] w-px animate-pulse bg-[color:var(--accent-strong)] align-[-0.1em]" />
        </p>
      </div>
    </div>
  );
}
