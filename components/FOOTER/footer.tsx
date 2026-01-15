"use client";

import React, { useEffect, useRef, useState } from "react";
import Title from "../Title";
import Lilies from "../Lilies";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import Link from "next/link";
import { delay, motion, useInView } from "framer-motion";

const EMAIL = "p.gene.sagrado@gmail.com";

const contact = [
  {
    label: "EMAIL",
    icon: "/mail.png",
    desc: EMAIL,
    link: "",
  },
  {
    label: "LINKEDIN",
    icon: "/linked.png",
    desc: "/in/sprincess-genevieve/",
    link: "https://www.linkedin.com/in/sprincess-genevieve/",
  },
  {
    label: "GITHUB",
    icon: "/github.png",
    desc: "SPrincessGenevieve",
    link: "https://github.com/SPrincessGenevieve",
  },
];

export default function Footer() {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ContactItem = ({ item }: { item: any }) => {
    if (item.label === "EMAIL") {
      return (
        <div
          onClick={copyEmail}
          className="cursor-pointer flex gap-4 items-center hover:opacity-80 transition"
        >
          {/* Fixed size icon to prevent shrinking */}
          <Image
            src={item.icon}
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 object-contain flex-shrink-0"
          />
          <div className="flex flex-col">
            <Label variant="h2">{item.label}</Label>
            <Label className="text-green-400">
              {copied ? "Copied!" : item.desc}
            </Label>
          </div>
        </div>
      );
    }

    return (
      <Link
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer flex gap-4 items-center hover:opacity-80 transition"
      >
        <Image
          src={item.icon}
          alt=""
          width={48}
          height={48}
          className="w-12 h-12 object-contain flex-shrink-0"
        />
        <div className="flex flex-col">
          <Label variant="h2">{item.label}</Label>
          <Label>{item.desc}</Label>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex items-start justify-center">
      <motion.section
        ref={sectionRef}
        variants={gridContainerVariants}
        className="rect w-full h-full z-80 flex justify-center"
      >
        {screenWidth <= 890 ? (
          // ================= MOBILE =================
          <div className="w-full h-full p-4 flex flex-col gap-4">
            <Label variant="h2">{`<h1>GET IN TOUCH</h1>`}</Label>
            {contact.map((item) => (
              <ContactItem key={item.label} item={item} />
            ))}
          </div>
        ) : (
          // ================= DESKTOP =================
          <div
            className={`flex flex-col p-4 ${
              screenWidth <= 1090 ? "w-full" : "w-[70%]"
            } gap-8`}
          >
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -100 }}
              variants={gridSquareVariants}
              animate={isInView ? "show" : "hidden"}
            >
              <Title text="GET IN TOUCH" />
            </motion.div>
            <div className="flex gap-4 w-full items-center justify-center">
              {contact.map((item, index) => (
                <motion.div
                  key={index}
                  ref={ref}
                  initial={{ opacity: 0, x: 100 }}
                  variants={gridSquareVariants}
                  animate={isInView ? "show" : "hidden"}
                  className="w-full"
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <Card
                    key={item.label}
                    className="w-[90%] hover:bg-[#040847]/70 transition ease-in-out h-full flex items-center justify-center"
                  >
                    <CardContent className="bg-transparent flex flex-col gap-4 items-center justify-center">
                      <div className="w-full h-[30%] flex justify-center">
                        <Image
                          src={item.icon}
                          alt=""
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain flex-shrink-0"
                        />
                      </div>

                      <Label>{item.label}</Label>

                      {item.label === "EMAIL" ? (
                        <Label
                          onClick={copyEmail}
                          className="cursor-pointer text-center text-green-400 hover:opacity-80 transition"
                        >
                          {copied ? "Copied!" : item.desc}
                        </Label>
                      ) : (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Label className="cursor-pointer text-center hover:opacity-80 transition">
                            {item.desc}
                          </Label>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      <Lilies maxCount={8} minSize={250} maxSize={320} />
    </div>
  );
}
