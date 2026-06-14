"use client";

import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import Title from "../Title";
import Image from "next/image";
import { Button } from "../ui/button";
import Lilies from "../Lilies";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Mouse } from "lucide-react";
import { motion, useInView } from "framer-motion";

const experience = [
  {
    logo: "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779428434/code-tag_guuw3b.svg",
    title: "FREELANCE",
    role: "FULLSTACK DEVELOPER",
    desc: "As a Fullstack Freelance Developer, I develop and deliver end-to-end web solutions, from UI/UX implementation to backend integration. I focus on building responsive, scalable, and maintainable applications, turning client requirements into polished digital products with strong attention to performance, usability, and detail.",
    date: "FEB 2026 - APR 2026",
  },
  {
    logo: "/vintage.png",
    title: "VINTAGE ASSOCIATES",
    role: "FRONTEND DEVELOPER",
    desc: "I worked as a Frontend Developer at Vintage Associates, where I developed both mobile and web interfaces for their Wine Investment app, including the Admin frontend. My role involved translating design mockups into responsive, interactive layouts, ensuring seamless user experiences across devices, and writing clean, maintainable code to support both customer-facing and administrative features.",
    date: "DEC 2024 - JAN 2026",
  },
  {
    logo: "/wela.png",
    title: "WELA ONLINE CORP.",
    role: "WEB DEVELOPER",
    desc: "I work as a Web Developer at Wela Online Corp, primarily responsible for updating, customizing, and maintaining the company’s websites to ensure they remain functional, user-friendly, and aligned with business needs. My role includes implementing feature enhancements, fixing bugs, optimizing performance, and integrating backend data, while collaborating with designers and stakeholders to deliver consistent and reliable web solutions.",
    date: "FEB 2024 - OCT 2024",
  },
];

export default function WorkExperience({ onClick }: { onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
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
        className={`w-full h-full flex-col overflow-x-hidden flex justify-center ${
          screenWidth <= 900 ? "gap-2 p-4" : "gap-12 p-25"
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: -100,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 80, bounce: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
          ref={ref}
          variants={gridSquareVariants}
          className="z-90"
        >
          <Label
            variant="h1"
            className={`${
              screenWidth <= 1000 ? "text-[3vh]" : ""
            } z-80 text-shadow-black [text-shadow:2px_5px_10px_rgba(0,0,0,0.5)] font-mono`}
          >{`<h1>WORK EXPERIENCE</h1>`}</Label>
        </motion.div>
        <motion.div className={`flex flex-col items-center z-80  w-full`}>
          {experience.map((item, index) => (
            <div className="flex gap-2 h-100  w-full" key={index}>
              {/* left */}
              <div className="pb-4 w-full  flex flex-col items-end gap-2">
                <div className="flex flex-col  items-end gap-1 bg-primary-blue-300/10 backdrop-blur-xl rounded-2xl p-2 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true, amount: 0.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 70,
                      bounce: 0.5,
                    }}
                  >
                    <Label className="text-shadow-black text-right">
                      {item.title}
                    </Label>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true, amount: 0.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 70,
                      bounce: 0.5,
                    }}
                  >
                    <Label className={`text-sm font-light  text-right`}>
                      {item.role}
                    </Label>
                  </motion.div>
                </div>
                <motion.div
                  className="relative w-20 h-20 mb-20"
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true, amount: 0.5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    bounce: 0.5,
                  }}
                >
                  <Image
                    src={item.logo}
                    alt=""
                    fill
                    className="  bg-white rounded-2xl"
                  ></Image>
                </motion.div>
              </div>
              {/* middle */}
              <motion.div className="relative  min-w-10  flex flex-col items-center ">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  whileInView={{ opacity: 1, height: "100%" }}
                  transition={{
                    type: "spring",
                    stiffness: index === 0 ? 70 : index === 1 ? 50 : 30,
                    bounce: 0.5,
                  }}
                  className={`w-0.5 absolute bg-white ${index === 2 ? "" : "h-full"} rounded-2xl`}
                ></motion.div>
              </motion.div>
              {/* right */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true, amount: 0.5 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: index === 0 ? 70 : index === 1 ? 50 : 30,
                  bounce: 0.5,
                }}
                className="flex w-full items-start"
              >
                <Label
                  className={`text-sm font-light bg-primary-blue-300/10 backdrop-blur-xl`}
                >
                  {item.date}
                </Label>
              </motion.div>
            </div>
          ))}
        </motion.div>
        <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
      </motion.section>
      <div className="w-full flex items-center justify-center">
        <Mouse
          onClick={onClick}
          size={50}
          strokeWidth={1}
          className="text-white cursor-pointer hover:scale-[1.2] duration-300 transition ease-in-out "
        />
      </div>
    </div>
  );
}
