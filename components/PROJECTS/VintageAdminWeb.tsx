import { Mouse } from "lucide-react";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import Image from "next/image";
import { Label } from "../ui/label";
import Lilies from "../Lilies";

export default function VintageAdminWeb({ onClick }: { onClick?: () => void }) {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="z-80 w-[90%] h-full gap-8 p-4 flex flex-col">
        <div className="z-80 w-full flex items-center justify-center">
          <div
            className={`${
              screenWidth <= 1450
                ? "flex-col-reverse gap-8 w-full items-center"
                : "w-[70%] h-200"
            } flex flex-col  relative justify-center `}
          >
            <div
              className={`  ${
                screenWidth <= 1450
                  ? "w-full flex flex-col-reverse"
                  : "right-0 absolute"
              }`}
            >
              <Image
                src={"/projects/admin_1.png"}
                alt=""
                width={1000}
                height={900}
                className={` ${
                  screenWidth <= 1450 ? "w-full border-5 border-black rounded-[10px]" : "rounded-xl w-[90vh] border-10 border-black"
                } shadow-blue-400 shadow-[0_0px_25px_rgba(59,130,246,0.5)] object-contain border-black`}
              ></Image>
            </div>
            <div
              className={`rect w-full flex flex-col justify-between  p-4 max-h-70  ${
                screenWidth <= 1450
                  ? "min-w-full gap-4"
                  : "h-full min-w-[340px] max-w-[60%]"
              }`}
            >
              <div>
                <Label
                  variant="h2"
                  className={`${screenWidth <= 1000 ? "text-[2.2vh]" : ""}`}
                >
                  VINTAGE ASSOCIATES - ADMIN
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
                Developed the admin interface for managing users and clients,
                adding and updating wine listings, and sending system
                notifications, with a focus on usability and efficient
                workflows.
              </Label>
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
          </div>
        </div>
      </div>

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
