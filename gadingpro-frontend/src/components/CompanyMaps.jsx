// gadingpro-fullstack/gadingpro-frontend/src/components/CompanyMaps.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MapPin } from "lucide-react";
import AOS from "aos";

const CompanyMaps = () => {
  // Ganti dengan API Key Google Maps Anda jika diperlukan, atau gunakan URL embed statis
  // const Maps_API_KEY = import.meta.env.VITE_APP_MAPS_API_KEY; // <<< Ambil dari environment variable
  // Ganti dengan alamat atau koordinat perusahaan Anda
  const companyAddress = "Jalan Raya Tajur Halang No. 123, Tajur Halang, Bogor, Jawa Barat, Indonesia";
  
  // Menggunakan URL Google Maps Embed API
  // Anda bisa menggunakan iframe dari Google Maps Embed API (yang tidak memerlukan API Key jika hanya embed)
  // Atau jika ingin lebih dinamis dan interaktif, gunakan library React Google Maps.
  // Untuk tujuan embed sederhana, URL ini cukup.
  const embedSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_APP_MAPS_API_KEY}&q=${encodeURIComponent(companyAddress)}`;


  return (
    <section className="py-5 bg-light" data-aos="fade-up">
      <Container>
        <Row className="mb-5 text-center">
          <Col>
            <h2 className="fw-bold mb-3">Lokasi Kantor Kami</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              melihat model properti.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div
              className="map-container shadow-lg rounded-4 overflow-hidden"
              style={{ height: "500px", width: "100%" }}
            >
              <iframe
                src={embedSrc} // Menggunakan variabel embedSrc
                width="100%"
                height="100%"
                style={{ border: 0 }} // Border 0 untuk iframe
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CompanyMaps;