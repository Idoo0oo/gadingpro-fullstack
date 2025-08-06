// gadingpro-fullstack/gadingpro-frontend/src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";

// Import components (semua dari src/components)
import FaqComponent from "../components/FaqComponent";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import ProjectByLocationSection from "../components/ProjectByLocationSection";
import TestimonialSection from "../components/TestimonialSection";
import KPRCalculatorSection from "../components/KPRCalculatorSection";

const HomePage = () => {

  // State untuk menyimpan semua data proyek
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${backendUrl}/public/projects`;

        const response = await fetch(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!response.ok) {
          throw new Error("Gagal mengambil data proyek");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects for location section:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProjects();
  }, []);

  return (
    <div className="homepage">
      {/* Menggunakan komponen-komponen yang telah dipisahkan */}
      <HeroSection />
      <ProjectsSection />
      <ProjectByLocationSection projects={projects} loading={loading} />
      <TestimonialSection />
      <KPRCalculatorSection />
      <FaqComponent />
    </div>
  );
};

export default HomePage;