// src/pages/GetBrochurePage.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import data
import { projectsAll } from '../data'; // Path relatif yang benar dari src/pages/ ke src/data/

// Import komponen dari src/components/
import BrochureCard from '../components/BrochureCard';
import RequestBrochureForm from '../components/RequestBrochureForm';
import FaqComponent from '../components/FaqComponent'; // Asumsi FAQ juga ada di components

const GetBrochurePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-sine',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="get-brochure-page pt-5" style={{ backgroundColor: '#f8f9fa' }}>

      {/* Bagian Daftar Brosur Proyek */}
      <section className="py-5">
        <Container>
          <Row className="mb-5 text-center" data-aos="fade-up">
            <Col>
              <h2 className="fw-bold mb-3 text-dark">Brosur Proyek Terbaru</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                Pilih dan unduh brosur proyek yang Anda minati untuk informasi lebih lanjut.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {projectsAll.map((project, index) => (
              // Hanya tampilkan proyek yang memiliki brochureLink
              project.brochureLink && (
                <Col key={project.id} lg={4} md={6}>
                  <BrochureCard project={project} index={index} />
                </Col>
              )
            ))}
          </Row>
        </Container>
      </section>

      {/* Bagian Formulir Permintaan Brosur */}
      <RequestBrochureForm />

      {/* FAQ Section (Opsional, jika ingin ada FAQ di halaman ini juga) */}
      <section className="bg-white pb-5 pt-5">
        <Container>
          <FaqComponent />
        </Container>
      </section>
    </div>
  );
};

export default GetBrochurePage;