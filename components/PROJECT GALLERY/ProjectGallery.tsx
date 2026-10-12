"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Copy,
  ExternalLink,
  KeyRound,
  Play,
  Sparkles,
} from "lucide-react";
import ScrollIndicator from "@/components/ScrollIndicator";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  href: string;
  imageUrl?: string;
  overlayImage: string;
  tags: string[];
  featured?: boolean;
  demoCredentials?: {
    email: string;
    password: string;
  };
};

const projects: Project[] = [
  {
    number: "01",
    title: "WebMakePH Business Website",
    category: "WEB DESIGN & DEVELOPMENT",
    description:
      "A custom-designed business website for WebMakePH, showcasing its web design and development services, tailored website packages, and creative portfolio. Built with Next.js and responsive UI components, the platform features interactive project showcases, service information, lead-generating contact forms, and free website audit requests to help businesses establish a professional online presence and connect with potential clients.",
    href: "https://webmakeph.online/",
    overlayImage:
      "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791738434/10d7d29b-a337-482b-88f3-6633ded51bd7.png",
    tags: [
      "Next.js",
      "Responsive Web Design",
      "Portfolio",
      "Lead Generation",
      "Contact Forms",
      "UI/UX Design",
    ],
    featured: true,
  },

  {
    number: "02",
    title: "WebMakePH Admin Web",
    category: "BUSINESS MANAGEMENT & ADMINISTRATION",
    description:
      "A centralized business administration platform built for WebMakePH to manage the entire client workflow, from lead tracking and client records to quotations, invoicing, payment processing, project management, scheduling, and website form submissions. Featuring secure administrator authentication, Supabase integration, and an integrated PayMongo payment workflow, the platform streamlines business operations through a unified dashboard.",
    href: "https://admin-dev.webmakeph.online/",
    overlayImage:
      "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791736874/cb077027-7f56-4d69-84f3-02136a4e53dc.png",
    tags: [
      "Admin Dashboard",
      "Next.js",
      "Supabase",
      "PayMongo",
      "Business Management",
      "Full-Stack Web App",
    ],
    featured: true,

    demoCredentials: {
      email: "admin@demo.local",
      password: "ThisIsATest123",
    },
  },
  {
    number: "03",
    title: "Government Administration System",
    category: "GOVERNMENT & PUBLIC SERVICE",
    description:
      "A government-focused web platform designed to support administrative operations, organize public service information, and provide a more accessible digital experience for its intended users.",
    href: "https://admin-system-webmakeph.vercel.app/",
    overlayImage:
      "https://res.cloudinary.com/bs2vsg8c/image/upload/v1791010584/gov.png",
    tags: [
      "Admin Dashboard",
      "Government",
      "Admin Dashboard",
      "Next.js",
      "Supabase",
      "Full-Stack Web App",
    ],
    featured: true,

    demoCredentials: {
      email: "admin@demo.local",
      password: "ThisIsATest123",
    },
  },

  {
    number: "04",
    title: "FlowChat Learning",
    category: "VIRTUAL ASSISTANT TRAINING",
    description:
      "A training experience focused on learning progress, certification, and a more accessible interface for virtual assistant education.",
    href: "https://flowchat-coral.vercel.app/",
    overlayImage:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779416114/flowchat_y14hid.png",
    tags: ["Learning", "Certification", "UI/UX"],
  },
  {
    number: "05",
    title: "Ducts All Done",
    category: "LANDING PAGE DESIGN",
    description:
      "A conversion-focused landing page for an HVAC and air duct cleaning business, designed to showcase its services, communicate value, and encourage potential customers to request a service.",
    href: "https://ducts-all-done-web.vercel.app/",
    overlayImage:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1773992360/dirty-vent_e9imih.png",
    tags: ["Landing Page", "Web Design", "Lead Generation"],
    featured: true,
  },
  {
    number: "06",
    title: "Investment Dashboard",
    category: "FINANCIAL WEB APPLICATION",
    description:
      "A wine investment dashboard with data-focused interfaces for presenting investment information, charts, and portfolio activity.",
    href: "https://youtu.be/c6aMji51xm0",
    imageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779338510/line-chart_jttymq.png",
    overlayImage:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779340887/wine-bottle_g6h0bk.png",
    tags: ["Dashboard", "Analytics", "Investment"],
  },
  {
    number: "07",
    title: "Mobile Investment App",
    category: "MOBILE APPLICATION",
    description:
      "A mobile-first investment experience built around accessible information, responsive layouts, and a streamlined interface.",
    href: "https://www.youtube.com/shorts/WAjTQF2T0xc",
    imageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779338510/line-chart_jttymq.png",
    overlayImage:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779416964/wine-bottles_uehxfu.png",
    tags: ["Mobile App", "Investment", "UI/UX"],
    featured: true,
  },
  {
    number: "08",
    title: "Affiliate Management",
    category: "ADMINISTRATION PORTAL",
    description:
      "An affiliate management interface focused on organizing tracking information, reporting, and management workflows.",
    href: "https://www.youtube.com/watch?v=w7QSPf53hZM",
    imageUrl:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779338510/line-chart_jttymq.png",
    overlayImage:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779418859/affiliate_h2fvra.png",
    tags: ["Admin Portal", "Tracking", "Reporting"],
  },
  {
    number: "09",
    title: "Web Monitoring",
    category: "MONITORING & ANALYTICS",
    description:
      "A monitoring and analytics project focused on presenting operational information in a clear, organized dashboard experience.",
    href: "https://youtu.be/JbM2V3H1_XQ",
    overlayImage:
      "https://res.cloudinary.com/dqgkvrmve/image/upload/v1779419617/green_bqhrgu.png",
    tags: ["Analytics", "Monitoring", "Dashboard"],
    featured: true,
  },
];

export default function ProjectGallery() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-transparent px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Editorial heading */}
        <div className="mb-20 grid gap-8 border-b border-white/10 pb-10 md:mb-28 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-blue-400" />
              <span className="text-xs font-semibold tracking-[0.32em] text-blue-300">
                SELECTED WORK / 2024—2026
              </span>
            </motion.div>

            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl"
            >
              Things I&apos;ve
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                brought to life.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-xs md:pb-2"
          >
            <p className="text-sm leading-7 text-slate-400 sm:text-base">
              A collection of web experiences, applications, and digital
              solutions built through design, development, and problem-solving.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs tracking-widest text-slate-500">
              <Sparkles size={14} className="text-blue-300" />
              <span>{String(projects.length).padStart(2, "0")} PROJECTS</span>
            </div>
          </motion.div>
        </div>

        {/* Asymmetric editorial project list */}
        <div className="space-y-24 sm:space-y-32 lg:space-y-40">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;

            return (
              <motion.article
                key={project.number}
                initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  ease: "easeOut",
                }}
                className="group"
              >
                <div
                  className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                    reversed ? "lg:[&>.project-copy]:order-2" : ""
                  }`}
                >
                  {/* Project preview */}
                  <div
                    className={`lg:col-span-7 ${
                      reversed ? "lg:col-start-6" : "lg:col-start-1"
                    }`}
                  >
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} project`}
                      className="project-preview relative block overflow-hidden rounded-2xl border border-white/10 bg-[#0a1023] outline-none transition-colors duration-500 hover:border-blue-400/40 focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      {/* Preview canvas */}
                      <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/10]">
                        {project.imageUrl && (
                          <Image
                            src={project.imageUrl}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
                          />
                        )}

                        <div
                          aria-hidden="true"
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(15, 23, 55, 0.35), rgba(5, 8, 22, 0.45))",
                          }}
                        />

                        {/* Soft color wash */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
                          style={{
                            background:
                              "radial-gradient(ellipse at 50% 45%, rgba(59, 91, 220, 0.22), transparent 65%)",
                          }}
                        />

                        {/* Project image */}
                        <div className="absolute inset-4 flex items-center justify-center sm:inset-8">
                          <Image
                            src={project.overlayImage}
                            alt={`${project.title} project preview`}
                            fill
                            sizes="(max-width: 1024px) 90vw, 52vw"
                            className="object-contain p-1 drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-3"
                          />
                        </div>

                        {/* Index marker */}
                        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#050816]/75 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6">
                          <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-300">
                            PROJECT
                          </span>
                          <span className="text-xs tabular-nums text-white">
                            {project.number}
                          </span>
                        </div>

                        {/* Interactive demo action */}
                        <div className="absolute bottom-4 right-4 z-10 sm:bottom-6 sm:right-6">
                          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white text-[#050816] shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-300 sm:h-14 sm:w-14">
                            <Play
                              size={18}
                              fill="currentColor"
                              className="ml-0.5"
                            />
                          </span>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 z-[5] flex items-end justify-between bg-gradient-to-t from-[#050816]/85 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-7">
                          <span className="text-xs font-medium tracking-wide text-white">
                            Explore project
                          </span>
                          <ArrowUpRight size={20} className="text-blue-300" />
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Project information */}
                  <div
                    className={`project-copy lg:col-span-5 ${
                      reversed
                        ? "lg:col-start-1 lg:row-start-1"
                        : "lg:col-start-8"
                    }`}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-sm font-medium tabular-nums text-blue-300">
                        {project.number}
                      </span>
                      <span className="h-px w-8 bg-white/20" />
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 sm:text-xs">
                        {project.category}
                      </span>
                    </div>

                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    >
                      <h3 className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-blue-200 sm:text-4xl lg:text-5xl">
                        {project.title}
                        <ArrowUpRight
                          size={24}
                          className="ml-2 inline-block align-top text-blue-300 opacity-60 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 sm:h-7 sm:w-7"
                        />
                      </h3>
                    </a>

                    <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                      {project.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[11px] tracking-wide text-slate-300 transition-colors duration-300 group-hover:border-blue-300/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.demoCredentials && (
                      <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-400/[0.04] p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-400/10">
                            <KeyRound size={18} className="text-blue-300" />
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              Try the live demo
                            </h4>
                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              Use these demo credentials to explore the
                              application.
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 space-y-3">
                          {(
                            [
                              {
                                label: "DEMO EMAIL",
                                value: project.demoCredentials.email,
                              },
                              {
                                label: "DEMO PASSWORD",
                                value: project.demoCredentials.password,
                              },
                            ] as const
                          ).map((credential) => (
                            <div key={credential.label}>
                              <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-slate-500">
                                {credential.label}
                              </p>

                              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-[#050816]/70 px-3 py-3">
                                <code className="min-w-0 flex-1 break-all text-xs text-slate-200 sm:text-sm">
                                  {credential.value}
                                </code>

                                <button
                                  type="button"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      credential.value,
                                    )
                                  }
                                  aria-label={`Copy ${credential.label.toLowerCase()}`}
                                  title="Copy to clipboard"
                                  className="shrink-0 rounded-lg border border-white/10 p-2 text-slate-400 transition-colors hover:border-blue-300/40 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                >
                                  <Copy size={15} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="mt-4 text-[11px] leading-5 text-slate-500">
                          Demo account only. Please do not enter sensitive
                          personal information.
                        </p>
                      </div>
                    )}

                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-3 border-b border-white/15 pb-2 text-sm font-medium text-white transition-colors duration-300 hover:border-blue-300 hover:text-blue-300"
                    >
                      View project walkthrough
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Closing detail */}
        <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-7 sm:mt-32">
          <p className="text-xs tracking-wide text-slate-500">
            DESIGNED WITH INTENTION. BUILT WITH PURPOSE.
          </p>
          <ArrowDownRight size={20} className="text-blue-300" />
        </div>
      </div>

      <ScrollIndicator target={16.5} />
    </section>
  );
}
