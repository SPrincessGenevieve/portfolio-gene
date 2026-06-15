"use client";

import { useEffect, useRef, useState } from "react";
import Intro from "@/components/PAGE 1/intro";
import GlowingOrbs from "@/components/GlowingOrbs";
import SwimmingFish from "@/components/SwimmingFish";
import AboutMe from "@/components/PAGE 2/AboutMe";
import TechStack from "@/components/PAGE 3/TechStack";
import WorkExperience from "@/components/PAGE 4/WorkExperience";
import Footer from "@/components/FOOTER/footer";
import ProjectGallery from "@/components/PROJECT GALLERY/ProjectGallery";
import { MouseIcon } from "lucide-react";

export default function Home() {
  const ref = useRef<any>(null);

  // ✅ FIX: correct typing
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  // Ripple
  useEffect(() => {
    let $: any;
    const loadRipples = async () => {
      const jquery = await import("jquery");
      await import("jquery.ripples");
      $ = jquery.default;

      $(".bg-ripple").ripples({
        resolution: 756,
        perturbance: 0.01,
      });
    };
    loadRipples();
  }, []);

  // Section observer
  useEffect(() => {
    const timeout = setTimeout(() => {
      const sections = sectionRefs.current.filter(Boolean);

      const observers: IntersectionObserver[] = [];

      sections.forEach((section, index) => {
        if (!section) return; // ✅ IMPORTANT

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setActiveSection(index);
            }
          },
          { threshold: 0.6 },
        );

        observer.observe(section); // ✅ now safe
      });

      return () => {
        observers.forEach((o) => o.disconnect());
      };
    }, 500); // 👈 IMPORTANT: wait for DOM

    return () => clearTimeout(timeout);
  }, []);

  // Background colors
  const backgroundColors = [
    "#32389a", // Intro
    "#040847", // AboutMe
    "#040847", // TechStack
    "#040847", // WorkExperience
    "#000000", // Projects
    "#000000", // Footer
  ];

  const backgroundStyle = {
    backgroundColor: backgroundColors[activeSection],
    transition: "background-color 0.6s ease-in-out",
  };

  return (
    <div
      className="relative bg-ripple min-h-screen overflow-hidden w-full font-sans"
      style={backgroundStyle}
    >
      {/* Background FX */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GlowingOrbs />
        <div className="absolute inset-0 bg-blue-800/40" />
        {/* <SwimmingFish /> */}
      </div>

      {/* CONTENT */}
      <div className="relative w-full z-10">
        {/* Intro */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[0] = el;
            }
          }}
          className="min-h-screen relative flex items-center justify-center"
        >
          <Intro
            contact={() =>
              window.scrollTo({
                top: window.innerHeight * 6, // section index
                behavior: "smooth",
              })
            }
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 1, // section index
                behavior: "smooth",
              })
            }
          />
        </section>

        {/* About Me */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[1] = el;
            }
          }}
          className="min-h-screen relative flex items-center justify-center"
        >
          <AboutMe
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 2, // section index
                behavior: "smooth",
              })
            }
          />
        </section>

        {/* Tech Stack */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[2] = el;
            }
          }}
          className="min-h-screen relative flex flex-col items-center justify-center"
        >
          <TechStack />
          {/* ================= MOUSE ================= */}
          <div className="w-full h-40 flex items-center justify-center">
            <MouseIcon
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight * 3, // section index
                  behavior: "smooth",
                })
              }
              size={50}
              strokeWidth={1}
              className="text-white z-80 cursor-pointer hover:scale-[1.2] duration-300 transition ease-in-out absolute bottom-10"
            />
          </div>
        </section>

        {/* Work Experience */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[3] = el;
            }
          }}
          className="min-h-screen relative flex items-center justify-center"
        >
          <WorkExperience
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 4, // section index
                behavior: "smooth",
              })
            }
          />
        </section>

        {/* Projects */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[4] = el;
            }
          }}
          className="min-h-screen relative flex items-center justify-center"
        >
          <ProjectGallery
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 5, // section index
                behavior: "smooth",
              })
            }
          />
        </section>

        {/* Footer */}
        <section
          ref={(el) => {
            if (el) {
              sectionRefs.current[5] = el;
            }
          }}
          className="min-h-screen relative flex items-center justify-center"
        >
          <Footer />
        </section>
      </div>
    </div>
  );
}
