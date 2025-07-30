// gadingpro-fullstack/gadingpro-frontend/src/components/ProjectsSection.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${backendUrl}/public/projects?_limit=3`;

        // Menambahkan header untuk melewati halaman peringatan Ngrok
        const response = await fetch(apiUrl, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!response.ok) {
          const errorResponseText = await response.text();
          throw new Error(
            `HTTP error! Status: ${
              response.status
            }. Details: ${errorResponseText.substring(0, 200)}`
          );
        }
        const data = await response.json();
        setProjects(data);
        } catch (error) {
        console.error("Error fetching projects for homepage:", error);
        setError(error.message); // Set state error
      } finally {
        // =================================================================
        // ==> INI PERBAIKAN KUNCINYA: HENTIKAN LOADING DI SINI <==
        setLoading(false);
        // =================================================================
      }
    };
    fetchProjects();
  }, []);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Ready Stock":
        return "bg-success";
      case "Launching":
        return "bg-primary";
      case "Pre-Launching":
        return "bg-warning text-dark";
      case "Sold Out":
        return "bg-danger";
      case "Under Construction":
        return "bg-info text-dark";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <section className="projects py-5 bg-light text-center">
        Memuat proyek terbaru...
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects py-5 bg-light text-center text-danger">
        Error memuat proyek: {error}
      </section>
    );
  }

  return (
    <section id="project" className="projects py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h2 className="fw-bold mb-3">Projects Terbaru</h2>
              <p
                className="text-muted mx-auto text-center"
                style={{ maxWidth: "600px" }}
              >
                Temukan hunian impian Anda dengan berbagai pilihan perumahan
                modern dan strategis
              </p>
            </div>
          </Col>
        </Row>

        {/* Projects Grid */}
        <Row className="g-4 mb-5">
          {projects.map((project, index) => (
            <Col key={project.id} lg={4} md={6} className="mb-4">
              <ProjectCard project={project} index={index} />
            </Col>
          ))}
        </Row>

        {/* View All Button */}
        <Row>
          <Col className="text-center">
            <button
              className="btn btn-outline-orange btn-lg rounded-5 px-5 py-3"
              onClick={() => navigate("/projects")}
            >
              Lihat Semua Projects
              <i className="fa-solid fa-chevron-right ms-2"></i>
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProjectsSection;
