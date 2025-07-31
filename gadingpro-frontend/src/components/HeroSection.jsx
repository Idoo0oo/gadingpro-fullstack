// gadingpro-frontend/src/components/HeroSection.jsx (FIXED)
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// 1. Impor gambar lokal yang sudah dioptimasi
import heroImage from "../assets/img/project-1.webp"; 

const HeroSection = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="w-100 min-vh-100 d-flex align-items-center pt-lg-5"
      style={{
        // 2. Gunakan gambar yang sudah diimpor di sini
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage}) center/cover no-repeat`,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Row className="header-box d-flex align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="mb-4 text-white">
              Wujudkan <br />
              <span style={{ color: "#ff6b35" }}>Rumah Impian</span> <br />
              Bersama Kami!
            </h1>
            <p
              className="mb-4 text-white"
              style={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
                maxWidth: "500px",
                margin: "0 auto 1rem auto",
              }}
            >
              Solusi properti terpercaya dengan pengalaman lebih dari 15
              tahun. Kami membantu Anda menemukan hunian ideal yang sesuai
              dengan kebutuhan dan budget.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <button
                className="btn btn-orange btn-lg rounded-2"
                onClick={() => scrollToSection("project")}
              >
                <i className="fa-solid fa-home me-2"></i>
                Cari Properti
              </button>
              <button
                className="btn btn-outline-light btn-lg rounded-2"
                onClick={() => scrollToSection("hitung-kpr")}
              >
                <i className="fa-solid fa-calculator me-2"></i>
                Hitung KPR
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default HeroSection;