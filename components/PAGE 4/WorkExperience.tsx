"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  Sparkles,
} from "lucide-react";

import Lilies from "../Lilies";
import ScrollIndicator from "../ScrollIndicator";

const experience = [
  {
    logo: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791701306/logo-white.png",
    title: "CONSTANTIN FLOORS",
    role: "WEB DEVELOPER & DIGITAL MARKETING MANAGER",
    date: "JUN 2026 — PRESENT",
    type: "Current role",
    desc: "I manage and improve the company's website, transforming design concepts into responsive WordPress pages while refining the customer experience across devices. My responsibilities also include SEO, Google Analytics, Search Console, Google Ads monitoring, social media content, and digital marketing campaigns to support online visibility and lead generation.",
    highlights: [
      "WordPress development & redesign",
      "Responsive UI implementation",
      "SEO & performance monitoring",
      "Digital marketing campaigns",
    ],
    technologies: ["WordPress", "Elementor", "SEO", "Google Analytics"],
    current: true,
  },
  {
    logo: "/vintage.png",
    title: "VINTAGE ASSOCIATES",
    role: "FRONTEND DEVELOPER",
    date: "DEC 2024 — JAN 2026",
    type: "Previous role",
    desc: "I worked on mobile and web interfaces for a Wine Investment application, including its admin frontend. I translated design mockups into responsive, interactive layouts, focusing on usability, consistent interfaces, and maintainable code across customer-facing and administrative features.",
    highlights: [
      "Responsive web interfaces",
      "Mobile UI implementation",
      "Admin dashboard frontend",
      "Design-to-code development",
    ],
    technologies: ["React", "JavaScript", "CSS", "API Integration"],
    current: false,
  },
  {
    logo: "/wela.png",
    title: "WELA ONLINE CORP.",
    role: "WEB DEVELOPER",
    date: "FEB 2024 — OCT 2024",
    type: "Previous role",
    desc: "I maintained and customized company websites to meet evolving business needs. My work included implementing feature enhancements, troubleshooting bugs, improving performance, and integrating backend data while keeping websites functional and user-friendly.",
    highlights: [
      "Website maintenance",
      "Feature enhancements & bug fixes",
      "Performance improvements",
      "Backend data integration",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Web Development"],
    current: false,
  },
];

export default function WorkExperience({ onClick }: { onClick: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const activeExperience = experience[activeIndex];

  return (
    <section className="relative isolate flex h-full w-full flex-col justify-center overflow-hidden px-5 py-14 text-white sm:px-8 md:px-12 lg:px-20 lg:py-16">
      {/* Background is separate from the interactive content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          // style={{
          //   backgroundImage: `
          //     radial-gradient(ellipse at 12% 12%, rgba(12, 29, 116, 0.38) 0%, transparent 48%),
          //     radial-gradient(ellipse at 88% 80%, rgba(76, 29, 149, 0.15) 0%, transparent 42%)
          //   `,
          // }}
        />

        <div className="absolute inset-0 opacity-50">
          <Lilies maxCount={8} minSize={250} maxSize={320} />
        </div>
      </div>

      {/* All interactive content stays above the background */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        {/* Heading */}
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          className="mb-9 md:mb-12"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-4 py-2">
            <BriefcaseBusiness size={14} className="text-blue-300" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200 sm:text-xs">
              My professional journey
            </span>
          </div>

          <h2 className="text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-5xl md:text-7xl lg:text-8xl">
            WORK
            <br />
            <span className="bg-gradient-to-r from-blue-100 via-blue-400 to-violet-300 bg-clip-text text-transparent">
              EXPERIENCE.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
            Explore my professional journey, the projects I've contributed to,
            and the skills I've developed along the way.
          </p>
        </motion.header>

        {/* Career showcase */}
        <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 md:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.65fr)] md:gap-5">
          {/* Company selector */}
          <nav
            aria-label="Work experience"
            className="flex min-w-0 gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0"
          >
            {experience.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`group relative flex min-w-[220px] flex-1 items-center gap-3 overflow-hidden rounded-xl border p-3 text-left transition-colors duration-300 sm:p-4 md:min-w-0 md:flex-none ${
                    isActive
                      ? "border-blue-400/35 bg-blue-400/[0.09]"
                      : "border-white/[0.07] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="experience-active-indicator"
                      className="absolute inset-y-3 left-0 w-[2px] rounded-full bg-gradient-to-b from-blue-300 to-violet-400"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <div
                    className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border p-1.5 transition-colors duration-300 sm:h-12 sm:w-12 ${
                      isActive
                        ? "border-blue-400/25 bg-black/40"
                        : "border-white/[0.07] bg-black/30"
                    }`}
                  >
                    <Image
                      src={item.logo}
                      alt={`${item.title} logo`}
                      fill
                      sizes="48px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-[10px] font-semibold leading-5 tracking-wide sm:text-xs ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {item.title}
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-slate-500 sm:text-[10px]">
                      {item.date}
                    </p>
                  </div>

                  {isActive && (
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-blue-300"
                    />
                  )}
                </button>
              );
            })}

            <div className="hidden items-center gap-2 px-3 pt-3 text-[10px] uppercase tracking-[0.18em] text-slate-600 md:flex">
              <span className="h-px w-5 bg-blue-400/40" />
              Select an experience
            </div>
          </nav>

          {/* Fixed-height detail panel */}
          <div className="relative min-w-0">
            <div className="relative min-h-[470px] overflow-hidden rounded-2xl border border-[#050816]/[0.09] bg-[#080D20]/20 p-5 backdrop-blur-xl sm:h-[400px] sm:p-7 md:h-[440px] lg:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeExperience.title}
                  initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.22,
                    ease: "easeOut",
                  }}
                  className="flex h-full min-w-0 flex-col"
                >
                  {/* Role heading */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300 sm:text-[10px]">
                          0{activeIndex + 1} / 0{experience.length}
                        </span>

                        {activeExperience.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2 py-1 text-[8px] font-medium uppercase tracking-wider text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Current
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold leading-tight tracking-[-0.04em] sm:text-2xl lg:text-3xl">
                        {activeExperience.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-[10px] font-medium leading-5 tracking-[0.1em] text-blue-300 sm:text-xs">
                        {activeExperience.role}
                      </p>
                    </div>

                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] sm:flex">
                      <Code2 size={21} className="text-blue-300" />
                    </div>
                  </div>

                  <div className="my-5 h-px shrink-0 bg-gradient-to-r from-blue-400/40 via-white/[0.08] to-transparent" />

                  {/* Description */}
                  <p className="text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
                    {activeExperience.desc}
                  </p>

                  {/* Responsibilities */}
                  <div className="mt-5">
                    <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-300 sm:text-[10px]">
                      Key contributions
                    </p>

                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {activeExperience.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex min-w-0 items-start gap-2 text-[10px] leading-5 text-slate-400 sm:text-xs"
                        >
                          <Check
                            size={13}
                            className="mt-1 shrink-0 text-blue-400"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mt-auto pt-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles size={12} className="text-violet-300" />
                      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-[10px]">
                        Focus areas
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {activeExperience.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-blue-400/15 bg-blue-400/[0.05] px-2.5 py-1 text-[9px] text-blue-200/80 sm:text-[10px]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Small navigation indicator */}
            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-[10px] text-slate-600">
                {activeExperience.type}
              </p>

              <div className="flex items-center gap-1.5">
                {experience.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View ${item.title}`}
                    aria-pressed={activeIndex === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "w-6 bg-blue-400"
                        : "w-1.5 bg-slate-700 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing section navigation */}
      {/* <div className="relative z-10 flex w-full justify-center pt-7">
        <ScrollIndicator target={5.7} />
      </div> */}
    </section>
  );
}
