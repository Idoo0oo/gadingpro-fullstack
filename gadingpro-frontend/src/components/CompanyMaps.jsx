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
  const embedSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1941359354346!2d106.6294222741487!3d-6.238124061084671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb9bbe4644eb%3A0x105deb59d34505e5!2sGadingPro%20Gading%20Serpong!5e0!3m2!1sid!2sid!4v1750905122452!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`;


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