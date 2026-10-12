"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Lily {
  src: string;
  top: number;
  left: number;
  size: number;
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

export default function Lilies({
  maxCount = defaultProps.maxCount,
  minSize = defaultProps.minSize,
  maxSize = defaultProps.maxSize,
}: LiliesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lilies, setLilies] = useState<Lily[]>([]);
  const [tinyLilies, setTinyLilies] = useState<Lily[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeObserver: ResizeObserver;

    const generateLilies = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      const generatePositions = (
        count: number,
        sizes: number[],
        sources: string[],
        minDistance: number,
      ): Lily[] => {
        const result: Lily[] = [];

        for (let i = 0; i < count; i++) {
          // Keep images within the container, including their edges.
          // Main lilies are capped at 200px by the existing CSS.
          const size = Math.min(
            Math.max(sizes[i], 80),
            200,
            width - EDGE_GAP * 2,
            height - EDGE_GAP * 2,
          );

          if (size <= 0) continue;

          const margin = EDGE_GAP;
          const maxLeft = Math.max(margin, width - size - margin);
          const maxTop = Math.max(margin, height - size - margin);

          // Keep the center clear of decorative lilies.
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

          // Try several positions to avoid overlapping lilies.
          for (let attempt = 0; attempt < 60; attempt++) {
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
              };
              break;
            }
          }

          // Keep the lily even if no non-overlapping spot is found.
          if (!position) {
            const zone = zones[i % zones.length];

            position = {
              src: sources[i % sources.length],
              top: zone.minY,
              left: zone.minX,
              size,
            };
          }

          result.push(position);
        }

        return result;
      };

      const normalSizes = Array.from(
        { length: Math.min(maxCount, lilyImages.length) },
        () => Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
      );

      const normal = generatePositions(
        normalSizes.length,
        normalSizes,
        lilyImages,
        100,
      );

      const tinyCount = 5;
      const tinySizes = Array.from(
        { length: tinyCount },
        () => Math.floor(Math.random() * (80 - 25 + 1)) + 25,
      );

      const tiny = generatePositions(tinyCount, tinySizes, [TINY_LILY], 25);

      setLilies(normal);
      setTinyLilies(tiny);
    };

    generateLilies();

    resizeObserver = new ResizeObserver(() => {
      generateLilies();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [maxCount, minSize, maxSize]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {lilies.map((lily, index) => (
        <Image
          key={`lily-${index}`}
          src={lily.src}
          alt=""
          width={400}
          height={400}
          unoptimized
          className="float-lily absolute z-30 object-contain drop-shadow-[10px_10px_5px_rgba(0,0,0,0.5)]"
          style={{
            top: lily.top,
            left: lily.left,
            width: lily.size,
            height: lily.size,
            minWidth: 0,
            maxWidth: "none",
          }}
        />
      ))}

      {tinyLilies.map((lily, index) => (
        <Image
          key={`tiny-${index}`}
          src={lily.src}
          alt=""
          width={lily.size}
          height={lily.size}
          unoptimized
          className="float-lily absolute z-30 object-contain drop-shadow-[10px_10px_5px_rgba(0,0,0,0.5)]"
          style={{
            top: lily.top,
            left: lily.left,
            width: lily.size,
            height: lily.size,
          }}
        />
      ))}
    </div>
  );
}
