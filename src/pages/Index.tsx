import React, { useEffect } from "react";
import Lenis from "lenis";
import HeroSection from "@/components/HeroSection";
import SelectedWorks from "@/components/SelectedWorks";
import WorkExperience from "@/components/WorkExperience";
import StackTeaser from "@/components/StackTeaser";
import WritingTeaser from "@/components/WritingTeaser";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <SelectedWorks />
      <WorkExperience />
      <StackTeaser />
      <WritingTeaser />
      <Certifications />
      <Footer />
    </div>
  );
};

export default Index;
