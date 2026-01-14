"use client";

import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import Title from "../Title";
import Image from "next/image";
import { Button } from "../ui/button";
import Lilies from "../Lilies";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Mouse } from "lucide-react";

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
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full">
      <div
        className={`w-full h-full flex-col  flex justify-center ${
          screenWidth <= 900 ? "gap-2 p-8" : "gap-12 p-25"
        }`}
      >
        <Title text="WORK EXPERIENCE"></Title>
        <div
          className={`flex gap-4 z-80 ${screenWidth <= 770 ? "flex-col" : ""}`}
        >
          {experience.map((item, index) => (
            <div
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
                    <Label>{item.title}</Label>
                    <Label>{item.desc}</Label>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
        <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
      </div>
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
