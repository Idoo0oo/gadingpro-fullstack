// src/pages/GetBrochurePage.jsx
import React, { useEffect, useState } from 'react'; // Tambahkan useState
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Hapus atau abaikan import dari data lokal karena kita akan fetch dari API
// import { projectsAll } from '../data';

// Import komponen dari src/components/
import BrochureCard from '../components/BrochureCard';
import RequestBrochureForm from '../components/RequestBrochureForm';
import FaqComponent from '../components/FaqComponent';

const GetBrochurePage = () => {
  const [projectsAll, setProjectsAll] = useState([]); // State untuk menyimpan data proyek dari API
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

  // <<< Tambahkan useEffect untuk fetch data dari API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/public/projects'); // <<< URL API PUBLIK ANDA
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
  }, []); // [] agar hanya dijalankan sekali saat komponen di-mount
  // >>> Akhir useEffect fetch data

  // Tampilkan loading atau error jika terjadi
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
            {projectsAll.length > 0 ? (
              projectsAll.map((project, index) => (
                // Hanya tampilkan proyek yang memiliki brochureLink
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

      {/* Bagian Formulir Permintaan Brosur */}
      <RequestBrochureForm />

      {/* FAQ Section */}
      <section className="bg-white pb-5 pt-5">
        <Container>
          <FaqComponent />
        </Container>
      </section>
    </div>
  );
};

export default GetBrochurePage;