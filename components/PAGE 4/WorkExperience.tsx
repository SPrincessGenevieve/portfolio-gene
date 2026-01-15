"use client";

import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import Title from "../Title";
import Image from "next/image";
import { Button } from "../ui/button";
import Lilies from "../Lilies";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Mouse } from "lucide-react";
import { motion, useInView } from "framer-motion";

const experience = [
  {
    logo: "/wela.png",
    title: "WELA ONLINE CORP.",
    role: "WEB DEVELOPER",
    desc: "I work as a Web Developer at Wela Online Corp, primarily responsible for updating, customizing, and maintaining the company’s websites to ensure they remain functional, user-friendly, and aligned with business needs. My role includes implementing feature enhancements, fixing bugs, optimizing performance, and integrating backend data, while collaborating with designers and stakeholders to deliver consistent and reliable web solutions.",
    date: "FEB 2024 - OCT 2024",
  },
  {
    logo: "/vintage.png",
    title: "VINTAGE ASSOCIATES",
    role: "FRONTEND DEVELOPER",
    desc: "I worked as a Frontend Developer at Vintage Associates, where I developed both mobile and web interfaces for their Wine Investment app, including the Admin frontend. My role involved translating design mockups into responsive, interactive layouts, ensuring seamless user experiences across devices, and writing clean, maintainable code to support both customer-facing and administrative features.",
    date: "DEC 2024 - JAN 2026",
  },
];

export default function WorkExperience({ onClick }: { onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const gridSquareVariants = { hidden: { opacity: 0 }, show: { opacity: 1 } };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <motion.section
        ref={sectionRef}
        variants={gridContainerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"} // <-- controlled by isInView
        className={`w-full h-full flex-col overflow-x-hidden flex justify-center ${
          screenWidth <= 900 ? "gap-2 p-8" : "gap-12 p-25"
        }`}
      >
        <motion.div ref={ref} variants={gridSquareVariants} className="z-90">
          <Label
            variant="h1"
            className={`${
              screenWidth <= 1000 ? "text-[3vh]" : ""
            } z-80 text-shadow-black [text-shadow:2px_5px_10px_rgba(0,0,0,0.5)] font-mono`}
          >{`<h1>WORK EXPERIENCE</h1>`}</Label>
        </motion.div>
        <motion.div
          className={`flex gap-4 z-80 ${screenWidth <= 770 ? "flex-col" : ""}`}
        >
          {experience.map((item, index) => (
            <motion.div
              variants={gridSquareVariants}
              className={`flex gap-8 bg-gradient-to-r shadow-black shadow-md from-[#0d1048a2] via-[#4950ddbd] to-[#32379aab] p-4 rounded-2xl w-full max-w-120 items-center`}
            >
              <div>
                <Image
                  src={item.logo}
                  alt=""
                  width={400}
                  height={400}
                  className="w-20 h-20"
                ></Image>
              </div>
              <div>
                <Label variant="h2">{item.title}</Label>
                <Label
                  className={` ${screenWidth <= 1000 ? "text-[1.4vh]" : ""}`}
                >
                  {item.role}
                </Label>
                <Label
                  className={` ${screenWidth <= 1000 ? "text-[1.4vh]" : ""}`}
                >
                  {item.date}
                </Label>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={"outline"}
                      className="mt-4 border-white/30"
                    >
                      LEARN MORE
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="hidden"></DialogTitle>
                    <Label>{item.title}</Label>
                    <Label>{item.desc}</Label>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
      </motion.section>
      <div className="w-full z-80 absolute bottom-0 flex items-center justify-center">
        <Mouse
          onClick={onClick}
          size={50}
          strokeWidth={1}
          className="text-white cursor-pointer hover:scale-[1.2] duration-300 transition ease-in-out absolute bottom-10"
        />
      </div>
    </div>
  );
}
