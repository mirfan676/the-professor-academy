import React from "react";
import useSEO from "../hooks/useSEO";  // <-- REQUIRED IMPORT

import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import BranchesSection from "../components/sections/BranchesSection";
import FAQSection from "../components/sections/FAQSection";
import FooterCTA from "../components/sections/FooterCTA";

const Home = () => {

  useSEO({
    title: "The Professor Academy — Specialist Tutors for O/A Levels, K-12, and all subjects",
    description:
      "Pakistan’s Top Home Tuition Network — connecting students with Specialist tutors for O/A Levels, k-12, and all subjects.",
    canonical: "https://www.theprofessoracademy.com/",
  });

  return (
    <>
      <HeroSection />
      <AboutSection/>
      <BranchesSection/>
      <FAQSection />
      <FooterCTA />
    </>
  );
};

export default Home;
