"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";
import styles from "./FishSwimming.module.css";

const fishGIFs = [
  "/fishes/black-orange.gif",
  "/fishes/orange-white.gif",
  "/fishes/white-orange.gif",
];

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export default function SwimmingFish() {
  const fishRefs = useRef<HTMLDivElement[]>([]);
  const progress = useRef<number[]>(Array(fishGIFs.length).fill(0));

  const springs = fishGIFs.map(() =>
    useSpring(() => ({
      speed: 1,
      config: { tension: 170, friction: 26, mass: 1.2 },
    }))
  );

  useEffect(() => {
    let raf: number;

    const animate = () => {
      fishRefs.current.forEach((fish, i) => {
        if (!fish) return;

        const { speed } = springs[i][0];
        progress.current[i] += 0.0008 * speed.get(); // base speed
        const t = progress.current[i] % 1;

        const w = window.innerWidth;
        const h = window.innerHeight;

        // Curved path: horizontal sine wave
        const amplitude = 80 + i * 10; // vertical wave amplitude
        const frequency = 2 + i * 0.5; // waves along path
        const x = -200 + t * (w + 400);
        const y = h * 0.3 + Math.sin(t * Math.PI * 2 * frequency) * amplitude;

        const rotation = Math.sin(t * Math.PI * 2 * frequency) * 15; // tilt slightly
        const scaleX = -1;

        fish.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scaleX(${scaleX})`;
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [springs]);

  return (
    <div className={styles.container}>
      {fishGIFs.map((gif, i) => {
        const size = Math.floor(rand(170, 300));
        const [, api] = springs[i];

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
            <Image src={gif} alt="Fish" width={size} height={size} priority />
          </div>
        );
      })}
    </div>
  );
}
