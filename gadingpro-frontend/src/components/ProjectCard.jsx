import React from 'react';
import { MapPin, Bed, Bath, Car, Ruler, Home, Eye, Calendar, Building } from 'lucide-react';

const ProjectCard = ({ project, index, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready Stock':
        return 'bg-success';
      case 'Launching':
        return 'bg-primary';
      case 'Pre-Launching':
        return 'bg-purple';
      case 'Under Construction':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  const cardStyle = {
    transition: 'all 0.5s ease',
    borderRadius: '1rem',
    overflow: 'hidden'
  };

  const imageStyle = {
    height: '256px',
    objectFit: 'cover',
    transition: 'transform 0.7s ease'
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%, transparent 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  };

  const priceTagStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    color: '#ea580c',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '1.125rem'
  };

  const categoryTagStyle = {
    backgroundColor: '#f97316',
    color: 'white',
    borderRadius: '25px',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  const facilityTagStyle = {
    backgroundColor: '#fff7ed',
    color: '#ea580c',
    borderRadius: '25px',
    fontSize: '0.75rem',
    fontWeight: '500'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    border: 'none',
    borderRadius: '0.75rem',
    transition: 'all 0.3s ease',
    fontWeight: '600'
  };

  return (
    <div
      className="card shadow-lg h-100 hover-card"
      style={cardStyle}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="600"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        const img = e.currentTarget.querySelector('.card-img-hover');
        const overlay = e.currentTarget.querySelector('.gradient-overlay');
        if (img) img.style.transform = 'scale(1.1)';
        if (overlay) overlay.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        const img = e.currentTarget.querySelector('.card-img-hover');
        const overlay = e.currentTarget.querySelector('.gradient-overlay');
        if (img) img.style.transform = 'scale(1)';
        if (overlay) overlay.style.opacity = '0';
      }}
    >
      {/* Image Container */}
      <div className="position-relative overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="card-img-top card-img-hover"
          style={imageStyle}
        />
        
        {/* Gradient Overlay */}
        <div className="gradient-overlay" style={gradientOverlayStyle}></div>
        
        {/* Status Badge */}
        <div className="position-absolute top-0 end-0 m-3">
          <span className={`badge ${getStatusColor(project.status)} px-3 py-2 shadow`}>
            {project.status}
          </span>
        </div>
        
        {/* Price Badge */}
        <div className="position-absolute bottom-0 start-0 m-3">
          <span className="px-4 py-2 shadow" style={priceTagStyle}>
            {project.price}
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="position-absolute top-0 start-0 m-3">
          <span className="px-3 py-2 shadow" style={categoryTagStyle}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="card-body p-4">
        {/* Location */}
        <div className="d-flex align-items-center text-muted mb-3">
          <MapPin className="me-2 text-warning" size={16} />
          <small>{project.location}</small>
        </div>

        {/* Title */}
        <h5 className="card-title fw-bold text-dark mb-3 hover-title" 
            style={{ transition: 'color 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#ea580c'}
            onMouseLeave={(e) => e.target.style.color = '#212529'}>
          {project.name}
        </h5>

        {/* Developer & Year */}
        <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
          <div className="d-flex align-items-center">
            <Building className="me-1" size={16} />
            <span>{project.developer}</span>
          </div>
          <div className="d-flex align-items-center">
            <Calendar className="me-1" size={16} />
            <span>{project.completionYear}</span>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="row g-3 mb-3">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <Bed className="me-2 text-warning" size={16} />
              <small className="fw-medium">{project.bedrooms} KT</small>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <Bath className="me-2 text-warning" size={16} />
              <small className="fw-medium">{project.bathrooms} KM</small>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <Car className="me-2 text-warning" size={16} />
              <small className="fw-medium">{project.garage} Garasi</small>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <Ruler className="me-2 text-warning" size={16} />
              <small className="fw-medium">{project.landSize} m²</small>
            </div>
          </div>
        </div>

        {/* Building Size */}
        {project.buildingSize > 0 && (
          <div className="d-flex align-items-center mb-3">
            <Home className="me-2 text-warning" size={16} />
            <small className="fw-medium">Bangunan: {project.buildingSize} m²</small>
          </div>
        )}

        {/* Facilities */}
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-2">
            {project.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="px-3 py-1"
                style={facilityTagStyle}
              >
                {facility}
              </span>
            ))}
            {project.facilities.length > 3 && (
              <span className="badge bg-light text-muted px-3 py-1">
                +{project.facilities.length - 3} lainnya
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="card-text text-muted small mb-3" 
           style={{ 
             display: '-webkit-box',
             WebkitLineClamp: 2,
             WebkitBoxOrient: 'vertical',
             overflow: 'hidden'
           }}>
          {project.description}
        </p>

        {/* Action Button */}
        <button 
          className="btn text-white w-100 py-3 shadow"
          style={buttonStyle}
          // 2. Tambahkan onClick untuk memanggil onViewDetails
          onClick={() => onViewDetails(project)} // <-- DIUBAH
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.background = 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)';
          }}
        >
          <Eye className="me-2" size={16} />
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;