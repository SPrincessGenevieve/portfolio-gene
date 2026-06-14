"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import Title from "../Title";
import Image from "next/image";
import { Button } from "../ui/button";
import Lilies from "../Lilies";
import { Mouse } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function AboutMe({ onClick }: { onClick: () => void }) {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <motion.section
        ref={sectionRef}
        viewport={{ once: true, amount: 0.5 }}
        className="flex flex-row-reverse gap-4 z-40 p-4 items-center justify-center cont-width"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.8, rotate: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
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
            opacity: { duration: 1 },
          }}
        >
          <Image
            src={
              "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779456528/me_kjagis.png"
            }
            width={400}
            height={400}
            alt=""
            className="object-contain shadow-black  h-[35vh] z-40"
          ></Image>
        </motion.div>

        <div className="flex flex-col z-80 items-start gap-4 about-me-desc w-[70%]">
          <div className="flex flex-col justify-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                opacity: { delay: 0.1 },
                x: { delay: 0.1, duration: 0.5 },
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Title text="ABOUT ME"></Title>
            </motion.div>
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                opacity: { delay: 0.2 },
                x: { delay: 0.2, duration: 0.5 },
              }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Label
                className={`font-thin ${
                  screenWidth <= 1000 ? "text-[12px]" : ""
                } uppercase text-shadow-black [text-shadow:0px_0px_20px_rgba(0,0,0,1)]`}
              >
                Full-stack developer with 2+ years of experience, primarily
                focused on frontend development using React and Next.js. Skilled
                in translating UI/UX designs into responsive, high-performance
                interfaces, while also capable of handling backend integrations
                and API development as needed.
              </Label>
            </motion.div>
          </div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              opacity: { delay: 0.3 },
              x: { delay: 0.3, duration: 0.5 },
            }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Link target="_blank" href={"/RESUME.pdf"}>
              <Button className="bg-white text-primary-blue-300 hover:text-white">
                DOWNLOAD RESUME
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
      <div className="w-full z-40  absolute bottom-0 flex items-center justify-center">
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
