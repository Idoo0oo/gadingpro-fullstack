// gadingpro-fullstack/gadingpro-frontend/src/pages/HomePage.jsx
import React, { useState } from "react";

// Import components (semua dari src/components)
import FaqComponent from "../components/FaqComponent";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import ProjectByLocationSection from "../components/ProjectByLocationSection";
import TestimonialSection from "../components/TestimonialSection";
import KPRCalculatorSection from "../components/KPRCalculatorSection";

const HomePage = () => {

  return (
    <div className="homepage">
      {/* Menggunakan komponen-komponen yang telah dipisahkan */}
      <HeroSection />
      <ProjectsSection />
      <ProjectByLocationSection />
      <TestimonialSection />
      <KPRCalculatorSection />
      <FaqComponent />
    </div>
  );
};

export default HomePage;