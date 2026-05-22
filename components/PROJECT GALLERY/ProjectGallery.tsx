import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Title from "../Title";
import { Mouse } from "lucide-react";

const projects = [
  {
    title: "FlowChat SOP – Virtual Assistant Training Website and Mobile App",
    description:
      "A web-based learning and certification platform designed to help aspiring virtual assistants complete training programs, take assessments, and earn certifications through structured online learning workflows.",
    documentation: {},
    imageUrl: null,
    overlayImageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779416114/flowchat_y14hid.png",
  },
  {
    title: "Ducts All Done – Air Conditioning & Cleaning Services Website",
    description:
      "A service-based business website for a US HVAC and air duct cleaning company, designed to showcase services, generate customer leads, and improve online customer engagement.",
    documentation: {},
    imageUrl: null,
    overlayImageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1773992360/dirty-vent_e9imih.png",
  },
  {
    title: "Admin Investment Platform",
    description:
      "A digital investment platform that allows users to buy, sell, and manage wine investment assets through a secure and user-friendly web application.",
    documentation: {},
    imageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779338510/line-chart_jttymq.png",
    overlayImageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779340887/wine-bottle_g6h0bk.png",
  },
  {
    title: "Web and Mobile Application for Wine Investment Management",
    description:
      "A mobile companion application for the Vintage Associates investment platform, enabling users to manage wine investments, monitor assets, and access platform features directly from mobile devices.",
    documentation: {},
    imageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779338510/line-chart_jttymq.png",
    overlayImageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779416964/wine-bottles_uehxfu.png",
  },
  {
    title: "Web Application for Affiliate Management",
    description:
      "An affiliate management portal designed to manage referral partners, commission structures, affiliate tracking, and performance reporting for marketing and partnership operations.",
    documentation: {},
    imageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779338510/line-chart_jttymq.png",
    overlayImageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779418859/affiliate_h2fvra.png",
  },
  {
    title: "Web Monitoring & Analytics Platform",
    description:
      "A monitoring and analytics platform designed to visualize operational data, system metrics, and analytics insights through dashboards, reports, and data management tools.",
    documentation: {},
    imageUrl: null,
    overlayImageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779419617/green_bqhrgu.png",
  },
];

export default function ProjectGallery({ onClick }: { onClick?: () => void }) {
  return (
    <div className="w-full gap-8 p-8 flex flex-col min-h-screen items-center justify-center">
      <div className={"max-w-7xl w-full flex items-center justify-start"}>
        <Title text={"Project Gallery"}></Title>
      </div>
      <div className="max-w-7xl w-full items-center justify-center  max-[1280px]:max-w-4xl max-[1280px]:grid-cols-2 max-[860px]:grid-cols-1 gap-10 p-2 grid grid-cols-3  ">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1, height: 350 }}
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 70,
              delay: index * 0.2,
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-[860px]:w-full w-100 overflow-hidden justify-between rounded-2xl relative bg-linear-0 from-primary-blue-300 to-primary-blue-200 shadow-[0_0_10px_10px] shadow-blue-400/20"
          >
            <div className="flex gap-4 h-[70%] flex-col p-8">
              <Label className="uppercase  z-30">{project.title}</Label>
              <Label className="text-[12px]  z-30">{project.description}</Label>
            </div>
            <motion.div
              // variants={{
              //   rest: {
              //     opacity: 0,
              //   },
              //   hover: {
              //     opacity: 1,
              //   },
              // }}
              // transition={{ duration: 0.3 }}
              className="relative h-30  w-full flex items-center justify-end gap-4"
            >
              <div className="absolute z-40 p-8 left-0">
                <Button>VIEW MORE</Button>
              </div>
              {project.imageUrl && (
                <Image
                  alt=""
                  src={project.imageUrl}
                  fill
                  className="object-cover object-top z-10 absolute w-full"
                />
              )}
              <Image
                alt=""
                src={project.overlayImageUrl}
                width={400}
                height={400}
                className="object-cover absolute z-20 w-auto max-[860px]:h-80 max-[635px]:h-50 h-60 "
              ></Image>
            </motion.div>
          </motion.div>
        ))}
      </div>
      {/* ================= MOUSE ================= */}
      <div className="w-full  flex items-center mt-10 justify-center">
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
