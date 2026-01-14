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

export default function SwimmingFish() {
  const fishRefs = useRef<HTMLDivElement[]>([]);

  const progress = useRef<number[]>(Array(directions.length).fill(0));

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  // Generate fish sizes and GIFs only once

  const fishData = useRef(
    directions.map((_, i) => {
      const baseSize = Math.floor(rand(170, 300));

      return {
        size: baseSize,

        gif: fishGIFs[i % fishGIFs.length],
      };
    })
  );

  const springs = directions.map(() =>
    useSpring(() => ({
      speed: 1,

      config: { tension: 170, friction: 26, mass: 1.2 },
    }))
  );

  // Update window width on resize

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      fishRefs.current.forEach((fish, i) => {
        if (!fish) return;

        const { speed } = springs[i][0];

        progress.current[i] += 0.001 * speed.get();

        const t = progress.current[i] % 1;

        const w = window.innerWidth;

        const h = window.innerHeight;

        let x = 0;

        let y = 0;

        let rotation = 0;

        let scaleX = 1;

        switch (directions[i]) {
          case "leftRight":
            x = -200 + t * (w + 400);

            y = h * 0.3;

            scaleX = -1;

            rotation = 0;

            break;

          case "rightLeft":
            x = w + 200 - t * (w + 400);

            y = h * 0.6;

            scaleX = 1;

            rotation = 0;

            break;

          case "topDown":
            x = w * 0.2;

            y = -200 + t * (h + 400);

            rotation = -85;

            scaleX = 1;

            break;

          case "bottomUp":
            x = w * 0.7;

            y = h + 200 - t * (h + 400);

            rotation = 90;

            scaleX = 1;

            break;

          case "diagonal1":
            x = -200 + t * (w + 400);

            y = -200 + t * (h + 400);

            rotation = -145;

            scaleX = 1;

            break;

          case "diagonal2":
            x = w + 200 - t * (w + 400);

            y = h + 200 - t * (h + 400);

            rotation = 45;

            scaleX = 1;

            break;
        }

        fish.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scaleX(${scaleX})`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [springs]);

  return (
    <div className={styles.container}>
      {directions.map((_, i) => {
        const [, api] = springs[i];

        const size = fishData.current[i].size; // use fixed size

        const gif = fishData.current[i].gif;

        return (
          <div
            key={i}
            ref={(el) => {
              if (el) fishRefs.current[i] = el;
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
            <Image src={gif} alt="Fish" className="" width={size} height={size} priority />
          </div>
        );
      })}
    </div>
  );
}
