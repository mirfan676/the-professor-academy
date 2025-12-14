import React from "react";
import useSEO from "../hooks/useSEO";  // <-- REQUIRED IMPORT

import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import BranchesSection from "../components/sections/BranchesSection";
import FAQSection from "../components/sections/FAQSection";
import FooterCTA from "../components/sections/FooterCTA";

const Home = () => {

  useSEO({
    title: "A Plus Home Tutors — Trusted Home & Online Tuition in Pakistan",
    description:
      "Pakistan’s trusted platform for home and online tuition — connecting students with expert tutors for O/A Levels, Matric, and Quran classes.",
    canonical: "https://www.aplusacademy.pk/",
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
