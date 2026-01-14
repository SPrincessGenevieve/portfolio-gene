"use state";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import Title from "../Title";
import Image from "next/image";
import { Button } from "../ui/button";
import Lilies from "../Lilies";
import { Mouse } from "lucide-react";

export default function AboutMe({ onClick }: { onClick: () => void }) {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="flex flex-row-reverse gap-4 z-40 p-4 items-center justify-center cont-width">
        <Image
          src={"/me.png"}
          width={400}
          height={400}
          alt=""
          className="object-contain shadow-black  h-[35vh] z-40"
        ></Image>
        <div className="flex flex-col items-start gap-4 about-me-desc w-[70%]">
          <div className="flex flex-col justify-center">
            <Title text="ABOUT ME"></Title>
            <Label
              className={`font-thin ${
                screenWidth <= 1000 ? "text-[1.4vh]" : ""
              } uppercase text-shadow-black [text-shadow:0px_0px_20px_rgba(0,0,0,1)]`}
            >
              Frontend Developer with 1+ year of experience building responsive,
              scalable web applications using React and Next.js. Experienced in
              translating UI/UX designs into high-quality code, integrating
              APIs, and optimizing performance. Strong background in modern
              JavaScript, component-driven architecture, and real-world business
              applications.
            </Label>
          </div>
          <div>
            <Button className=" hover:shadow-blue-400/70 transition border border-transparent hover:border-blue-400 duration-200 ease-in-out hover:shadow-xl">
              DOWNLOAD CV
            </Button>
          </div>
        </div>
      </div>

      <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
      <div className="w-full z-50 h-full absolute bottom-0 flex items-center justify-center">
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
