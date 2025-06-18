import React from "react";
import { Modal, Row, Col, Badge, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const PropertyDetailModal = ({ show, onHide, selectedProject }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="property-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fs-4 fw-bold text-orange">
          Detail Properti
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        {selectedProject && (
          <div className="property-detail">
            {/* Header Section */}
            <div className="property-header mb-4">
              <Row className="align-items-center">
                <Col lg={8}>
                  <h3 className="fw-bold mb-2 text-dark">
                    {selectedProject.name}
                  </h3>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-map-marker-alt text-orange me-2"></i>
                    <span className="text-muted">
                      {selectedProject.location}
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <h4 className="text-orange fw-bold mb-0">
                      {selectedProject.price}
                    </h4>
                    <Badge
                      bg={
                        selectedProject.status === "Ready Stock"
                          ? "success"
                          : selectedProject.status === "Pre Launching"
                          ? "warning"
                          : "secondary"
                      }
                      className="px-3 py-2 fs-6"
                    >
                      {selectedProject.status}
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
                    src={selectedProject.image}
                    alt={selectedProject.name}
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
                    {selectedProject.images &&
                      selectedProject.images
                        .slice(1, 3)
                        .map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${selectedProject.name} ${index + 2}`}
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
                    {selectedProject.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="property-specs mb-4">
                  <h5 className="fw-bold mb-3">
                    <i className="fa-solid fa-home text-orange me-2"></i>
                    Spesifikasi
                  </h5>
                  <Row className="g-3">
                    <Col sm={6} md={4}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-bed text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {selectedProject.bedrooms}
                        </div>
                        <small className="text-muted">Kamar Tidur</small>
                      </div>
                    </Col>
                    <Col sm={6} md={4}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-bath text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {selectedProject.bathrooms}
                        </div>
                        <small className="text-muted">Kamar Mandi</small>
                      </div>
                    </Col>
                    <Col sm={6} md={4}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-car text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {selectedProject.garage}
                        </div>
                        <small className="text-muted">Garasi</small>
                      </div>
                    </Col>
                    <Col sm={6} md={6}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-ruler-combined text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {selectedProject.landSize}m²
                        </div>
                        <small className="text-muted">Luas Tanah</small>
                      </div>
                    </Col>
                    <Col sm={6} md={6}>
                      <div className="spec-item bg-light p-3 rounded-3 text-center">
                        <i className="fa-solid fa-home text-orange fs-4 mb-2"></i>
                        <div className="fw-bold">
                          {selectedProject.buildingSize}m²
                        </div>
                        <small className="text-muted">Luas Bangunan</small>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Features */}
                {selectedProject.features && (
                  <div className="property-features mb-4">
                    <h5 className="fw-bold mb-3">
                      <i className="fa-solid fa-cog text-orange me-2"></i>
                      Spesifikasi Teknis
                    </h5>
                    <Row className="g-2">
                      {Object.entries(selectedProject.features).map(
                        ([key, value]) => (
                          <Col sm={6} key={key}>
                            <div className="feature-item bg-light p-2 rounded-2 d-flex justify-content-between">
                              <small className="text-muted text-capitalize">
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
                    {selectedProject.facilities.map((facility, index) => (
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
                <div className="contact-section mt-4 p-3 bg-orange-light rounded-3">
                  <h6 className="fw-bold text-orange mb-3">
                    Tertarik dengan properti ini?
                  </h6>
                  <div className="d-grid gap-2">
                    <Button
                      variant="orange"
                      size="sm"
                      className="fw-medium"
                      onClick={() => {
                        handleCloseModal();
                        navigate("/contact-us");
                      }}
                    >
                      <i className="fa-solid fa-phone me-2"></i>
                      Hubungi Sales
                    </Button>
                    <Button
                      variant="outline-orange"
                      size="sm"
                      className="fw-medium"
                    >
                      <i className="fa-brands fa-whatsapp me-2"></i>
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PropertyDetailModal;