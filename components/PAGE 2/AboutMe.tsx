"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2, Mouse } from "lucide-react";

import Lilies from "../Lilies";
import { Button } from "../ui/button";

export default function AboutMe({ onClick }: { onClick: () => void }) {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
      ease: "easeOut" as const,
    },
  });

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden  px-5 py-24 text-white sm:px-8 md:px-12 lg:px-16">
      {/* Ambient background lighting */}

      {/* Subtle technical grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      {/* Lily decoration */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden opacity-60">
        <Lilies maxCount={8} minSize={250} maxSize={320} />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Portrait */}
        <motion.div
          {...reveal(0)}
          className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none"
        >
          {/* Outer glow */}
          <div className="pointer-events-none absolute h-[75%] w-[75%] rounded-full bg-[#0C1D74]/50 blur-[90px]" />

          {/* Decorative orbital rings */}
          <div className="pointer-events-none absolute h-[88%] w-[88%] rounded-full border border-white/[0.08]" />
          <div className="pointer-events-none absolute h-[72%] w-[72%] rounded-full border border-[#5575FF]/20" />

          {/* Image frame */}
          <div className="relative w-full max-w-[390px]">
            <div className="absolute -inset-3 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm" />

            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-[#0C1D74]/50 via-[#080D25] to-[#050816] p-3 shadow-[0_25px_100px_rgba(0,0,0,0.45)] sm:p-4">
              <Image
                src="https://res.cloudinary.com/dqgkvrmve/image/upload/v1779456528/me_kjagis.png"
                width={600}
                height={600}
                alt="Portrait of the developer"
                priority
                className="relative z-10 h-auto max-h-[52vh] w-full object-contain sm:max-h-[58vh]"
              />

              {/* Bottom image fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#050816]/50 to-transparent" />
            </div>

            {/* Floating role card */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : 0.65, duration: 0.5 }}
              className="absolute -bottom-6 -right-2 z-30 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#080D25]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-right-5 sm:px-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-[#0C1D74]/50">
                <Code2 size={20} className="text-blue-200" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Full-Stack Developer
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Building for the web
                </p>
              </div>
            </motion.div>

            {/* Decorative corner details */}
            <div className="absolute -left-5 -top-5 h-10 w-10 rounded-tl-2xl border-l border-t border-blue-300/50" />
            <div className="absolute -bottom-5 -right-5 h-10 w-10 rounded-br-2xl border-b border-r border-blue-300/50" />
          </div>
        </motion.div>

        {/* About content */}
        <div className="flex flex-col items-start gap-7 lg:py-8">
          {/* About heading and introduction */}
          <motion.div {...reveal(0.1)} className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-4 py-2">
              <Code2 size={14} className="text-blue-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200 sm:text-xs">
                A little about me
              </span>
            </div>

            <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.07em] sm:text-6xl md:text-8xl">
              BEHIND
              <br />
              <span className="bg-gradient-to-r from-blue-100 via-blue-400 to-violet-300 bg-clip-text text-transparent">
                THE BUILD.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
              Turning ideas into responsive interfaces and meaningful digital
              experiences through thoughtful design and development.
            </p>
          </motion.div>
          {/* About description */}
          <motion.div {...reveal(0.2)} className="max-w-2xl">
            <p className="text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
              I&apos;m a{" "}
              <span className="font-medium text-white">
                Full-Stack Developer
              </span>{" "}
              with 2+ years of experience, primarily focused on frontend
              development using{" "}
              <span className="font-medium text-blue-200">
                React and Next.js
              </span>
              .
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              I enjoy transforming UI/UX designs into responsive,
              high-performance interfaces. I also work with backend integrations
              and APIs to bring complete web experiences to life.
            </p>
          </motion.div>
          {/* Skill highlights */}
          <motion.div
            {...reveal(0.3)}
            className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors duration-300 hover:border-blue-400/30 hover:bg-[#0C1D74]/20">
              <p className="text-sm font-medium text-white">
                Frontend Development
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                Responsive interfaces, UI implementation, and user experience.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-colors duration-300 hover:border-blue-400/30 hover:bg-[#0C1D74]/20">
              <p className="text-sm font-medium text-white">
                Backend Integration
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                APIs, data connections, and application functionality.
              </p>
            </div>
          </motion.div>
          {/* Resume action */}
          <motion.div
            {...reveal(0.4)}
            className="flex w-full flex-col items-start gap-4 pt-1 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button
              asChild
              className="group h-12 rounded-xl border border-blue-300/20 bg-[#0C1D74] px-6 text-sm font-medium tracking-wide text-white shadow-[0_8px_30px_rgba(12,29,116,0.3)] transition-all duration-300 hover:bg-[#1735A0] hover:shadow-[0_8px_35px_rgba(12,29,116,0.5)]"
            >
              <Link
                href="/Princess_Genevieve_Sagrado_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOWNLOAD RESUME
                <ArrowUpRight
                  size={17}
                  className="ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Button>
            <Button
              asChild
              className="group h-12 rounded-xl border border-blue-300/20 bg-[#0C1D74] px-6 text-sm font-medium tracking-wide text-white shadow-[0_8px_30px_rgba(12,29,116,0.3)] transition-all duration-300 hover:bg-[#1735A0] hover:shadow-[0_8px_35px_rgba(12,29,116,0.5)]"
            >
              <Link
                href="/Princess_Genevieve_Sagrado_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOWNLOAD CV
                <ArrowUpRight
                  size={17}
                  className="ml-2 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Button>

            <span className="text-xs tracking-wide text-slate-500">
              Always learning. Always building.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
