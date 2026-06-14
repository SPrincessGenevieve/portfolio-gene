"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "@react-spring/web";
import styles from "./FishSwimming.module.css";

const fishGIFs = [""
  // "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335276/black-orange_zjdsxz.gif",
  // "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335274/black_nh6vqu.gif",
  // "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335274/orange-white_nyxlcm.gif",
  // "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335275/white-orange_yszc51.gif",
  // "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779335275/white_a4kt1e.gif",
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
function getFishTransform(direction: string, t: number, w: number, h: number) {
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
  const lastTime = useRef<number | null>(null);

  // 🔑 Random starting progress PER FISH
  const progress = useRef<number[]>(directions.map(() => Math.random()));

  const [showFish, setShowFish] = useState(false);

  // Generate fish sizes and GIFs only once
  const fishData = useRef(
    directions.map((_, i) => ({
      size: Math.floor(rand(130, 270)),
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

    const animate = (time: number) => {
      if (lastTime.current === null) {
        lastTime.current = time;
      }

      const delta = time - lastTime.current;
      lastTime.current = time;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const baseSpeed = isMobile ? 0.08 : 0.06;

      fishRefs.current.forEach((fish, i) => {
        if (!fish) return;

        const { speed } = springs[i][0];

        // ✅ Time-based movement (normalized to 60fps)
        progress.current[i] += (delta / 1000) * baseSpeed * speed.get();
        const t = progress.current[i] % 1;

        const w = window.innerWidth;
        const h = window.innerHeight;

        fish.style.transform = getFishTransform(directions[i], t, w, h);
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      lastTime.current = null;
    };
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
              <Image src={gif} alt="Fish" width={size} height={size} priority />
            </div>
          );
        })}
    </div>
  );
}
