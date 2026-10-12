"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check, Copy, Mail } from "lucide-react";

import Lilies from "../Lilies";

const EMAIL = "p.gene.sagrado@gmail.com";

const socials = [
  {
    number: "01",
    label: "LINKEDIN",
    desc: "/in/sprincess-genevieve/",
    href: "https://www.linkedin.com/in/sprincess-genevieve/",
  },
  {
    number: "02",
    label: "GITHUB",
    desc: "SPrincessGenevieve",
    href: "https://github.com/SPrincessGenevieve",
  },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <footer
      id="contact"
      className="relative isolate w-full overflow-hidden bg-linear from-[#050918] to-transparent text-white"
    >
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/[0.10] blur-[130px]" />
        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-6 pt-20 sm:px-8 sm:pt-28 lg:px-14 lg:pt-36">
        {/* Section label */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 flex items-center justify-between gap-4 sm:mb-16"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[10px] font-medium tracking-[0.25em] text-white/65 sm:text-xs">
              THE NEXT CHAPTER STARTS HERE
            </span>
          </div>

          <span className="hidden font-mono text-[11px] tracking-widest text-white/30 sm:block">
            CONTACT / 001
          </span>
        </motion.div>

        {/* Editorial headline */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-300/80 sm:mb-6">
              Have a project in mind?
            </p>

            <h2 className="max-w-4xl text-[clamp(3.5rem,10vw,9rem)] font-light leading-[0.84] tracking-[-0.075em]">
              LET&apos;S
              <br />
              <span className="relative inline-block font-medium text-white">
                CONNECT
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-[2px] w-[62%] bg-gradient-to-r from-cyan-300 to-blue-500 sm:-bottom-4"
                />
              </span>
              <span className="ml-2 align-top text-3xl font-light tracking-normal text-cyan-300 sm:ml-4 sm:text-5xl">
                ↗
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.15 }}
            className="max-w-sm pb-1 lg:justify-self-end lg:pb-3"
          >
            <p className="text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Every meaningful project starts with a conversation. Have an idea,
              an opportunity, or simply want to say hello? I&apos;d love to hear
              from you.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs tracking-wide text-white/35">
              <span className="h-px w-8 bg-cyan-300/60" />
              OPEN TO NEW OPPORTUNITIES
            </div>
          </motion.div>
        </div>

        {/* Email contact panel */}
        <motion.button
          type="button"
          onClick={copyEmail}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          className="group relative mt-16 flex w-full flex-col gap-6 overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.035] p-5 text-left backdrop-blur-xl transition-colors duration-500 hover:border-cyan-300/40 hover:bg-white/[0.06] sm:mt-24 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8 lg:p-10"
          aria-label={`Copy email address ${EMAIL}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-300 via-blue-500 to-transparent opacity-70 transition-all duration-500 group-hover:w-1.5"
          />

          <div className="flex min-w-0 items-center gap-4 sm:gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-300/[0.08] text-cyan-200 transition-transform duration-500 group-hover:rotate-[-8deg] sm:h-16 sm:w-16">
              {copied ? (
                <Check size={23} strokeWidth={1.5} />
              ) : (
                <Mail size={23} strokeWidth={1.5} />
              )}
            </div>

            <div className="min-w-0">
              <p className="mb-2 text-[10px] tracking-[0.25em] text-white/40 sm:text-xs">
                {copied ? "SUCCESSFULLY COPIED" : "DROP ME A MESSAGE"}
              </p>

              <p className="break-all text-base font-light tracking-tight text-white transition-colors group-hover:text-cyan-100 sm:text-xl md:text-2xl lg:text-3xl">
                {EMAIL}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-4 border-t border-white/[0.09] pt-4 sm:justify-end sm:border-0 sm:pt-0">
            <span className="text-xs text-white/45 transition-colors group-hover:text-white/80">
              {copied ? "Copied to clipboard" : "Copy email address"}
            </span>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10 group-hover:text-cyan-200">
              {copied ? <Check size={17} /> : <Copy size={16} />}
            </span>
          </div>
        </motion.button>

        {/* Social destinations */}
        <div className="mt-16 grid grid-cols-1 border-t border-white/10 sm:mt-20 sm:grid-cols-2">
          {socials.map((social, index) => (
            <motion.div
              key={social.label}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: shouldReduceMotion ? 0 : index * 0.12,
              }}
              className={
                index === 0
                  ? "border-b border-white/10 sm:border-b-0 sm:border-r sm:border-white/10"
                  : ""
              }
            >
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[108px] items-center justify-between gap-4 py-6 sm:px-6 sm:py-8 lg:px-8"
              >
                <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                  <span className="font-mono text-[10px] text-white/30">
                    {social.number}
                  </span>

                  <div className="min-w-0">
                    <p className="mb-2 text-[10px] tracking-[0.25em] text-white/40">
                      {social.label}
                    </p>
                    <p className="truncate text-sm text-white/80 transition-colors duration-300 group-hover:text-cyan-200 sm:text-base">
                      {social.desc}
                    </p>
                  </div>
                </div>

                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-cyan-300/40 group-hover:text-cyan-200">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Closing signature */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-8"
        >
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white/70">
              THANK YOU FOR STOPPING BY.
            </p>
            <p className="mt-2 text-xs text-white/35">
              One conversation can lead somewhere extraordinary.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: shouldReduceMotion ? "auto" : "smooth",
              })
            }
            className="group flex w-fit items-center gap-3 py-2 text-xs tracking-widest text-white/50 transition-colors hover:text-cyan-200"
          >
            BACK TO TOP
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all group-hover:-translate-y-1 group-hover:border-cyan-300/40">
              <ArrowDownRight size={15} className="rotate-[-135deg]" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Existing lily decoration */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden opacity-40">
        <Lilies maxCount={8} minSize={250} maxSize={320} />
      </div>
    </footer>
  );
}
