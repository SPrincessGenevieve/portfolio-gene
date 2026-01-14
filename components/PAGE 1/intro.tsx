"use client";

import React from "react";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Mouse } from "lucide-react";
import Lilies from "../Lilies";

export default function Intro({ onClick, contact }: { onClick: () => void, contact: () => void }) {
  const page1 = [
    { label: "Experience", value: "2+" },
    { label: "Project", value: "4" },
  ];

  return (
    <div className="flex flex-col">
      <Lilies maxCount={8} minSize={250} maxSize={320} />

      <Label
        variant="title"
        className="text-center z-30 text-shadow-black [text-shadow:2px_5px_10px_rgba(0,0,0,0.5)]"
      >
        GENE S.
      </Label>

      <div className="flex flex-col gap-2 z-30 items-center justify-center">
        <Card className="w-full max-w-85 px-2 py-1">
          <CardContent className="flex p-0 justify-between">
            {page1.map((item, index) => (
              <div
                key={index}
                className={`flex w-1/2 flex-col items-center justify-center gap-2`}
              >
                <Label className="text-white text-center" variant="h2">{item.value}</Label>
                <Label className="text-[#32389A] text-center">
                  {item.label}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="text-center flex flex-col items-center justify-center">
          <Label className="font-light" variant="h2">FRONTEND DEVELOPER</Label>
          <Label className="font-light" variant="h2">REACT | NEXTJS</Label>
        </div>

        <div className="mt-20 z-30">
          <Button onClick={contact} className="">CONTACT ME</Button>
        </div>

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
