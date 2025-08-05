// gadingpro-frontend/src/pages/ArticleDetailPage.jsx (FIXED)

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import 'aos/dist/aos.css';
import AOS from 'aos';

const ArticleDetailPage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/public/articles/${slug}`, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if (!response.ok) {
                    throw new Error('Artikel tidak ditemukan atau terjadi kesalahan server.');
                }
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="page-with-navbar-padding text-center py-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-with-navbar-padding text-center py-5">
                <Alert variant="danger">{error}</Alert>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="page-with-navbar-padding text-center py-5">
                <Alert variant="warning">Artikel tidak ditemukan.</Alert>
            </div>
        );
    }
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    let displayImageUrl = article.imageUrl; // Default

    if (article.imageUrl && !article.imageUrl.startsWith('http') && !article.imageUrl.startsWith('data:image')) {
        displayImageUrl = `${backendUrl}${article.imageUrl}`;
    }

    const sanitizedContent = DOMPurify.sanitize(article.content);

    return (
        <div className="article-detail-page page-with-navbar-padding bg-light">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <div data-aos="fade-up">
                            <Link to="/articles" className="btn btn-outline-secondary mb-4">
                                <FaArrowLeft className="me-2" /> Kembali ke Semua Artikel
                            </Link>

                            <h1 className="fw-bold mb-3">{article.title}</h1>

                            <div className="d-flex align-items-center text-muted mb-3">
                                <Badge pill bg="orange-light" text="orange" className="me-3">{article.category}</Badge>
                                <span>Oleh: {article.author}</span>
                                <span className="mx-2">|</span>
                                <span>{new Date(article.publishedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>

                            {/* --- GUNAKAN URL YANG SUDAH DIPERBAIKI --- */}
                            {article.imageUrl && (
                                <Card.Img
                                    src={displayImageUrl}
                                    alt={article.title}
                                    className="my-4 rounded shadow-sm"
                                    style={{ maxHeight: '450px', objectFit: 'cover', width: '100%' }}
                                />
                            )}
                            
                            <div
                                className="article-content mt-4"
                                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ArticleDetailPage;