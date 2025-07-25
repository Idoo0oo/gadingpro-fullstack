// src/components/ProjectDetailModal.jsx

import React, { useEffect } from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap'; // Import komponen dari react-bootstrap
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi dari modal

const ProjectDetailModal = ({ project, showModal, handleCloseModal }) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Efek untuk menutup modal saat tombol 'Escape' ditekan
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleCloseModal]);

  if (!project) return null; // Jika project tidak ada, jangan render modal

  return (
    <Modal
      show={showModal} // Gunakan prop showModal untuk mengontrol visibilitas
      onHide={handleCloseModal} // Gunakan prop handleCloseModal untuk menutup
      size="xl"
      centered
      className="property-modal" // Classname dari modal pertama
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-4 fw-bold text-orange">
          Detail Properti
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        {project && ( // Menggunakan 'project' langsung
          <div className="property-detail">
            {/* Header Section */}
            <div className="property-header mb-4">
              <Row className="align-items-center">
                <Col lg={8}>
                  <h3 className="fw-bold mb-2 text-dark">
                    {project.name}
                  </h3>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-map-marker-alt text-orange me-2"></i>
                    <span className="text-muted">
                      {project.location}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <h4 className="text-orange fw-bold mb-0">
                      {project.price}
                    </h4>
                    <Badge
                      bg={
                        project.status === "Ready Stock"
                          ? "success"
                          : project.status === "Pre-Launching" // Pastikan konsisten dengan backend/seed
                          ? "warning"
                          : project.status === "Launching"
                          ? "primary"
                          : project.status === "Under Construction"
                          ? "info"
                          : "secondary"
                      }
                      className="px-3 py-2 fs-6"
                    >
                      {project.status}
                    </Badge>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Images Section */}
            <div className="property-images mb-4">
              <Row>
                <Col lg={8}>
                  <img
                    src={project.image}
                    alt={project.name}
                    className="img-fluid rounded-3 shadow-sm"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col lg={4}>
                  <div className="d-flex flex-column gap-2 h-100">
                    {project.images &&
                      project.images
                        .slice(1, 3) // Mengambil 2 gambar setelah gambar utama
                        .map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${project.name} ${index + 2}`}
                            className="img-fluid rounded-3 shadow-sm"
                            style={{ height: "145px", objectFit: "cover" }}
                          />
                        ))}
                  </div>
                </Col>
              </Row>
            </div>

            {/* Property Details Section */}
            <Row>
              <Col lg={8}>
                {/* Description */}
                <div className="property-description mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="fa-solid fa-info-circle text-orange me-2"></i>
                    Deskripsi
                  </h5>
                  <p className="text-muted lh-lg">
                    {project.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="property-specs mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="fa-solid fa-home text-orange me-2"></i>
                    Spesifikasi
                  </h5>
                  <Row className="g-3"> {/* g-3 untuk gap antar kolom */}
                    <Col sm={6} md={4}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-bed text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {project.bedrooms}
                        </div>
                        <small className="text-muted">Kamar Tidur</small>
                      </div>
                    </Col>
                    <Col sm={6} md={4}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-bath text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {project.bathrooms}
                        </div>
                        <small className="text-muted">Kamar Mandi</small>
                      </div>
                    </Col>
                    <Col sm={6} md={4}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-car text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {project.garage}
                        </div>
                        <small className="text-muted">Garasi</small>
                      </div>
                    </Col>
                    <Col sm={6} md={6}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-ruler-combined text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {project.landSize}m²
                        </div>
                        <small className="text-muted">Luas Tanah</small>
                      </div>
                    </Col>
                    <Col sm={6} md={6}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-building text-orange fs-4 mb-2"></i> {/* Menggunakan fa-building untuk luas bangunan */}
                        <div className="fw-bold">
                          {project.buildingSize}m²
                        </div>
                        <small className="text-muted">Luas Bangunan</small>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Features (Spesifikasi Teknis) */}
                {project.features && Object.keys(project.features).length > 0 && ( // Pastikan features ada dan tidak kosong
                  <div className="property-features mb-4">
                    <h5 className="fw-bold mb-3">
                      <i className="fa-solid fa-cog text-orange me-2"></i>
                      Spesifikasi Teknis
                    </h5>
                    <Row className="g-2"> {/* g-2 untuk gap antar kolom */}
                      {Object.entries(project.features).map(
                        ([key, value]) => (
                          <Col sm={6} key={key}>
                            <div className="feature-item bg-light p-2 rounded-2 d-flex justify-content-between">
                              <small className="text-muted text-capitalize">
                                {/* Mengubah camelCase menjadi kalimat biasa */}
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </small>
                              <small className="fw-medium">{value}</small>
                            </div>
                          </Col>
                        )
                      )}
                    </Row>
                  </div>
                )}
              </Col>

              <Col lg={4}>
                {/* Facilities */}
                <div className="property-facilities">
                  <h5 className="fw-bold mb-3">
                    <i className="fa-solid fa-star text-orange me-2"></i>
                    Fasilitas
                  </h5>
                  <div className="facilities-list">
                    {project.facilities && project.facilities.map((facility, index) => ( // Pastikan facilities ada
                      <div
                        key={index}
                        className="facility-item d-flex align-items-center mb-2"
                      >
                        <i className="fa-solid fa-check text-success me-2"></i>
                        <small>{facility}</small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
              {/* {agent && ( // Tampilkan hanya jika ada data agent
                <div className="contact-section mt-4 p-3 bg-light rounded-3 text-center">
                  <h6 className="fw-bold text-dark mb-3">
                    Tertarik? Hubungi Agen Kami
                  </h6>
                  <img 
                    src={agent.profilePicture || 'https://via.placeholder.com/80'} // Gambar placeholder jika tidak ada foto
                    alt={agent.username}
                    className="rounded-circle mb-2"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <p className="fw-bold mb-0">{agent.username}</p>
                  <p className="text-muted small">{agent.phone}</p>
                  
                  <div className="d-grid gap-2 mt-3">
                    <Button
                      variant="success" // Ganti warna jadi hijau untuk WhatsApp
                      className="fw-medium"
                      href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`} // Link langsung ke WhatsApp
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-whatsapp me-2"></i>
                      WhatsApp
                    </Button>
                  </div>
                </div>
              )} */}
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ProjectDetailModal;