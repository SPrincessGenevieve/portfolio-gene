"use client";

import { Mouse, PlayIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Title from "../Title";
import Image from "next/image";
import { Label } from "../ui/label";
import Lilies from "../Lilies";
import { motion, useInView } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";

export default function GreenWeb({ onClick }: { onClick?: () => void }) {
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

  const gridSquareVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <motion.section className="z-80 w-[90%] h-full gap-8 p-4 flex flex-col">
        <div className="z-80 w-full flex items-center justify-center">
          <div
            className={`${
              screenWidth <= 1450
                ? "flex-col-reverse gap-8 w-full items-center"
                : "w-[70%] h-200"
            } flex flex-col  relative justify-center `}
          >
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 100 }}
              variants={gridSquareVariants}
              animate={isInView ? "show" : "hidden"}
              transition={{ duration: 1, ease: "backInOut", delay: 0.3 }}
              className={`  ${
                screenWidth <= 1450
                  ? "w-full flex flex-col-reverse"
                  : "right-0 absolute"
              }`}
            >
              <Image
                src={"/projects/green_leaf.png"}
                alt=""
                width={1000}
                height={900}
                className={` ${
                  screenWidth <= 1450
                    ? "w-full border-5 border-black rounded-[10px]"
                    : "rounded-xl w-[90vh] border-10 border-black"
                } shadow-blue-400 shadow-[0_0px_25px_rgba(59,130,246,0.5)] object-contain border-black`}
              ></Image>
            </motion.div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -100 }}
              variants={gridSquareVariants}
              animate={isInView ? "show" : "hidden"}
              className={`rect w-full flex flex-col justify-between  p-4 max-h-70  ${
                screenWidth <= 1450
                  ? "min-w-full gap-4"
                  : "h-full min-w-[340px] max-w-[60%]"
              }`}
            >
              <div>
                <Label
                  variant="h2"
                  className={`${screenWidth <= 1000 ? "text-[18px]" : ""}`}
                >
                  GREEN FUTURE
                </Label>
                <Label
                  className={`uppercase ${
                    screenWidth <= 1000 ? "text-[16px]" : ""
                  }`}
                >
                  Fronted Developer
                </Label>
              </div>
              <Label
                className={`uppercase  ${
                  screenWidth <= 1000 ? "text-[12px]" : ""
                }`}
              >
                Developed the admin interface for managing users and clients,
                adding and updating wine listings, and sending system
                notifications, with a focus on usability and efficient
                workflows.
              </Label>
              <div className="w-full flex justify-between items-center">
                <Link
                  target="_blank"
                  href={"https://www.youtube.com/watch?v=JbM2V3H1_XQ"}
                >
                  <Button>
                    <PlayIcon></PlayIcon> DEMO
                  </Button>
                </Link>
                <div className="flex gap-2 w-full justify-end">
                  <Image
                    alt=""
                    className="w-[5%] min-w-7 object-contain brightness-0 saturate-100 invert white hue-rotate-[330deg]"
                    width={400}
                    height={400}
                    src={"/stack/next.png"}
                  ></Image>
                  <Image
                    alt=""
                    className="w-[5%] min-w-7 rounded-full object-contain"
                    width={400}
                    height={400}
                    src={"/stack/shadcn.png"}
                  ></Image>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
    </div>
  );
}
