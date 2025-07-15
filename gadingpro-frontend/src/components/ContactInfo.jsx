// src/components/ContactInfo.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Pastikan CSS AOS diimpor

const ContactInfo = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // Durasi animasi
      once: true,    // Hanya animasikan sekali
    });
  }, []);

  return (
    <section className="py-5 bg-light"> {/* Mengganti bg-white dengan bg-light untuk kontras lembut */}
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold text-dark">Hubungi Kami</h2> {/* Judul yang lebih menonjol */}
            <p className="lead text-muted">Kami siap melayani kebutuhan Anda. Jangan ragu untuk menghubungi kami.</p>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {/* Card Telepon */}
          <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="0">
            <Card className="contact-card h-100 shadow-lg border-0 rounded-4 p-4"> {/* Shadow lebih kuat, padding lebih */}
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="icon-wrapper bg-orange text-dark rounded-circle p-3 mb-3"> {/* Icon lebih menonjol */}
                  <Phone size={36} /> {/* Ukuran icon sedikit lebih kecil di dalam wrapper */}
                </div>
                <Card.Title className="fs-5 fw-bold text-dark mb-2">Telepon</Card.Title>
                <Card.Text className="text-secondary mb-0">+62 812-3456-7890</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Email */}
          <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="100">
            <Card className="contact-card h-100 shadow-lg border-0 rounded-4 p-4">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="icon-wrapper bg-orange text-dark rounded-circle p-3 mb-3">
                  <Mail size={36} />
                </div>
                <Card.Title className="fs-5 fw-bold text-dark mb-2">Email</Card.Title>
                <Card.Text className="text-secondary mb-0">info@gadingpro.com</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Alamat */}
          <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="200">
            <Card className="contact-card h-100 shadow-lg border-0 rounded-4 p-4">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="icon-wrapper bg-orange text-dark rounded-circle p-3 mb-3">
                  <MapPin size={36} />
                </div>
                <Card.Title className="fs-5 fw-bold text-dark mb-2">Alamat</Card.Title>
                <Card.Text className="text-secondary text-center mb-0">Jl. Klp Gading Sel Blok BH10 No.30</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card Jam Kerja */}
          <Col md={6} lg={3} data-aos="fade-up" data-aos-delay="300">
            <Card className="contact-card h-100 shadow-lg border-0 rounded-4 p-4">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="icon-wrapper bg-orange text-dark rounded-circle p-3 mb-3">
                  <Clock size={36} />
                </div>
                <Card.Title className="fs-5 fw-bold text-dark mb-2">Jam Kerja</Card.Title>
                <Card.Text className="text-secondary text-center mb-0">Sen-Jum: 09.00 - 17.00 WIB</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactInfo; 