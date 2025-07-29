// gadingpro-frontend/src/pages/UnitTypeDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Carousel, Button, Card, ListGroup, Breadcrumb } from 'react-bootstrap';
import { Home, Bed, Bath, Car, ArrowLeft, RulerCombined } from 'lucide-react';

const UnitTypeDetailPage = () => {
    const { projectId, unitId } = useParams();
    const navigate = useNavigate();
    const [unitData, setUnitData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUnit = async () => {
            setLoading(true);
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/public/units/${unitId}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (!response.ok) throw new Error('Tipe unit tidak ditemukan.');
                const data = await response.json();
                setUnitData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUnit();
    }, [unitId]);

    const formatPrice = (price) => {
        if (!price) return "Harga Hubungi Kami";
        return `Rp ${price.toLocaleString('id-ID')}`;
    };

    if (loading) return <div className="text-center py-5 page-with-navbar-padding">Memuat data unit...</div>;
    if (error) return <div className="text-center py-5 page-with-navbar-padding text-danger">Error: {error}</div>;

    const { unitType, otherUnitTypes } = unitData;

    return (
        <div className="bg-light page-with-navbar-padding">
            <Container className="py-4">
                {/* --- Breadcrumb & Navigasi --- */}
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projects" }}>Projects</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/projects/${projectId}` }}>
                        {unitData.unitType.Project?.name || 'Detail Proyek'}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{unitType.name}</Breadcrumb.Item>
                </Breadcrumb>
                <Button variant="outline-secondary" size="sm" onClick={() => navigate(`/projects/${projectId}`)} className="mb-4">
                    <ArrowLeft size={16} className="me-2" /> Kembali ke Proyek
                </Button>

                <Row className="g-4">
                    {/* --- Galeri & Info Utama --- */}
                    <Col lg={7}>
                        {unitType.images?.length > 0 ? (
                            <Carousel>
                                {unitType.images.map((img, idx) => (
                                    <Carousel.Item key={idx}>
                                        <img src={img} className="d-block w-100 rounded" alt={`Gambar ${idx + 1}`} style={{ height: '450px', objectFit: 'cover' }} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center bg-secondary text-white rounded" style={{ height: '450px' }}>
                                <span>Gambar tidak tersedia</span>
                            </div>
                        )}
                    </Col>
                    <Col lg={5}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="p-4">
                                <h1 className="fw-bold text-dark">{unitType.name}</h1>
                                <p className="text-muted">Bagian dari {unitData.unitType.Project?.name}</p>
                                <h2 className="text-orange fw-bolder my-3">{formatPrice(unitType.price)}</h2>
                                <hr />
                                <h5 className="fw-bold">Informasi Properti</h5>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span><RulerCombined size={16} className="me-2"/>Luas Tanah</span>
                                        <strong>{unitType.landSize} m²</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span><Home size={16} className="me-2"/>Luas Bangunan</span>
                                        <strong>{unitType.buildingSize} m²</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span><Bed size={16} className="me-2"/>Kamar Tidur</span>
                                        <strong>{unitType.bedrooms}</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span><Bath size={16} className="me-2"/>Kamar Mandi</span>
                                        <strong>{unitType.bathrooms}</strong>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between">
                                        <span><Car size={16} className="me-2"/>Garasi</span>
                                        <strong>{unitType.garage} Mobil</strong>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
                {/* --- Spesifikasi Teknis --- */}
                <Row className="mt-5">
                    <Col>
                        <h3 className="fw-bold mb-3">Spesifikasi Teknis</h3>
                        {unitType.specifications && Object.keys(unitType.specifications).length > 0 ? (
                            <Card className="shadow-sm border-0">
                                <Card.Body>
                                    <Row>
                                        {Object.entries(unitType.specifications).map(([key, value]) => (
                                            <Col md={4} sm={6} key={key} className="mb-3">
                                                <strong className="text-capitalize d-block">{key}</strong>
                                                <span className="text-muted">{value}</span>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        ) : <p className="text-muted">Spesifikasi teknis tidak tersedia.</p>}
                    </Col>
                </Row>

                {/* --- Tipe Unit Lain --- */}
                {otherUnitTypes?.length > 0 && (
                     <Row className="mt-5">
                        <Col>
                            <h3 className="fw-bold mb-3">Lihat Tipe Unit Lainnya</h3>
                            <Row className="g-3">
                                {otherUnitTypes.map(otherUnit => (
                                    <Col md={6} lg={4} key={otherUnit.id}>
                                       <Card as={Link} to={`/projects/${projectId}/units/${otherUnit.id}`} className="h-100 shadow-sm border-0 text-decoration-none text-dark">
                                            <Card.Img variant="top" src={otherUnit.images?.[0]} style={{ height: '180px', objectFit: 'cover' }} />
                                            <Card.Body>
                                                <Card.Title className="fw-bold">{otherUnit.name}</Card.Title>
                                                <p className="text-orange fw-medium">{formatPrice(otherUnit.price)}</p>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default UnitTypeDetailPage;