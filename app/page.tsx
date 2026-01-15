"use client";
import { useEffect, useRef, useState } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Intro from "@/components/PAGE 1/intro";
import GlowingOrbs from "@/components/GlowingOrbs";
import SwimmingFish from "@/components/SwimmingFish";
import AboutMe from "@/components/PAGE 2/AboutMe";
import TechStack from "@/components/PAGE 3/TechStack";
import WorkExperience from "@/components/PAGE 4/WorkExperience";
import { Label } from "@/components/ui/label";
import VintageWeb from "@/components/PROJECTS/VintageWeb";
import VintageMobile from "@/components/PROJECTS/VintageMobile";
import VintageAdminWeb from "@/components/PROJECTS/VintageAdminWeb";
import GreenWeb from "@/components/PROJECTS/GreenWeb";
import Footer from "@/components/FOOTER/footer";
import VintageAffiliate from "@/components/PROJECTS/VintageAffiate";

export default function Home() {
  const ref = useRef<any>(null);
  const [displayDarkness, setDisplayDarkness] = useState(0);
  console.log("IS IN VIEW: ", ref);

  // Handle Ripple Init
  useEffect(() => {
    let $: any;
    const loadRipples = async () => {
      const jquery = await import("jquery");
      await import("jquery.ripples");
      $ = jquery.default;
      $(".bg-ripple").ripples({ resolution: 756, perturbance: 0.01 });
    };
    loadRipples();
  }, []);

  // Update darkness based on parallax scroll
  useEffect(() => {
    const container = ref.current?.container?.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollOffset = ref.current.current || 0;
      // Normalize offset (0 to 1) based on total pages
      const targetDarkness = Math.min(scrollOffset / 3, 1);
      setDisplayDarkness(targetDarkness);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const interpolateColor = (d: number) => {
    const lerp = (a: number, b: number) => a + (b - a) * d;
    const darkRGB = [4, 8, 71]; // dark blue
    const lightRGB = [50, 56, 154]; // light blue
    return `rgb(${Math.round(lerp(lightRGB[0], darkRGB[0]))}, 
                ${Math.round(lerp(lightRGB[1], darkRGB[1]))}, 
                ${Math.round(lerp(lightRGB[2], darkRGB[2]))})`;
  };

  const backgroundStyle = {
    backgroundColor: interpolateColor(displayDarkness),
    transition: "background-color 0.5s ease-in-out", // smooth transition
  };

  return (
    <div
      className="relative bg-ripple min-h-screen  w-full h-full font-sans"
      style={backgroundStyle}
    >
      {/* Keep fish and orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GlowingOrbs />
        <SwimmingFish />
      </div>

      <Parallax pages={9.6} ref={ref}>
        <ParallaxLayer
          offset={0}
          speed={1}
          className="flex items-center justify-center bg-linear-to-t/srgb from-[#04084700] from-10% via-[#0408479d] via-50% to-[#04084700]"
        >
          <Intro
            contact={() => ref.current?.scrollTo(9)}
            onClick={() => ref.current?.scrollTo(1)}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <AboutMe onClick={() => ref.current?.scrollTo(2)} />
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.5}>
          <TechStack onClick={() => ref.current?.scrollTo(3)}></TechStack>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.5}>
          <WorkExperience
            onClick={() => ref.current?.scrollTo(4)}
          ></WorkExperience>
        </ParallaxLayer>
        <ParallaxLayer offset={4} speed={0.5}>
          <VintageWeb onClick={() => ref.current?.scrollTo(5)}></VintageWeb>
        </ParallaxLayer>
        <ParallaxLayer offset={5} speed={0.5}>
          <VintageMobile
            onClick={() => ref.current?.scrollTo(6)}
          ></VintageMobile>
        </ParallaxLayer>
        <ParallaxLayer offset={6} speed={0.5}>
          <VintageAdminWeb
            onClick={() => ref.current?.scrollTo(7)}
          ></VintageAdminWeb>
        </ParallaxLayer>
        <ParallaxLayer offset={7} speed={0.5}>
          <VintageAffiliate
            onClick={() => ref.current?.scrollTo(8)}
          ></VintageAffiliate>
        </ParallaxLayer>
        <ParallaxLayer offset={8} speed={0.5}>
          <GreenWeb onClick={() => ref.current?.scrollTo(9)}></GreenWeb>
        </ParallaxLayer>
        <ParallaxLayer offset={9} speed={0.4} factor={1}>
          <Footer></Footer>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
