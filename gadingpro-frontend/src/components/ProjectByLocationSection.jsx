// gadingpro-fullstack/gadingpro-frontend/src/components/ProjectByLocationSection.jsx
import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MapPin, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Gambar fallback jika lokasi tidak punya gambar
const locationImages = {
  'Tangerang Selatan': 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
  'Bekasi': 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
  'Jakarta Selatan': 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
  'Bogor': 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg',
  'Depok': 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg',
  'Jakarta Barat': 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
  'Tangerang': 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg',
  'Jakarta Pusat': 'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg',
  'Jakarta Utara': 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
  'Default': 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'
};


const ProjectByLocationSection = ({ projects, loading }) => {
  const navigate = useNavigate();

  const topLocations = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const locationCounts = projects.reduce((acc, project) => {
      // Mengambil nama kota dari string lokasi, misal "Serpong, Tangerang Selatan" -> "Tangerang Selatan"
      const city = project.location.split(',').pop().trim();
      if (city) {
        acc[city] = (acc[city] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(locationCounts)
      .sort(([, a], [, b]) => b - a) // Urutkan berdasarkan jumlah proyek terbanyak
      .slice(0, 6) // Ambil 6 lokasi teratas
      .map(([name, count]) => ({
        id: name,
        name: name,
        totalProjects: count,
        image: locationImages[name] || locationImages['Default'],
        description: `Temukan properti terbaik di kawasan ${name} yang strategis dan berkembang pesat.`
      }));
  }, [projects]);

  if (loading) {
    return (
      <section className="py-5 bg-white text-center">
        <p>Menyiapkan lokasi unggulan...</p>
      </section>
    );
  }

  if (topLocations.length === 0) {
    return null; // Jangan tampilkan section jika tidak ada data
  }

  return (
    <section className="project-by-location py-5 bg-white">
      <Container>
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="fw-bold mb-3">Jelajahi Lokasi Unggulan</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Temukan properti impian Anda di kawasan-kawasan paling prospektif yang kami layani.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {topLocations.map((location) => (
            <Col key={location.id} lg={4} md={6}>
              <div
                className="location-card h-100 rounded-4 overflow-hidden shadow-sm position-relative"
                onClick={() => navigate(`/projects?location=${location.name}`)}
              >
                <div
                  className="location-bg position-absolute w-100 h-100"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%), url('${location.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="location-content position-relative h-100 p-4 d-flex flex-column justify-content-end text-white">
                    <MapPin size={24} className="mb-2" />
                    <h4 className="fw-bold text-shadow">{location.name}</h4>
                    <p className="small text-shadow opacity-75">{location.description}</p>
                    <div className="mt-2">
                        <span className="badge bg-white bg-opacity-25 text-white px-3 py-2 rounded-pill backdrop-blur">
                           <Building2 size={14} className="me-2" /> {location.totalProjects} Proyek Tersedia
                        </span>
                    </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProjectByLocationSection;