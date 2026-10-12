"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Command,
  Layers3,
  Sparkles,
  X,
} from "lucide-react";
import Lilies from "../Lilies";

const technologies = [
  {
    label: "HTML",
    icon: "/stack/html.png",
    category: "Frontend",
    description: "Building accessible, structured web experiences.",
    color: "#F97316",
  },
  {
    label: "Tailwind CSS",
    icon: "/stack/tailwind.png",
    category: "Frontend",
    description: "Creating responsive interfaces with utility-first styling.",
    color: "#38BDF8",
  },
  {
    label: "JavaScript",
    icon: "/stack/js.svg",
    category: "Frontend",
    description: "Bringing interfaces to life with interactive logic.",
    color: "#FACC15",
  },
  {
    label: "React",
    icon: "/stack/react.png",
    category: "Frontend",
    description: "Building reusable components and dynamic interfaces.",
    color: "#61DAFB",
  },
  {
    label: "Next.js",
    icon: "/stack/next.png",
    category: "Frontend",
    description: "Developing modern web applications with React.",
    color: "#FFFFFF",
  },
  {
    label: "Material UI",
    icon: "/stack/mui.png",
    category: "Frontend",
    description: "Designing interfaces with reusable UI components.",
    color: "#60A5FA",
  },
  {
    label: "Framer Motion",
    icon: "/stack/motion.png",
    category: "Frontend",
    description: "Creating expressive animations and fluid interactions.",
    color: "#C084FC",
  },
  {
    label: "Axios",
    icon: "/stack/axios.png",
    category: "Backend",
    description: "Connecting applications to APIs and external services.",
    color: "#A78BFA",
  },
  {
    label: "Git",
    icon: "/stack/git.png",
    category: "Tools",
    description: "Managing source code and development workflows.",
    color: "#FB923C",
  },
  {
    label: "Github",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791704724/733efeaa-0fe4-409c-a151-fa58a71c39a0.png",
    category: "Tools",
    description:
      "Hosting code repositories, tracking changes, and collaborating on development projects.",
    color: "#5c6bc0",
  },
  {
    label: "GitBucket",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791704810/550c7ef7-52a9-4b8a-9b69-15ebc8b386db.png",
    category: "Tools",
    description:
      "Managing Git repositories, tracking code changes, and collaborating on development projects.",
    color: "#146ce7",
  },
  {
    label: "Asana",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791704877/d68a602f-8ac3-40d3-be5e-a69c58a390c3.png",
    category: "Tools",
    description:
      "Organizing tasks, tracking project progress, and managing team workflows.",
    color: "#f95d8d",
  },
  {
    label: "Django",
    icon: "/stack/django.svg",
    category: "Backend",
    description: "Developing web applications with Python.",
    color: "#4ADE80",
  },
  {
    label: "Supabase",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791702621/055c15c9-0e2e-419a-a0e8-f34ace9de7ac.png",
    category: "Backend",
    description: "Developing web applications with Supabase.",
    color: "#4ADE80",
  },
  {
    label: "WordPress",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791700721/apps.31898.14617917549304865.1dd1f9e4-4ec3-4498-a367-b039350f3a41.png",
    category: "CMS",
    description: "Building, customizing, and managing WordPress websites.",
    color: "#60A5FA",
  },
  {
    label: "PayMongo",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791700845/images.jpg",
    category: "Integrations",
    description: "Integrating online payment solutions into digital products.",
    color: "#818CF8",
  },
  {
    label: "Vercel",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791705040/c7f7ce4c-4e42-467a-8b52-0009f6e94095.png",
    category: "Integrations",
    description:
      "Deploying web applications and managing production builds with automated CI/CD workflows.",
    color: "#818CF8",
  },
  {
    label: "Google Analytics",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791700895/19d57d72-e8a0-4da2-8055-b128b9ee7a34.png",
    category: "Marketing",
    description: "Understanding website traffic and user behavior.",
    color: "#FBBF24",
  },
  {
    label: "Google Ads",
    icon: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791700791/google-ads-icon.webp",
    category: "Marketing",
    description: "Supporting digital campaigns and measuring performance.",
    color: "#34D399",
  },
];

const orbitPositions = technologies.map((_, index) => {
  const angle = (index / technologies.length) * Math.PI * 2 - Math.PI / 2;

  const radius = 42;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
});

type Tech = (typeof technologies)[number];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "CMS",
  "Marketing",
  "Tools",
  "Integrations",
];

export default function TechStack({ onClick }: { onClick?: () => void }) {
  const [selected, setSelected] = useState<Tech | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [spot, setSpot] = useState({ x: -1000, y: -1000 });

  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const filteredTechnologies = technologies
    .map((tech, index) => ({ tech, index }))
    .filter(
      ({ tech }) =>
        activeCategory === "All" || tech.category === activeCategory,
    );

  const handleSelect = (tech: Tech) => {
    setSelected((current) => (current?.label === tech.label ? null : tech));
    onClick?.();
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpot({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }}
      onMouseLeave={() => setSpot({ x: -1000, y: -1000 })}
      className="relative isolate w-full overflow-hidden rounded-[32px] px-4 py-16 text-white sm:px-8 md:px-12 md:py-24"
    >
      {/* Cursor spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at ${spot.x}px ${spot.y}px, rgba(59,130,246,0.12), transparent 72%)`,
        }}
      />

      {/* Technical grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-blue-600/[0.10] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-violet-600/[0.10] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-4 py-2">
              <Sparkles size={14} className="text-blue-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200 sm:text-xs">
                The digital ecosystem
              </span>
            </div>

            <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-6xl md:text-8xl">
              BEYOND
              <br />
              <span className="bg-gradient-to-r from-blue-100 via-blue-400 to-violet-300 bg-clip-text text-transparent">
                THE CODE.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
              A collection of technologies connecting ideas, design, and digital
              experiences.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 md:self-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            <div>
              <p className="text-xs font-medium text-slate-200">
                SYSTEM ONLINE
              </p>
              <p className="mt-1 text-[10px] tracking-wider text-slate-500">
                {technologies.length} TECHNOLOGIES CONNECTED
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:gap-12">
          {/* Orbital constellation */}
          <div className="relative mx-auto aspect-square w-full max-w-[620px]">
            <motion.div
              aria-hidden="true"
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={{
                duration: 100,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[8%] rounded-full border border-dashed border-blue-300/[0.15]"
            />

            <motion.div
              aria-hidden="true"
              animate={reducedMotion ? undefined : { rotate: -360 }}
              transition={{
                duration: 70,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[19%] rounded-full border border-violet-300/[0.15]"
            />

            <div className="absolute inset-[29%] rounded-full border border-white/[0.07]" />

            {/* Constellation connections */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {orbitPositions.map((point, index) => {
                const tech = technologies[index];

                return (
                  <motion.line
                    key={tech.label}
                    x1="50"
                    y1="50"
                    x2={50 + point.x}
                    y2={50 + point.y}
                    stroke={
                      selected?.label === tech.label ? tech.color : "#6685C7"
                    }
                    strokeWidth={selected?.label === tech.label ? 0.45 : 0.12}
                    strokeOpacity={selected?.label === tech.label ? 0.9 : 0.35}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reducedMotion ? 0 : 1,
                      delay: reducedMotion ? 0 : index * 0.045,
                    }}
                  />
                );
              })}
            </svg>

            {/* Core */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 16,
              }}
              className="absolute left-1/2 top-1/2 z-10 flex h-[27%] w-[27%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue-300/30 bg-[#0b1731]/90 shadow-[0_0_55px_rgba(59,130,246,0.18)]"
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-blue-300/20" />

              <Command
                size={25}
                strokeWidth={1.3}
                className="mb-2 text-blue-300 sm:h-8 sm:w-8"
              />

              <span className="text-[8px] font-semibold tracking-[0.2em] text-blue-100 sm:text-[10px]">
                DEVELOPER
              </span>

              <span className="mt-1 text-[7px] tracking-widest text-slate-500 sm:text-[9px]">
                GENEVIEVE
              </span>
            </motion.div>
            {/* Technology nodes */}
            {filteredTechnologies.map(({ tech, index }, order) => {
              const point = orbitPositions[index];
              const isSelected = selected?.label === tech.label;

              return (
                <motion.button
                  key={tech.label}
                  type="button"
                  aria-label={`Explore ${tech.label}`}
                  aria-pressed={isSelected}
                  title={tech.label}
                  onClick={() => handleSelect(tech)}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={
                    reducedMotion ? undefined : { scale: 1.13, zIndex: 30 }
                  }
                  whileTap={{ scale: 0.94 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.45,
                    delay: reducedMotion ? 0 : order * 0.045,
                  }}
                  style={{
                    left: `${50 + (point?.x ?? 0)}%`,
                    top: `${50 + (point?.y ?? 0)}%`,
                    borderColor:
                      isSelected && tech?.color
                        ? tech.color
                        : "rgba(148,163,184,0.18)",
                    boxShadow:
                      isSelected && tech?.color
                        ? `0 0 28px ${tech.color}35`
                        : undefined,
                  }}
                  className={`group absolute z-20 flex h-[12%] w-[12%] min-w-10 max-w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border bg-[#0b1225]/95 p-2 backdrop-blur-xl transition-colors duration-300 sm:rounded-[22px] sm:p-3 ${
                    isSelected
                      ? "bg-[#142342]"
                      : "hover:border-blue-300/60 hover:bg-[#111d36]"
                  }`}
                >
                  <span
                    className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, ${tech.color}20, transparent 75%)`,
                    }}
                  />

                  <Image
                    src={tech.icon}
                    alt=""
                    width={80}
                    height={80}
                    unoptimized
                    className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]"
                  />

                  <span className="pointer-events-none absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#10182b] px-2 py-1 text-[9px] text-slate-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                    {tech.label}
                  </span>
                </motion.button>
              );
            })}

            {/* Floating particles */}
            <motion.div
              aria-hidden="true"
              animate={
                reducedMotion
                  ? undefined
                  : { y: [0, -9, 0], opacity: [0.5, 1, 0.5] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-[10%] top-[28%] h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_12px_#60a5fa]"
            />

            <motion.div
              aria-hidden="true"
              animate={
                reducedMotion
                  ? undefined
                  : { y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[20%] right-[13%] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_15px_#a78bfa]"
            />
          </div>

          {/* Technology explorer */}
          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.24em] text-slate-500">
                  EXPLORER / 001
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
                  Technology index
                </h3>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                <Layers3 size={19} className="text-blue-300" />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => {
                    setActiveCategory(category);
                    setSelected(null);
                  }}
                  className={`rounded-full border px-3 py-2 text-[10px] transition-all duration-200 sm:text-xs ${
                    activeCategory === category
                      ? "border-blue-400/40 bg-blue-400/10 text-blue-200"
                      : "border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Details */}
            <div className="relative min-h-[250px] overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.055] to-white/[0.015] p-5 sm:p-7">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/[0.08] blur-3xl" />

              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.label}
                    initial={
                      reducedMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 12,
                            filter: "blur(5px)",
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="relative"
                  >
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-[#0b1225] p-3"
                        style={{
                          borderColor: `${selected.color}50`,
                        }}
                      >
                        <Image
                          src={selected.icon}
                          alt={selected.label}
                          width={80}
                          height={80}
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <button
                        type="button"
                        aria-label="Close technology details"
                        onClick={() => setSelected(null)}
                        className="rounded-full border border-white/10 p-2 text-slate-500 transition hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <p
                      className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: selected.color }}
                    >
                      {selected.category} / SELECTED
                    </p>

                    <h4 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {selected.label}
                    </h4>

                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
                      {selected.description}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-xs text-slate-500">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: selected.color }}
                      />
                      Connected to your digital toolkit
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex min-h-[200px] flex-col justify-center"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/[0.07]">
                      <Code2 size={23} className="text-blue-300" />
                    </div>

                    <h4 className="text-xl font-medium text-white">
                      {activeCategory === "All"
                        ? "Explore the ecosystem."
                        : `Explore ${activeCategory}.`}
                    </h4>

                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-400">
                      Select any connected technology to discover how it fits
                      into my development and digital workflow.
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs text-blue-300/80">
                      <span>SELECT A NODE</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-2xl font-semibold tracking-tight text-white">
                  {String(filteredTechnologies.length).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-slate-500">
                  Visible nodes
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                <p className="text-2xl font-semibold tracking-tight text-white">
                  07
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-slate-500">
                  Skill categories
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer signature */}
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="text-[10px] tracking-[0.2em] text-slate-600">
            DESIGNED TO CONNECT IDEAS
          </p>

          <p className="text-xs text-slate-500">
            Development
            <span className="px-2 text-blue-400">/</span>
            Design
            <span className="px-2 text-blue-400">/</span>
            Digital growth
          </p>
        </div>
      </div>

      {/* Decorative lilies */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden opacity-50">
        <Lilies maxCount={8} minSize={250} maxSize={320} />
      </div>
    </section>
  );
}
