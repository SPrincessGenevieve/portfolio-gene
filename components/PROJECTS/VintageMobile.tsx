"use client";
import { Mouse, PlayIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Title from "../Title";
import Image from "next/image";
import { Label } from "../ui/label";
import Lilies from "../Lilies";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

export default function VintageMobile({ onClick }: { onClick?: () => void }) {
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
      <motion.section
        ref={sectionRef}
        variants={gridContainerVariants}
        className="z-80 w-[90%]  gap-8 p-4 flex flex-col"
      >
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
                  ? "w-full max-w-120 flex flex-col-reverse"
                  : "right-0 absolute"
              } max-w-120`}
            >
              <Image
                src={"/projects/mob-1.png"}
                alt=""
                width={1000}
                height={1000}
                className={` ${
                  screenWidth <= 1450 ? "w-full" : "w-[70vh]"
                } drop-shadow-[0px_0px_12px_rgba(81,162,255,0.5)] rounded-2xl`}
              ></Image>
            </motion.div>

            {/* DETAILS */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -100 }}
              variants={gridSquareVariants}
              animate={isInView ? "show" : "hidden"}
              className={`rect w-full flex flex-col justify-between  p-4 max-h-70  ${
                screenWidth <= 1450
                  ? "min-w-full gap-4"
                  : "h-full min-w-[340px] max-w-[60%]"
              } `}
            >
              <div>
                <Label
                  variant="h2"
                  className={`${screenWidth <= 1000 ? "text-[2.2vh]" : ""}`}
                >
                  VINTAGE ASSOCIATES - MOB
                </Label>
                <Label
                  className={`uppercase ${
                    screenWidth <= 1000 ? "text-[2vh]" : ""
                  }`}
                >
                  Fronted Developer
                </Label>
              </div>
              <Label
                className={`uppercase  ${
                  screenWidth <= 1000 ? "text-[1.4vh]" : ""
                }`}
              >
                Developed a mobile-friendly investment experience, optimizing
                UI/UX for tracking wine portfolios and investment performance on
                the go.
              </Label>
              <div className="w-full flex justify-between items-center">
                <Dialog>
                  <DialogTrigger>
                    <Button>
                      <PlayIcon></PlayIcon> DEMO
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-auto max-w-none sm:max-w-[80%] h-auto p-2 bg-black/70">
                    <DialogTitle className="hidden"></DialogTitle>
                    <div className="flex h-full max-w-90 min-w-70 items-center justify-center">
                      <video
                        className="rounded-[10px] w-auto h-full object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      >
                        <source src="/projects/mobile_1.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>
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
