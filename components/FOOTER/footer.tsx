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
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      // viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0.3, stiffness: 70, delay: 0.2 }}
      className="w-full flex min-h-screen  items-center justify-center overflow-hidden "
    >
      <section ref={sectionRef} className="w-full z-80 flex justify-center ">
        {screenWidth <= 890 ? (
          // ================= MOBILE =================
          <div className="w-full  p-4 flex flex-col gap-4">
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
            <div ref={ref}>
              <Title text="GET IN TOUCH" />
            </div>
            <div className="flex gap-4 w-full items-center justify-center">
              {contact.map((item, index) => (
                <div key={index} ref={ref} className="w-full">
                  <Card
                    key={item.label}
                    className="w-[90%] hover:bg-[#040847]/70 border-0 shadow-blue-50/12 shadow-[0_0_20px_10px]  transition backdrop-blur-sm bg-transparent ease-in-out flex items-center justify-center"
                  >
                    <CardContent className="bg-transparent  flex flex-col gap-4 items-center justify-center">
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
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Lilies maxCount={8} minSize={250} maxSize={320} />
    </motion.div>
  );
}
