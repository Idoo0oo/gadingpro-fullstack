// gadingpro-fullstack/gadingpro-frontend/src/components/ProjectsSection.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProjectsSection = ({ handleShowModal }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // --- START BLOK LOGIKA URL DINAMIS ---
        const currentOrigin = window.location.origin; // e.g., http://localhost:5173 atau https://70x90zx-5173.devtunn.ms
        let backendBaseUrl;

        // Deteksi jika kita berada di lingkungan devtunnels atau Vercel Preview
        if (currentOrigin.includes('.devtunn.ms') || currentOrigin.includes('.vercel.app')) {
          const backendPort = import.meta.env.VITE_APP_BACKEND_PORT; // Ambil port backend dari .env
          // Regex ini mengganti angka port di URL origin saat ini dengan port backend
          // Contoh: https://70x90zx-5173.devtunn.ms -> https://70x90zx-5000.devtunn.ms
          backendBaseUrl = currentOrigin.replace(/-\d+\.(devtunn\.ms|vercel\.app)$/, `-${backendPort}.$1`);
        } else {
          // Jika tidak di devtunnels, asumsikan localhost
          backendBaseUrl = `http://localhost:${import.meta.env.VITE_APP_BACKEND_PORT}`;
        }
        
        // Gabungkan base URL backend dengan path API spesifik
        const apiUrl = `${backendBaseUrl}${import.meta.env.VITE_APP_API_BASE_PATH}/projects?_limit=6`;
        // --- AKHIR BLOK LOGIKA URL DINAMIS ---

        const response = await fetch(apiUrl);
        if (!response.ok) {
          // Jika respons bukan OK, coba baca error sebagai teks
          // Ini akan membantu kita melihat respons 500 yang tidak valid JSON
          const errorResponseText = await response.text(); 
          throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorResponseText.substring(0, 200)}`); 
        }
        const data = await response.json();
        setProjects(data.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
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
    return <section className="projects py-5 bg-light text-center">Memuat proyek terbaru...</section>;
  }

  if (error) {
    return <section className="projects py-5 bg-light text-center text-danger">Error memuat proyek: {error}</section>;
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
          {projects.map((project) => (
            <Col key={project.id} lg={4} md={6} className="mb-4">
              <div className="card border-0 shadow-sm h-100 project-card">
                <div className="position-relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="card-img-top project-img"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span
                      className={`badge ${getStatusBadgeColor(project.status)} px-3 py-2 rounded-pill`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="position-absolute bottom-0 start-0 m-3">
                    <span className="badge bg-white text-orange fw-bold px-3 py-2 rounded-pill shadow-sm">
                      {project.price}
                    </span>
                  </div>
                </div>

                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-map-marker-alt text-orange me-2"></i>
                    <small className="text-muted">{project.location}</small>
                  </div>

                  <h5 className="card-title fw-bold mb-3">
                    {project.name}
                  </h5>

                  <div className="project-features mb-3">
                    <div className="row g-2">
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-bed text-orange me-1"></i>
                          <small className="fw-medium">
                            {project.bedrooms} KT
                          </small>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-bath text-orange me-1"></i>
                          <small className="fw-medium">
                            {project.bathrooms} KM
                          </small>
                        </div>
                      </Col>
                      <Col xs={4}>
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-car text-orange me-1"></i>
                          <small className="fw-medium">
                            {project.garage} Garasi
                          </small>
                        </div>
                      </Col>
                    </div>

                    <div className="row g-2 mt-2">
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-ruler-combined text-orange me-1"></i>
                          <small className="fw-medium">
                            {project.landSize} m²
                          </small>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="d-flex align-items-center">
                          <i className="fa-solid fa-home text-orange me-1"></i>
                          <small className="fw-medium">
                            {project.buildingSize} m²
                          </small>
                        </div>
                      </Col>
                    </div>
                  </div>

                  <div className="project-facilities mb-3">
                    <div className="d-flex flex-wrap gap-1">
                      {project.facilities && project.facilities.slice(0, 3).map((facility, index) => (
                        <span
                          key={index}
                          className="badge bg-orange-light text-orange px-2 py-1 rounded-pill"
                        >
                          <small>{facility}</small>
                        </span>
                      ))}
                      {project.facilities && project.facilities.length > 3 && (
                        <span className="badge bg-light text-muted px-2 py-1 rounded-pill">
                          <small>+{project.facilities.length - 3} lainnya</small>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      className="btn btn-orange w-100 rounded-2 fw-medium"
                      onClick={() => handleShowModal(project)}
                    >
                      <i className="fa-solid fa-eye me-2"></i>
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
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