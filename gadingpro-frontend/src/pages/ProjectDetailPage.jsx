// gadingpro-frontend/src/pages/ProjectDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Carousel, Button, Card, Badge, Alert } from 'react-bootstrap';
import { FaWhatsapp, FaMapMarkerAlt, FaBed, FaBath, FaCar } from 'react-icons/fa';
import { MapPin, Building, Calendar, Star, Tag, Home, Bed, Bath, Car, ArrowLeft, Download, ExternalLink, Map, Building2, ShoppingCart, School, Hospital, Train, Plane } from 'lucide-react';
import WhatsappInquiryModal from '../components/WhatsappInquiryModal';

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showWhatsappModal, setShowWhatsappModal] = useState(false);

    useEffect(() => {
        // Menambahkan kelas khusus ke body saat komponen dimuat
        document.body.classList.add('project-detail-page-active');

        // Fungsi cleanup untuk menghapus kelas saat komponen dilepas
        return () => {
            document.body.classList.remove('project-detail-page-active');
        };
    }, []);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            setError('');
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/public/projects/${projectId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (!response.ok) throw new Error('Proyek tidak ditemukan.');
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    const formatPriceRange = (min, max) => {
        if (!min || !max) return "Harga Hubungi Kami";
        const format = (num) => {
            if (num >= 1000000000) return `${(num / 1000000000).toFixed(1).replace('.', ',')} Miliar`;
            if (num >= 1000000) return `${(num / 1000000)} Juta`;
            return num.toLocaleString('id-ID');
        };
        if (min === max) return `Rp ${format(min)}`;
        return `Rp ${format(min)} - ${format(max)}`;
    };

    const nearbyIconMapping = {
        bandara: <Plane size={20} className="text-orange" />,
        'pusat perbelanjaan': <ShoppingCart size={20} className="text-orange" />,
        sekolah: <School size={20} className="text-orange" />,
        'rumah sakit': <Hospital size={20} className="text-orange" />,
        'gerbang tol': <Map size={20} className="text-orange" />,
        stasiun: <Train size={20} className="text-orange" />
    };

    if (loading) return <div className="text-center py-5 page-with-navbar-padding">Memuat data proyek...</div>;
    if (error) return <div className="text-center py-5 page-with-navbar-padding text-danger">Error: {error}</div>;

    return (
        <div className="project-detail-page">
            {/* --- Banner --- */}
            <section className="position-relative text-white text-center" style={{ height: '50vh', background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${project.image}) center/cover no-repeat` }}>
                <Container className="d-flex flex-column justify-content-center h-100">
                    <Button
                        variant="danger"
                        onClick={() => navigate('/projects')}
                        className="position-fixed top-0 start-0 m-3 m-lg-4 fw-medium" // Diubah ke position-fixed
                        style={{ zIndex: 100000 }}
                    >
                        <ArrowLeft size={16} className="me-2" />Kembali ke Proyek
                    </Button>
                    <h1 className="display-4 fw-bold">{project.name}</h1>
                    <p className="lead">{project.location}</p>
                </Container>
            </section>

            <Container className="py-5">
                <Row className="g-4">
                    {/* --- Kolom Konten Utama --- */}
                    <Col lg={8}>
                        {/* Info & Harga */}
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h2 className="fw-bold text-dark">{project.name}</h2>
                                        <div className="d-flex align-items-center text-muted mb-3">
                                            <Building2 size={16} className="me-2" />
                                            <span>Oleh: {project.developer || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <Badge bg="success" className="p-2">{project.status}</Badge>
                                </div>
                                <h3 className="fw-bold text-orange">{formatPriceRange(project.priceMin, project.priceMax)}</h3>
                                <hr />
                                <p className="text-muted">{project.description}</p>
                                <Button variant="success" className="fw-bold w-100 py-2" onClick={() => setShowWhatsappModal(true)}>
                                    <FaWhatsapp className="me-2" /> Saya Tertarik, Hubungi Saya
                                </Button>
                            </Card.Body>
                        </Card>

                        {/* Tipe Unit */}
                        <h3 className="fw-bold mb-3"><Home className="me-2" /> Tipe Unit Tersedia</h3>
                        {project.unitTypes?.length > 0 ? (
                            <Row className="g-3">
                                {project.unitTypes.map(unit => (
                                    <Col md={6} key={unit.id}>
                                        <Card className="h-100 shadow-sm border-0">
                                            <Card.Img variant="top" src={unit.images?.[0]} style={{ height: '180px', objectFit: 'cover' }} />
                                            <Card.Body>
                                                <Card.Title className="fw-bold">{unit.name}</Card.Title>
                                                <h5 className="text-orange fw-medium">{formatPriceRange(unit.price, unit.price)}</h5>
                                                <div className="d-flex flex-wrap gap-3 text-muted small mt-2">
                                                    <span><Bed size={14} className="me-1" /> {unit.bedrooms}</span>
                                                    <span><Bath size={14} className="me-1" /> {unit.bathrooms}</span>
                                                    <span><Car size={14} className="me-1" /> {unit.garage}</span>
                                                </div>
                                                <Button as={Link} to={`/projects/${projectId}/units/${unit.id}`} variant="outline-orange" className="w-100 mt-3">
                                                    Lihat Detail Unit <ExternalLink size={16} className="ms-1"/>
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : <Alert variant="secondary">Informasi tipe unit belum tersedia.</Alert>}
                    </Col>
                    
                    {/* --- Kolom Sidebar --- */}
                    <Col lg={4}>
                        {/* Promo */}
                        {project.promo && (
                            <Card className="shadow-sm border-0 mb-4">
                                <Card.Body className="p-4">
                                    <h4 className="fw-bold d-flex align-items-center"><Tag className="me-2 text-orange" /> Promo Spesial</h4>
                                    <p className="text-muted">{project.promo}</p>
                                </Card.Body>
                            </Card>
                        )}

                        {/* Lokasi */}
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Body className="p-4">
                                <h4 className="fw-bold d-flex align-items-center"><MapPin className="me-2 text-orange" /> Lokasi Proyek</h4>
                                <p className="text-muted">{project.location}</p>
                                <Button as="a" href={project.googleMapsUrl} target="_blank" rel="noopener noreferrer" variant="dark" className="w-100">
                                    Lihat di Google Maps
                                </Button>
                            </Card.Body>
                        </Card>

                        {/* Lokasi Terdekat */}
                        {project.nearbyLocations && Object.keys(project.nearbyLocations).length > 0 && (
                            <Card className="shadow-sm border-0 mb-4">
                                <Card.Body className="p-4">
                                    <h4 className="fw-bold mb-3">Lokasi Terdekat</h4>
                                    <ul className="list-unstyled">
                                        {Object.entries(project.nearbyLocations).map(([key, value]) => (
                                            <li key={key} className="d-flex mb-2">
                                                <div className="me-2">{nearbyIconMapping[key.toLowerCase()] || <Building size={20} className="text-orange" />}</div>
                                                <div>
                                                    <strong className="text-capitalize">{key}</strong>
                                                    <p className="text-muted small mb-0">{value}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>

                {/* --- Galeri & Brosur --- */}
                <Row className="mt-5">
                    {/* Galeri Foto */}
                    {project.images?.length > 0 && (
                        <Col md={12} className="mb-4">
                            <h3 className="fw-bold mb-3">Galeri Proyek</h3>
                            <Row className="g-3">
                                {project.images.map((img, idx) => (
                                    <Col md={4} sm={6} key={idx}>
                                        <img src={img} alt={`Galeri ${idx + 1}`} className="img-fluid rounded shadow-sm" style={{ aspectRatio: '4/3', objectFit: 'cover' }}/>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}

                    {/* Brosur */}
                    {project.brochureLink && (
                        <Col md={12}>
                             <h3 className="fw-bold mb-3">Brosur</h3>
                             <Alert variant="info" className="d-flex justify-content-between align-items-center">
                                <span>Dapatkan informasi lengkap dalam brosur resmi kami.</span>
                                <Button as="a" href={project.brochureLink} target="_blank" rel="noopener noreferrer" variant="primary">
                                    <Download size={16} className="me-2" /> Unduh Brosur
                                </Button>
                             </Alert>
                        </Col>
                    )}
                </Row>
            </Container>

            {project && <WhatsappInquiryModal show={showWhatsappModal} handleClose={() => setShowWhatsappModal(false)} project={project} />}
        </div>
    );
};

export default ProjectDetailPage;