"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Lily {
  src: string;
  top: number;
  left: number;
  size: string;
}

interface LiliesProps {
  maxCount?: number; // max number of normal lilies
  minSize?: number; // in px
  maxSize?: number; // in px
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

export default function Lilies({
  maxCount = defaultProps.maxCount,
  minSize = defaultProps.minSize,
  maxSize = defaultProps.maxSize,
}: LiliesProps) {
  const [lilies, setLilies] = useState<Lily[]>([]);
  const [tinyLilies, setTinyLilies] = useState<Lily[]>([]);

  useEffect(() => {
    const newLilies: Lily[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const safeWidth = window.innerWidth * 0.2;
    const safeHeight = window.innerHeight * 0.2;
    const minX = centerX - safeWidth / 2;
    const maxX = centerX + safeWidth / 2;
    const minY = centerY - safeHeight / 2;
    const maxY = centerY + safeHeight / 2;

    lilyImages.slice(0, maxCount).forEach((src) => {
      const size =
        Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const horizontal =
        Math.random() > 0.5 ? [0, minX] : [maxX, window.innerWidth];
      const vertical =
        Math.random() > 0.5 ? [0, minY] : [maxY, window.innerHeight];

      let left =
        horizontal[0] + Math.random() * (horizontal[1] - horizontal[0]);
      let top = vertical[0] + Math.random() * (vertical[1] - vertical[0]);

      // avoid stacking
      let attempts = 0;
      while (
        newLilies.some(
          (lily) =>
            Math.abs(lily.top - top) < 100 && Math.abs(lily.left - left) < 100,
        ) &&
        attempts < 50
      ) {
        left = horizontal[0] + Math.random() * (horizontal[1] - horizontal[0]);
        top = vertical[0] + Math.random() * (vertical[1] - vertical[0]);
        attempts++;
      }

      newLilies.push({ src, top, left, size: `${size}px` });
    });

    setLilies(newLilies);

    // Tiny lilies
    const newTiny: Lily[] = [];
    const tinyCount = 5;
    for (let i = 0; i < tinyCount; i++) {
      const size = Math.floor(Math.random() * (80 - 25 + 1)) + 25; // 25–80px
      const horizontal =
        Math.random() > 0.5 ? [0, minX] : [maxX, window.innerWidth];
      const vertical =
        Math.random() > 0.5 ? [0, minY] : [maxY, window.innerHeight];

      let left =
        horizontal[0] + Math.random() * (horizontal[1] - horizontal[0]);
      let top = vertical[0] + Math.random() * (vertical[1] - vertical[0]);

      let attempts = 0;
      while (
        newTiny.some(
          (lily) =>
            Math.abs(lily.top - top) < 20 && Math.abs(lily.left - left) < 20,
        ) &&
        attempts < 50
      ) {
        left = horizontal[0] + Math.random() * (horizontal[1] - horizontal[0]);
        top = vertical[0] + Math.random() * (vertical[1] - vertical[0]);
        attempts++;
      }

      newTiny.push({
        src: "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335451/lily_j68zwb.png",
        top,
        left,
        size: `${size}px`,
      });
    }

    setTinyLilies(newTiny);
  }, [maxCount, minSize, maxSize]);

  return (
    <>
      {lilies.map((lily, index) => (
        <Image
          key={index}
          src={lily.src}
          alt=""
          width={400}
          height={400}
          className="absolute drop-shadow-[10px_10px_5px_rgba(0,0,0,0.5)] z-30 float-lily object-contain"
          style={{
            top: lily.top,
            left: lily.left,
            width: lily.size,
            minWidth: "5rem",
            maxWidth: "12.5rem",
          }}
        />
      ))}

      {tinyLilies.map((lily, index) => {
        const size = parseInt(lily.size);
        return (
          <Image
            key={`tiny-${index}`}
            src={lily.src}
            alt=""
            width={size}
            height={size}
            className="float-lily z-10 drop-shadow-[10px_10px_5px_rgba(0,0,0,0.5)]"
            style={{
              position: "absolute",
              top: lily.top,
              left: lily.left,
              zIndex: 30,
            }}
          />
        );
      })}
    </>
  );
}
