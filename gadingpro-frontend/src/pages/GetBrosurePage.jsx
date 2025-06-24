// gadingpro-fullstack/gadingpro-frontend/src/pages/GetBrosurePage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

import BrochureCard from '../components/BrochureCard';
import RequestBrochureForm from '../components/RequestBrochureForm';
import FaqComponent from '../components/FaqComponent';

const GetBrochurePage = () => {
  const [projectsAll, setProjectsAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-sine',
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const currentOrigin = window.location.origin;
        let backendBaseUrl;

        if (currentOrigin.includes('.devtunn.ms') || currentOrigin.includes('.vercel.app')) {
          const backendPort = import.meta.env.VITE_APP_BACKEND_PORT;
          backendBaseUrl = currentOrigin.replace(/-\d+\.(devtunn\.ms|vercel\.app)/, `-${backendPort}.$1`);
        } else {
          backendBaseUrl = `http://localhost:${import.meta.env.VITE_APP_BACKEND_PORT}`;
        }
        
        const apiUrl = `${backendBaseUrl}${import.meta.env.VITE_APP_API_BASE_PATH}/projects`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjectsAll(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="get-brochure-page pt-5 text-center" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
        <p>Memuat daftar brosur...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="get-brochure-page pt-5 text-center text-danger" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
        <p>Error memuat brosur: {error}</p>
      </div>
    );
  }

  return (
    <div className="get-brochure-page pt-5" style={{ backgroundColor: '#f8f9fa' }}>

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
            {projectsAll.length > 0 ? (
              projectsAll.map((project, index) => (
                project.brochureLink && (
                  <Col key={project.id} lg={4} md={6}>
                    <BrochureCard project={project} index={index} />
                  </Col>
                )
              ))
            ) : (
              <Col className="text-center py-5">
                <p className="text-muted">Tidak ada brosur proyek yang tersedia saat ini.</p>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <RequestBrochureForm />

      <section className="bg-white pb-5 pt-5">
        <Container>
          <FaqComponent />
        </Container>
      </section>
    </div>
  );
};

export default GetBrochurePage;