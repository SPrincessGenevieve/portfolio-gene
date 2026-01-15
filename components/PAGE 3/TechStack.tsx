"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { DotIcon, Mouse } from "lucide-react";
import Lilies from "../Lilies";
import { useInView, motion, easeInOut, inView } from "framer-motion";

const stack = [
  { label: "HTML", icon: "/stack/html.png" },
  { label: "Tailwind CSS", icon: "/stack/tailwind.png" },
  { label: "Javascript", icon: "/stack/js.svg" },
  { label: "React", icon: "/stack/react.png" },
  { label: "Next.js", icon: "/stack/next.png" },
  { label: "Material UI", icon: "/stack/mui.png" },
  { label: "Framer Motion", icon: "/stack/motion.png" },
  { label: "Axios", icon: "/stack/axios.png" },
  { label: "Git", icon: "/stack/git.png" },
  { label: "Vercel", icon: "/stack/vercel.png" },
];

const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

export default function TechStack({ onClick }: { onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const stackList = useMemo(() => shuffle(stack), []);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const Key = ({ label }: { label: string }) => {
    const icon = stackList.find((item) => item.label === label)!;

    return (
      <motion.div
        onMouseEnter={() => setHoveredKey(label)}
        onMouseLeave={() => setHoveredKey(null)}
        className={`
           bg-[blue]/30
          duration-200
          hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]
          transition
          ${screenWidth <= 530 ? "w-[5vh] h-[5vh]" : "w-[6.5vh] h-[6.5vh]"}
          rounded-[10px]
          flex items-center justify-center
          `}
      >
        <Image
          src={icon.icon}
          alt={icon.label}
          width={400}
          height={400}
          className={`transition ${
            screenWidth <= 530 ? "w-[3vh] h-[3vh]" : "w-[5vh] h-[5vh]"
          } ${
            hoveredKey === label
              ? "brightness-0 saturate-100 invert sepia hue-rotate-[330deg]"
              : ""
          }`}
        />
      </motion.div>
    );
  };

  const Dot = () => (
    <motion.div
      className={`${
        screenWidth <= 530 ? "w-[5vh] h-[5vh]" : "w-[6.5vh] h-[6.5vh]"
      } bg-[blue]/30 rounded-[10px] flex items-center justify-center`}
    >
      <span className="text-white text-2xl">{/* <DotIcon></DotIcon> */}</span>
    </motion.div>
  );

  let stackCounter = 0;

  const createRow = (length: number) => {
    const row: JSX.Element[] = [];
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        // Even index → Stack (Key)
        const label = stackList[stackCounter].label;
        row.push(
          <motion.div
            ref={ref}
            initial={{
              opacity: 0,
              scale: 0.5,
              borderRadius: "100%",
              rotate: 20,
            }}
            animate={
              isInView && {
                opacity: 1,
                scale: 1,
                borderRadius: "10%",
                rotate: 0,
              }
            }
            transition={{
              duration: 0.5,
              ease: easeInOut,
              rotate: {
                type: "spring",
                stiffness: 220,
                damping: 18,
                duration: 3,
                delay: 0.5,
              },
              scale: {
                type: "spring",
                stiffness: 200,
                damping: 20,
              },
            }}
          >
            <Key key={`key-${label}`} label={label} />
          </motion.div>
        );
        stackCounter++;
      } else {
        // Odd index → Dot
        row.push(
          <motion.div
            ref={ref}
            initial={{
              opacity: 0,
              scale: 0.5,
              borderRadius: "100%",
              rotate: 20,
            }}
            animate={
              isInView && {
                opacity: 1,
                scale: 1,
                borderRadius: "10%",
                rotate: 0,
              }
            }
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: easeInOut,
              rotate: {
                type: "spring",
                stiffness: 220,
                damping: 18,
                duration: 3,
                delay: 0.5,
              },
              scale: {
                type: "spring",
                stiffness: 200,
                damping: 20,
              },
            }}
          >
            <Dot key={`dot-${i}`} />
          </motion.div>
        );
      }
    }
    return row;
  };

  return (
    <div className="flex flex-row flex-wrap-reverse items-center justify-evenly w-full h-full">
      <motion.section
        ref={sectionRef}
        className={`flex items-center ${
          screenWidth <= 1025
            ? "flex-col-reverse justify-start gap-10"
            : "gap-40"
        }`}
      >
        {/* ================= KEYBOARD ================= */}
        <motion.div ref={ref} className="flex flex-col z-80 items-center gap-2">
          <div className="flex gap-2">{createRow(6)}</div>
          <div className="flex gap-2">{createRow(7)}</div>
          <div className="flex gap-2">{createRow(6)}</div>

          {/* SPACE BAR */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView && { opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "backInOut", delay: 0.3 }}
            className={`${
              screenWidth <= 530 ? "h-[5vh] w-[30vh]" : "h-[6.5vh] w-[35vh]"
            } bg-[blue]/30 duration-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.7)] transition rounded-xl flex items-center justify-center `}
          >
            <Label>space</Label>
          </motion.div>
        </motion.div>

        {/* ================= STACK LIST ================= */}
        <motion.div
          ref={ref}
          className="z-80"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView && { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "backInOut", delay: 0.2 }}
        >
          <Card
            className={`bg-[#21267C]/70  z-80 w-full  ${
              screenWidth < 410 ? "max-w-80" : "max-w-100"
            }`}
          >
            <CardContent>
              <Label>{`<h1>Tech Stack</h1>`}</Label>
              <Card className="bg-[#040847]/80">
                <CardContent>
                  <Label className="text-[#32389A]">{`<ul>`}</Label>
                  <div className="pl-6 flex flex-col gap-1">
                    {stackList.map((item) => (
                      <div key={item.label} className="flex gap-2 items-center">
                        <Label className="text-[#8A38F5]">{`<li>`}</Label>
                        <Label
                          className={`transition-colors ${
                            hoveredKey === item.label
                              ? "text-red-400"
                              : "text-white"
                          }`}
                        >
                          {item.label}
                        </Label>
                        <Label className="text-[#8A38F5]">{`</li>`}</Label>
                      </div>
                    ))}
                  </div>
                  <Label className="text-[#32389A]">{`</ul>`}</Label>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* ================= MOUSE ================= */}
      <div className="w-full z-80 absolute bottom-0 flex items-center justify-center">
        <Mouse
          onClick={onClick}
          size={50}
          strokeWidth={1}
          className="text-white cursor-pointer hover:scale-[1.2] duration-300 transition ease-in-out absolute bottom-10"
        />
      </div>

      {/* ================= LILIES ================= */}
      <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
    </div>
  );
}
