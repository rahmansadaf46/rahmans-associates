import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

const bars = [
  {
    delay: "0s",
    duration: "14s",
    height: "74%",
    left: "8%",
    rotate: "-7deg",
    width: "14rem",
  },
  {
    delay: "1.2s",
    duration: "16s",
    height: "88%",
    left: "24%",
    rotate: "-3deg",
    width: "11rem",
  },
  {
    delay: "0.8s",
    duration: "15s",
    height: "70%",
    left: "42%",
    rotate: "3deg",
    width: "13rem",
  },
  {
    delay: "1.8s",
    duration: "17s",
    height: "92%",
    left: "62%",
    rotate: "7deg",
    width: "10rem",
  },
  {
    delay: "2.4s",
    duration: "15s",
    height: "78%",
    left: "78%",
    rotate: "11deg",
    width: "12rem",
  },
];

export function ShimmerBarScene({
  className,
}: {
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("shimmer-bar-scene", className)}>
      {bars.map((bar) => (
        <div
          key={`${bar.left}-${bar.width}`}
          className="shimmer-bar"
          style={
            {
              "--bar-delay": bar.delay,
              "--bar-duration": bar.duration,
              "--bar-height": bar.height,
              "--bar-left": bar.left,
              "--bar-rotate": bar.rotate,
              "--bar-width": bar.width,
            } as CSSProperties
          }
        >
          <div className="shimmer-bar-core" />
        </div>
      ))}
      <div className="shimmer-scene-haze" />
    </div>
  );
}
