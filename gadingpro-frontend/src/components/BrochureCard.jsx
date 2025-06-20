// src/components/BrochureCard.jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Download, MapPin, Ruler, Home } from 'lucide-react';
import AOS from 'aos';

const BrochureCard = ({ project, index }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
        case "Ready Stock": return "bg-success";
        case "Launching": return "bg-primary";
        case "Pre-Launching": return "bg-warning text-dark";
        case "Sold Out": return "bg-danger";
        case "Under Construction": return "bg-info text-dark";
        default: return "bg-secondary";
    }
  };

  return (
    <Card className="shadow-sm border-0 h-100" data-aos="fade-up" data-aos-delay={index * 100}>
      <div className="position-relative overflow-hidden">
        <Card.Img
          variant="top"
          src={project.image}
          alt={project.name}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 m-3">
          <span className={`badge ${getStatusBadgeColor(project.status)} px-3 py-2 shadow`}>
            {project.status}
          </span>
        </div>
        <div className="position-absolute bottom-0 start-0 m-3">
          <Badge bg="white" text="orange" className="fw-bold px-3 py-2 rounded-pill shadow-sm">
            {project.price}
          </Badge>
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-2 text-muted">
          <MapPin size={16} className="me-2" />
          <small>{project.location}</small>
        </div>
        <Card.Title className="fw-bold mb-3">{project.name}</Card.Title>
        <Card.Text className="text-muted small mb-3 flex-grow-1">
          {project.description.substring(0, 100)}...
        </Card.Text>

        <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="badge bg-light text-muted px-2 py-1 rounded-pill">
                <Ruler size={14} className="me-1" /> {project.landSize}m²
            </span>
            <span className="badge bg-light text-muted px-2 py-1 rounded-pill">
                <Home size={14} className="me-1" /> {project.buildingSize}m²
            </span>
        </div>

        <Button
          variant="orange"
          className="mt-auto fw-medium rounded-2"
          href={project.brochureLink}
          target="_blank"
          rel="noopener noreferrer"
          disabled={!project.brochureLink}
        >
          <Download size={18} className="me-2" />
          Unduh Brosur
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BrochureCard;