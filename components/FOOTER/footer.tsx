"use client";

import React, { useEffect, useState } from "react";
import Title from "../Title";
import Lilies from "../Lilies";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import Link from "next/link";

const contact = [
  {
    label: "EMAIL",
    icon: "/mail.png",
    desc: "p.gene.sagrado@gmail.com",
  },
  {
    label: "LINKEDIN",
    icon: "/linked.png",
    desc: "/in/sprincess-genevieve/",
  },
  {
    label: "GITHUB",
    icon: "/github.png",
    desc: "SPrincessGenevieve",
  },
];

export default function Footer() {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className=" w-full h-full flex items-start justify-center">
      <div className="rect w-full h-full z-80 flex justify-center">
        {screenWidth <= 890 ? (
          <div className="w-full h-full p-4 flex flex-col gap-4">
            <Label variant="h2">{`<h1>GET IN TOUCH</h1>`}</Label>
            {contact.map((item, index) => (
              <div className="flex gap-4 items-center">
                <Image
                  src={item.icon}
                  alt=""
                  width={500}
                  height={500}
                  className="w-[10%] min-w-12.5 object-contain"
                ></Image>
                <div className="h-full flex flex-col justify-center">
                  <Label variant="h2">{item.label}</Label>
                  <Label>{item.desc}</Label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-col p-4 ${
              screenWidth <= 1090 ? "w-full" : "w-[70%]"
            } gap-8`}
          >
            <Title text="GET IN TOUCH"></Title>
            <div className="flex gap-4 w-full items-center justify-center">
              {contact.map((item, index) => (
                <Card className=" w-[90%] hover:bg-[#040847]/70 transition ease-in-out h-full flex items-center justify-center">
                  <CardContent className="bg-transparent flex flex-col gap-4 items-center justify-center">
                    <div className="w-full h-[30%] flex justify-center">
                      <Image
                        src={item.icon}
                        alt=""
                        width={500}
                        height={500}
                        className="w-[40%] object-contain"
                      ></Image>
                    </div>
                    <Label>{item.label}</Label>
                    {item.label === "LINKEDIN" ? (
                      <Link
                        className="cursor-pointer"
                        target="_blank"
                        href={
                          "https://www.linkedin.com/in/sprincess-genevieve/"
                        }
                      >
                        <Label className="cursor-pointer text-center">
                          {item.desc}
                        </Label>
                      </Link>
                    ) : item.label === "GITHUB" ? (
                      <Link
                        className="cursor-pointer"
                        target="_blank"
                        href={"https://github.com/SPrincessGenevieve"}
                      >
                        <Label className="cursor-pointer text-center">
                          {item.desc}
                        </Label>
                      </Link>
                    ) : (
                      <Label className=" text-center">{item.desc}</Label>
                    )}
                  </CardContent>
                </Card>
                //
              ))}
            </div>
          </div>
        )}
      </div>
      <Lilies maxCount={8} minSize={250} maxSize={320}></Lilies>
    </div>
  );
}
