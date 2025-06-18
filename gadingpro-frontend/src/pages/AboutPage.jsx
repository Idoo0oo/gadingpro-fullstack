import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Modal,
} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FaqComponent from "../components/FaqComponent";
import ZoomableGalleryModal from "../components/ZoomableGalleryModal";
import BranchesComponent from "../components/BranchesComponent";

const AboutPage = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  // Company data
  const companyInfo = {
    vision:
      "Menjadi perusahaan properti terdepan di Indonesia yang menghadirkan hunian berkualitas tinggi dan berkelanjutan untuk masyarakat.",
    mission: [
      "Mengembangkan properti berkualitas dengan desain modern dan fungsional",
      "Memberikan pelayanan terbaik dengan transparansi dan integritas tinggi",
      "Menciptakan komunitas hunian yang nyaman dan berkelanjutan",
      "Menjadi mitra terpercaya dalam mewujudkan hunian impian keluarga Indonesia",
    ],
  };

  const founders = [
    {
      name: "Pak Steven",
      position: "CEO & Founder",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "25+ tahun",
      description:
        "Lulusan Teknik Sipil ITB dengan pengalaman luas dalam industri konstruksi dan properti. Memimpin perusahaan dengan visi menghadirkan hunian berkualitas untuk semua kalangan.",
    },
    {
      name: "Pak Albert",
      position: "Co-Founder & COO",
      image:
        "https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg?auto=compress&cs=tinysrgb&w=400",
      experience: "20+ tahun",
      description:
        "Expert dalam manajemen operasional dan strategi bisnis. Berperan penting dalam pengembangan sistem operasional perusahaan yang efisien dan customer-oriented.",
    },
  ];

  const gallery = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Kantor Pusat Jakarta",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Show Unit Premium",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Construction Progress",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Customer Service Center",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Sales Gallery",
    },
    {
      id: 6,
      image:
        "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Team Meeting",
    },
  ];

  const openGallery = (image) => {
    setSelectedImage(image);
    setShowGallery(true);
  };

  const [showAll, setShowAll] = useState(false); // This state isn't used in the provided code, consider removing it if not needed.

  const scrollToNextSection = () => {
    // Scroll to the next section (Vision & Mission)
    document
      .getElementById("vision-mission-section") // Give your Vision & Mission section an ID
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="about-page">
      {/* ========== HERO SECTION ========== */}
      <section
        className="about-hero min-vh-100 d-flex align-items-center position-relative"
        style={{
          background: `linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(255, 107, 53, 0.3)), url('https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover no-repeat`,
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center text-white">
              <div data-aos="fade-up">
                <h1 className="display-4 fw-bold mb-4">
                  Tentang{" "}
                  <span style={{ color: "#ff6b35" }}>Perusahaan</span>
                </h1>
                <p
                  className="lead mb-5"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                >
                  Lebih dari 15 tahun menghadirkan hunian berkualitas dan
                  mewujudkan impian keluarga Indonesia dengan dedikasi dan
                  inovasi terdepan
                </p>
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  <div className="text-center">
                    <h3 className="fw-bold" style={{ color: "#ff6b35" }}>
                      15K+
                    </h3>
                    <p className="mb-0">Unit Terjual</p>
                  </div>
                  <div className="text-center">
                    <h3 className="fw-bold" style={{ color: "#ff6b35" }}>
                      50+
                    </h3>
                    <p className="mb-0">Proyek Selesai</p>
                  </div>
                  <div className="text-center">
                    <h3 className="fw-bold" style={{ color: "#ff6b35" }}>
                      15+
                    </h3>
                    <p className="mb-0">Tahun Pengalaman</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* Scroll Down Icon */}
        <div className="scroll-down-icon-container">
          <Button
            variant="link" // Use link variant for a button that looks like a link
            className="scroll-down-btn"
            onClick={scrollToNextSection}
            aria-label="Scroll down to next section"
          >
            <i className="fas fa-chevron-down fa-3x text-white"></i>
          </Button>
        </div>
      </section>

      {/* ========== VISION & MISSION SECTION ========== */}
      <section id="vision-mission-section" className="vision-mission py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold mb-3" data-aos="fade-up">
                Visi & Misi
              </h2>
              <p
                className="text-muted mx-auto"
                style={{ maxWidth: "600px" }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Komitmen kami dalam menghadirkan hunian terbaik untuk masyarakat
                Indonesia
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm" data-aos="fade-right">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#ff6b35",
                        color: "white",
                      }}
                    >
                      <i className="fas fa-eye fa-lg"></i>
                    </div>
                    <h4 className="fw-bold mb-0" style={{ color: "#ff6b35" }}>
                      VISI
                    </h4>
                  </div>
                  <p className="text-muted lh-lg">{companyInfo.vision}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow-sm" data-aos="fade-left">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#ff6b35",
                        color: "white",
                      }}
                    >
                      <i className="fas fa-bullseye fa-lg"></i>
                    </div>
                    <h4 className="fw-bold mb-0" style={{ color: "#ff6b35" }}>
                      MISI
                    </h4>
                  </div>
                  <ul className="list-unstyled">
                    {companyInfo.mission.map((item, index) => (
                      <li key={index} className="d-flex align-items-start mb-3">
                        <i
                          className="fas fa-check-circle me-3 mt-1"
                          style={{ color: "#ff6b35" }}
                        ></i>
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Rest of your component remains unchanged */}

      {/* ========== FOUNDERS SECTION ========== */}
      <section className="founders py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold mb-3" data-aos="fade-up">
                Pendiri Perusahaan
              </h2>
              <p
                className="text-muted mx-auto"
                style={{ maxWidth: "600px" }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Dipimpin oleh para profesional berpengalaman yang berdedikasi
                membangun masa depan properti Indonesia
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center g-4">
            {founders.map((founder, index) => (
              <Col key={index} lg={5} md={6}>
                <Card
                  className="founder-card border-0 shadow-sm h-100"
                  data-aos="zoom-in"
                  data-aos-delay={index * 200}
                >
                  <Card.Body className="p-4 text-center">
                    <div className="founder-image mb-4">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="rounded-circle shadow"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h4 className="fw-bold mb-1">{founder.name}</h4>
                    <p
                      className="text-orange fw-medium mb-2"
                      style={{ color: "#ff6b35" }}
                    >
                      {founder.position}
                    </p>
                    <Badge
                      bg="light"
                      text="muted"
                      className="mb-3 px-3 py-2 rounded-pill"
                    >
                      Pengalaman {founder.experience}
                    </Badge>
                    <p className="text-muted small lh-lg">
                      {founder.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ========== GALLERY SECTION ========== */}
      <section className="company-gallery py-5 bg-white">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="fw-bold mb-3" data-aos="fade-up">
                Galeri Perusahaan
              </h2>
              <p
                className="text-muted mx-auto"
                style={{ maxWidth: "600px" }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Lihat suasana kerja, fasilitas, dan pencapaian yang telah kami
                raih selama bertahun-tahun
              </p>
            </Col>
          </Row>
          <Row className="g-3">
            {gallery.map((item, index) => (
              <Col key={item.id} lg={4} md={6} sm={6}>
                <div
                  className="gallery-item position-relative overflow-hidden rounded-3 shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  style={{ height: "250px", cursor: "pointer" }}
                  onClick={() => openGallery(item.image)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                  />
                  <div className="gallery-overlay position-absolute w-100 h-100 top-0 start-0 d-flex align-items-center justify-content-center">
                    <div className="text-white text-center">
                      <i className="fas fa-search-plus fa-2x mb-2"></i>
                      <h6 className="fw-bold">{item.title}</h6>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ========== BRANCHES SECTION ========== */}
      <BranchesComponent />

      {/* ========== FAQ SECTION ========== */}
      <section className="faq-section py-5">
        <FaqComponent />
      </section>

      {/* Gallery Modal */}
      <ZoomableGalleryModal
        showGallery={showGallery}
        setShowGallery={setShowGallery}
        selectedImage={selectedImage}
      />
    </div>
  );
};

export default AboutPage;