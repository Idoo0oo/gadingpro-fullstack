// gadingpro-frontend/src/pages/ArticleDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';

const ArticleDetailPage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/public/articles/${slug}`, {
                    headers: { 'ngrok-skip-browser-warning': 'true' }
                });
                if (!response.ok) {
                    throw new Error('Artikel tidak ditemukan');
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
        return <div className="page-with-navbar-padding text-center py-5">Memuat artikel...</div>;
    }

    if (error) {
        return <div className="page-with-navbar-padding text-center text-danger py-5">Error: {error}</div>;
    }

    if (!article) {
        return null;
    }

    return (
        <div className="article-detail-page page-with-navbar-padding bg-light">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Link to="/articles" className="btn btn-link text-muted mb-4 d-inline-flex align-items-center px-0">
                            <ArrowLeft size={16} className="me-2" />
                            Kembali ke Semua Artikel
                        </Link>
                        
                        <article>
                            <header className="mb-4">
                                <h1>{article.title}</h1>
                                <div className="d-flex align-items-center text-muted mt-3">
                                    <Badge pill bg="orange-light" text="orange" className="me-3">{article.category}</Badge>
                                    <span>Oleh: {article.author}</span>
                                    <span className="mx-2">•</span>
                                    <span>{new Date(article.publishedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            </header>
                            
                            <img src={article.imageUrl} alt={article.title} className="img-fluid rounded-3 mb-4 w-100" style={{maxHeight: '400px', objectFit: 'cover'}}/>
                            
                            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
                        </article>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ArticleDetailPage;