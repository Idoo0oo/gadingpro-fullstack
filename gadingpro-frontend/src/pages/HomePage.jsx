// gadingpro-fullstack/gadingpro-frontend/src/pages/HomePage.jsx
import React, { useState } from "react";

// Import components (semua dari src/components)
import FaqComponent from "../components/FaqComponent";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import ProjectByLocationSection from "../components/ProjectByLocationSection";
import TestimonialSection from "../components/TestimonialSection";
import KPRCalculatorSection from "../components/KPRCalculatorSection";
import ProjectDetailModal from "../components/ProjectDetailModal"; // Menggunakan ProjectDetailModal

const HomePage = () => {
  // State untuk Modal (tetap di HomePage karena data selectedProject dan showModal memengaruhi modal)
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Function untuk handle modal (tetap di HomePage karena memengaruhi state di HomePage)
  const handleShowModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="homepage">
      {/* Menggunakan komponen-komponen yang telah dipisahkan */}
      <HeroSection />
      <ProjectsSection handleShowModal={handleShowModal} />
      <ProjectByLocationSection />
      <TestimonialSection />
      <KPRCalculatorSection />
      <FaqComponent />

      {/* Modal Detail Properti */}
      <ProjectDetailModal // Menggunakan ProjectDetailModal
        project={selectedProject} // Ganti selectedProject menjadi project sesuai props
        showModal={showModal} // Ganti show menjadi showModal sesuai props
        handleCloseModal={handleCloseModal} // Ganti onHide menjadi handleCloseModal sesuai props
      />
    </div>
  );
};

export default HomePage;