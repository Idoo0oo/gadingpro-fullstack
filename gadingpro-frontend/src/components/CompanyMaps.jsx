// src/components/CompanyMaps.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MapPin } from "lucide-react";
import AOS from "aos";

const CompanyMaps = () => {
  // Ganti dengan API Key Google Maps Anda
  const Maps_API_KEY = "YOUR_Maps_API_KEY"; // <<< GANTI INI DENGAN API KEY ANDA
  // Ganti dengan alamat atau koordinat perusahaan Anda
  const companyAddress =
    "Jalan Raya Tajur Halang No. 123, Tajur Halang, Bogor, Jawa Barat, Indonesia";
  const embedSrc = `https://www.google.com/maps/embed/v1/place?key=${Maps_API_KEY}&q=${encodeURIComponent(
    companyAddress
  )}`;

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191.72520286104114!2d106.63171559572218!3d-6.2381293984282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb9bbe4644eb%3A0x105deb59d34505e5!2sGadingPro%20Gading%20Serpong!5e1!3m2!1sid!2sid!4v1750048891617!5m2!1sid!2sid"
                width="100%"
                height="100%"
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
