"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "@react-spring/web";
import styles from "./FishSwimming.module.css";

const fishGIFs = [
  "/fishes/black-orange.gif",
  "/fishes/black.gif",
  "/fishes/orange-white.gif",
  "/fishes/white-orange.gif",
  "/fishes/white.gif",
];

const directions = [
  "leftRight",
  "rightLeft",
  "topDown",
  "bottomUp",
  "diagonal1",
  "diagonal2",
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

/* -------------------------------------------------- */
/* Helper: compute fish transform BEFORE first paint  */
/* -------------------------------------------------- */
function getFishTransform(
  direction: string,
  t: number,
  w: number,
  h: number,
) {
  let x = 0;
  let y = 0;
  let rotation = 0;
  let scaleX = 1;

  switch (direction) {
    case "leftRight":
      x = -200 + t * (w + 400);
      y = h * 0.3;
      scaleX = -1;
      break;

    case "rightLeft":
      x = w + 200 - t * (w + 400);
      y = h * 0.6;
      break;

    case "topDown":
      x = w * 0.2;
      y = -200 + t * (h + 400);
      rotation = -85;
      break;

    case "bottomUp":
      x = w * 0.7;
      y = h + 200 - t * (h + 400);
      rotation = 90;
      break;

    case "diagonal1":
      x = -200 + t * (w + 400);
      y = -200 + t * (h + 400);
      rotation = -145;
      break;

    case "diagonal2":
      x = w + 200 - t * (w + 400);
      y = h + 200 - t * (h + 400);
      rotation = 45;
      break;
  }

  return `translate(${x}px, ${y}px) rotate(${rotation}deg) scaleX(${scaleX})`;
}

export default function SwimmingFish() {
  const fishRefs = useRef<HTMLDivElement[]>([]);

  // 🔑 Random starting progress PER FISH
  const progress = useRef<number[]>(
    directions.map(() => Math.random()),
  );

  const [showFish, setShowFish] = useState(false);

  // Generate fish sizes and GIFs only once
  const fishData = useRef(
    directions.map((_, i) => ({
      size: Math.floor(rand(170, 300)),
      gif: fishGIFs[i % fishGIFs.length],
    })),
  );

  const springs = directions.map(() =>
    useSpring(() => ({
      speed: 1,
      config: { tension: 170, friction: 26, mass: 1.2 },
    })),
  );

  // ⏱ 3-second delay before showing fishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFish(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // 🎞 Animation loop
  useEffect(() => {
    if (!showFish) return;

    let raf: number;

    const animate = () => {
      fishRefs.current.forEach((fish, i) => {
        if (!fish) return;

        const { speed } = springs[i][0];
        progress.current[i] += 0.001 * speed.get();
        const t = progress.current[i] % 1;

        const w = window.innerWidth;
        const h = window.innerHeight;

        fish.style.transform = getFishTransform(
          directions[i],
          t,
          w,
          h,
        );
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [springs, showFish]);

  return (
    <div className={styles.container}>
      {showFish &&
        directions.map((_, i) => {
          const [, api] = springs[i];
          const { size, gif } = fishData.current[i];

          return (
            <div
              key={i}
              ref={(el) => {
                if (!el) return;

                fishRefs.current[i] = el;

                // 🚀 Set initial position BEFORE paint
                el.style.transform = getFishTransform(
                  directions[i],
                  progress.current[i],
                  window.innerWidth,
                  window.innerHeight,
                );
              }}
              className={styles.fish}
              onMouseEnter={() =>
                api.start({
                  speed: 3,
                  config: { tension: 220, friction: 18 },
                })
              }
              onMouseLeave={() =>
                api.start({
                  speed: 1,
                  config: { tension: 140, friction: 30 },
                })
              }
            >
              <Image
                src={gif}
                alt="Fish"
                width={size}
                height={size}
                priority
              />
            </div>
          );
        })}
    </div>
  );
}
