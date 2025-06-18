import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { projectByLocation } from "../data"; // Pastikan path data sudah benar

const ProjectByLocationSection = () => {
  return (
    <section className="project-by-location py-5 bg-white">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h2 className="fw-bold mb-3">Project Berdasarkan Lokasi</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
                Jelajahi berbagai pilihan properti di lokasi strategis dan
                berkembang di seluruh Indonesia. Temukan hunian yang tepat
                sesuai dengan preferensi lokasi Anda.
              </p>
            </div>
          </Col>
        </Row>

        {/* Location Cards */}
        <Row className="g-4">
          {projectByLocation.map((location) => (
            <Col key={location.id} lg={4} md={6} className="mb-4">
              <div className="location-card h-100 rounded-4 overflow-hidden shadow-sm position-relative">
                {/* Background Image with Overlay */}
                <div
                  className="location-bg position-absolute w-100 h-100"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.27), rgba(129, 36, 2, 0.6)), url('${location.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.3s ease",
                  }}
                ></div>

                {/* Content */}
                <div className="location-content position-relative h-100 p-4 d-flex flex-column justify-content-end text-white">
                  {/* Location Badge */}
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-primary text-orange fw-bold px-3 py-2 rounded-pill shadow-sm">
                      <i className="fa-solid fa-map-marker-alt me-1"></i>
                      {location.city}
                    </span>
                  </div>

                  {/* Stats Badge */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-dark bg-opacity-50 text-white px-3 py-2 rounded-pill">
                      {location.totalProjects} Projects
                    </span>
                  </div>

                  {/* Main Content - Added padding top to avoid overlap */}
                  <div className="location-info" style={{ paddingTop: "60px" }}>
                    <h4 className="fw-bold mb-2 text-shadow">
                      {location.name}
                    </h4>
                    <p className="mb-3 text-shadow opacity-90">
                      {location.description}
                    </p>

                    {/* Features */}
                    <div className="location-features mb-3">
                      <div className="d-flex flex-wrap gap-2">
                        {location.features.map((feature, index) => (
                          <span
                            key={index}
                            className="badge bg-white bg-opacity-20 text-black px-2 py-1 rounded-pill backdrop-blur"
                          >
                            <small>{feature}</small>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <small className="text-white opacity-75">
                          Mulai dari
                        </small>
                        <div className="fw-bold h5 mb-0 text-shadow">
                          {location.priceRange}
                        </div>
                      </div>
                      <div className="text-end">
                        <small className="text-white opacity-75">
                          Area
                        </small>
                        <div className="fw-medium text-shadow">
                          {location.area}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="location-hover-overlay position-absolute w-100 h-100 bg-dark bg-opacity-10 opacity-0 transition-all"></div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProjectByLocationSection;