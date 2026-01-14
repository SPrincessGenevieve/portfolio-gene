"use client";

import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";

export default function Title({ text }: { text: string }) {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Label
      variant="h1"
      className={`${
        screenWidth <= 1000 ? "text-[3vh]" : ""
      } z-80 text-shadow-black [text-shadow:2px_5px_10px_rgba(0,0,0,0.5)] font-mono`}
    >{`<h1>${text}</h1>`}</Label>
  );
}
