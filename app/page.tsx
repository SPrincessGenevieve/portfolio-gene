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
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Home() {
  // ✅ FIX: correct typing
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  // Section observer

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        // Distance between the viewport center and this section
        let distance = 0;

        if (viewportCenter < rect.top) {
          distance = rect.top - viewportCenter;
        } else if (viewportCenter > rect.bottom) {
          distance = viewportCenter - rect.bottom;
        }

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveSection(closestIndex);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  // Background colors
  const backgroundColors = [
    "#32389A", // Intro — vibrant indigo blue
    "#173882", // About Me — deep blue
    "#10165C", // Tech Stack — midnight blue
    "#0B1045", // Work Experience — dark navy
    "#081244", // Projects — deep navy
    "#080C25", // Footer — near black
  ];
  const backgroundStyle = {
    backgroundColor: backgroundColors[activeSection],
    transition: "background-color 0.6s ease-in-out",
  };

  return (
    <div
      className="relative  min-h-screen overflow-hidden w-full font-sans"
      style={backgroundStyle}
    >
      {/* Background FX */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <GlowingOrbs />
        <div className="absolute inset-0" />
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
                top: window.innerHeight * 2.5, // section index
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
          <ScrollIndicator target={4.5}></ScrollIndicator>
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
                top: window.innerHeight * 7, // section index
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
          <ProjectGallery />
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
