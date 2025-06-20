// src/components/ProjectsHero.jsx
import React from 'react';
import { Building, MapPin } from 'lucide-react';

const ProjectsHero = ({ totalProjects, totalLocations }) => {
  const heroStyle = {
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(255, 107, 53, 0.3))',
    position: 'relative',
    minHeight: '500px'
  };

  const heroOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  };

  const heroBackgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url('https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1
  };

  return (
    <section style={heroStyle} className="text-white">
      <div style={heroOverlayStyle}></div>
      <div style={heroBackgroundStyle}></div>

      <div className="container position-relative" style={{ paddingTop: '6rem', paddingBottom: '8rem' }}>
        <div className="text-center" data-aos="fade-up">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <Building className="me-3" size={48} />
            <h1 className="display-4 fw-bold mb-0">
              Semua <span style={{ color: '#ff6b35' }}>Projects</span>
            </h1>
          </div>
          <p className="lead mb-5 mx-auto" style={{ maxWidth: '800px', lineHeight: '1.6', opacity: 0.9 }}>
            Jelajahi koleksi lengkap project properti terbaik kami.
            Dari hunian modern hingga investasi premium, temukan yang sesuai dengan impian Anda.
          </p>
          <div className="d-flex align-items-center justify-content-center gap-5 fs-5">
            <div className="d-flex align-items-center">
              <Building className="me-2" size={24} />
              <span className="fw-semibold">{totalProjects}+ Projects</span>
            </div>
            <div className="d-flex align-items-center">
              <MapPin className="me-2" size={24} />
              <span className="fw-semibold">{totalLocations}+ Lokasi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero;