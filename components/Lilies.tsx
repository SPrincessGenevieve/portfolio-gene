"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Lily {
  src: string;
  top: number;
  left: number;
  size: number;
  delay: number;
  drift: number;
}

interface LiliesProps {
  maxCount?: number;
  minSize?: number;
  maxSize?: number;
}

const defaultProps = {
  maxCount: 5,
  minSize: 20,
  maxSize: 50,
};

const lilyImages = [
  "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335290/flower-lily-pad-2_r9expq.png",
  "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335289/lily-pad_nspzz4.png",
  "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335451/lily-1_u9pc80.png",
  "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335451/lily-2_ja6jxe.png",
];

const TINY_LILY =
  "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335451/lily_j68zwb.png";

const EDGE_GAP = 24;
const CENTER_GAP = 0.2;
const MAX_LILY_SIZE = 200;

export default function Lilies({
  maxCount = defaultProps.maxCount,
  minSize = defaultProps.minSize,
  maxSize = defaultProps.maxSize,
}: LiliesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lilies, setLilies] = useState<Lily[]>([]);
  const [tinyLilies, setTinyLilies] = useState<Lily[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver;
    let frameId = 0;
    let previousWidth = 0;
    let previousHeight = 0;
    let hasGenerated = false;

    const generatePositions = (
      count: number,
      sizes: number[],
      sources: string[],
      minDistance: number,
      width: number,
      height: number,
      delayOffset: number,
    ): Lily[] => {
      const result: Lily[] = [];

      for (let i = 0; i < count; i++) {
        const size = Math.min(
          Math.max(sizes[i], 80),
          MAX_LILY_SIZE,
          width - EDGE_GAP * 2,
          height - EDGE_GAP * 2,
        );

        if (size <= 0) continue;

        const margin = Math.min(EDGE_GAP, Math.max(0, (width - size) / 2));
        const maxLeft = Math.max(margin, width - size - margin);
        const maxTop = Math.max(margin, height - size - margin);

        const centerX = width / 2;
        const centerY = height / 2;
        const centerHalfWidth = (width * CENTER_GAP) / 2;
        const centerHalfHeight = (height * CENTER_GAP) / 2;

        const zones = [
          {
            minX: margin,
            maxX: Math.min(centerX - centerHalfWidth - size, maxLeft),
            minY: margin,
            maxY: maxTop,
          },
          {
            minX: Math.max(centerX + centerHalfWidth, margin),
            maxX: maxLeft,
            minY: margin,
            maxY: maxTop,
          },
          {
            minX: margin,
            maxX: maxLeft,
            minY: margin,
            maxY: Math.min(centerY - centerHalfHeight - size, maxTop),
          },
          {
            minX: margin,
            maxX: maxLeft,
            minY: Math.max(centerY + centerHalfHeight, margin),
            maxY: maxTop,
          },
        ].filter((zone) => zone.maxX >= zone.minX && zone.maxY >= zone.minY);

        if (!zones.length) continue;

        let position: Lily | null = null;

        for (let attempt = 0; attempt < 30; attempt++) {
          const zone = zones[Math.floor(Math.random() * zones.length)];

          const left = zone.minX + Math.random() * (zone.maxX - zone.minX);
          const top = zone.minY + Math.random() * (zone.maxY - zone.minY);

          const overlaps = result.some(
            (other) =>
              Math.abs(other.left - left) <
                Math.max(minDistance, (other.size + size) * 0.45) &&
              Math.abs(other.top - top) <
                Math.max(minDistance, (other.size + size) * 0.45),
          );

          if (!overlaps) {
            position = {
              src: sources[i % sources.length],
              top,
              left,
              size,
              delay: delayOffset + i * 180,
              drift: 5 + Math.random() * 7,
            };
            break;
          }
        }

        if (!position) {
          const zone = zones[i % zones.length];

          position = {
            src: sources[i % sources.length],
            top: zone.minY,
            left: zone.minX,
            size,
            delay: delayOffset + i * 180,
            drift: 5 + Math.random() * 7,
          };
        }

        result.push(position);
      }

      return result;
    };

    const generateLilies = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      // Avoid regenerating random positions for insignificant resizes.
      if (
        hasGenerated &&
        Math.abs(width - previousWidth) < 32 &&
        Math.abs(height - previousHeight) < 32
      ) {
        return;
      }

      previousWidth = width;
      previousHeight = height;
      hasGenerated = true;

      const normalCount = Math.min(
        Math.max(0, Math.floor(maxCount)),
        lilyImages.length,
      );

      const normalSizes = Array.from(
        { length: normalCount },
        () => Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
      );

      const normal = generatePositions(
        normalCount,
        normalSizes,
        lilyImages,
        100,
        width,
        height,
        100,
      );

      const tinyCount = 5;
      const tinySizes = Array.from(
        { length: tinyCount },
        () => Math.floor(Math.random() * 56) + 25,
      );

      const tiny = generatePositions(
        tinyCount,
        tinySizes,
        [TINY_LILY],
        25,
        width,
        height,
        500,
      );

      setLilies(normal);
      setTinyLilies(tiny);
      setReady(true);
    };

    const scheduleGeneration = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(generateLilies);
    };

    scheduleGeneration();

    resizeObserver = new ResizeObserver(scheduleGeneration);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [maxCount, minSize, maxSize]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`lilies-layer pointer-events-none absolute inset-0 overflow-hidden ${
        ready ? "lilies-ready" : ""
      }`}
    >
      {[...lilies, ...tinyLilies].map((lily, index) => (
        <div
          key={`${lily.src}-${index}`}
          className="lily-entrance absolute"
          style={{
            top: lily.top,
            left: lily.left,
            width: lily.size,
            height: lily.size,
            animationDelay: `${lily.delay}ms`,
          }}
        >
          <div
            className="lily-float relative h-full w-full"
            style={
              {
                animationDelay: `${lily.delay + 900}ms`,
                "--lily-drift": `${lily.drift}px`,
              } as React.CSSProperties
            }
          >
            <Image
              src={lily.src}
              alt=""
              width={200}
              height={200}
              sizes={`${lily.size}px`}
              loading="lazy"
              className="h-full w-full object-contain drop-shadow-[0_5px_4px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        .lilies-layer {
          contain: layout paint;
        }

        .lily-entrance {
          opacity: 0;
          transform: translate3d(0, 14px, 0) scale(0.82);
          visibility: hidden;
        }

        .lilies-ready .lily-entrance {
          visibility: visible;
          animation: lily-appear 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .lily-float {
          animation: lily-float 6s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes lily-appear {
          0% {
            opacity: 0;
            transform: translate3d(0, 14px, 0) scale(0.82);
          }
          70% {
            opacity: 0.85;
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes lily-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, var(--lily-drift, -8px), 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .lilies-ready .lily-entrance {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .lily-float {
            animation: none;
            will-change: auto;
          }
        }
      `}</style>
    </div>
  );
}
