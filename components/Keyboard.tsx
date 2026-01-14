import React from "react";
import { Label } from "./ui/label";

export default function Keyboard() {
  const stacks_icon = [
    "/stack/axios.png",
    "/stack/git.png",
    "/stack/html.png",
    "/stack/js.svg",
    "/stack/motion.png",
    "/stack/mui.png",
    "/stack/next.png",
    "/stack/react.png",
    "/stack/tailwind.png",
    "/stack/vercel.png",
  ];
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="bg-[blue]/30 duration-200 hover:shadow-[0px_0px_15px_rgba(255,255,255,0.7)] border-transparent hover:shadow-white/70  hover:border-white/70 transition ease-in-out w-[6.5vh] rounded-[1.2vh] flex items-center justify-center text-center h-[6.5vh]"
          >
            <Label>Item {i}</Label>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className="bg-[blue]/30 duration-200 hover:shadow-[0px_0px_15px_rgba(255,255,255,0.7)] border-transparent hover:shadow-white/70  hover:border-white/70 transition ease-in-out w-[6.5vh] rounded-[1.2vh] flex items-center justify-center text-center h-[6.5vh]"
          >
            <Label>Item {i}</Label>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="bg-[blue]/30 duration-200 hover:shadow-[0px_0px_15px_rgba(255,255,255,0.7)] border-transparent hover:shadow-white/70  hover:border-white/70 transition ease-in-out w-[6.5vh] rounded-[1.2vh] flex items-center justify-center text-center h-[6.5vh]"
          >
            <Label>Item {i}</Label>
          </div>
        ))}
      </div>
      <div>
        <div className="bg-[blue]/30 duration-200 hover:shadow-[0px_0px_15px_rgba(255,255,255,0.7)] border-transparent hover:shadow-white/70  hover:border-white/70 transition ease-in-out rounded-[1.2vh] flex items-center justify-center text-center h-[6.5vh] w-[35vh]">
          <Label>space</Label>
        </div>
      </div>
    </div>
  );
}
