// gadingpro-frontend/src/pages/ArticlesPage.jsx (FIXED)

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-sine',
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${backendUrl}/public/articles`;

        const response = await fetch(apiUrl, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // --- PERBAIKAN 1: FUNGSI UNTUK MENGHAPUS TAG HTML ---
  // Fungsi ini akan membersihkan deskripsi dari tag HTML agar tampil sebagai teks biasa.
  const stripHtml = (html) => {
    if (!html) return '';
    // Cara modern untuk mengubah HTML menjadi teks biasa menggunakan browser API
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };


  if (loading) {
    return (
      <div className="page-with-navbar-padding text-center py-5">
        <p>Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-with-navbar-padding text-center text-danger py-5">
        <p>Gagal memuat artikel: {error}</p>
      </div>
    );
  }

  return (
    <div className="articles-page page-with-navbar-padding" style={{ backgroundColor: '#f8f9fa' }}>
      <section className="py-5">
        <Container>
          <Row className="mb-5 text-center" data-aos="fade-up">
            <Col>
              <h2 className="fw-bold mb-3 text-dark">Panduan & Tips Properti</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                Temukan wawasan, panduan, dan tips terbaru dari para ahli kami untuk membantu Anda dalam perjalanan properti Anda.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {articles.length > 0 ? (
              articles.map((article, index) => {

                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                let displayImageUrl = article.imageUrl;

                if (article.imageUrl && !article.imageUrl.startsWith('http') && !article.imageUrl.startsWith('data:image')) {
                  displayImageUrl = `${backendUrl}${article.imageUrl}`;
                }

                return (
                  <Col key={article.id} lg={4} md={6}>
                    <Card className="shadow-sm border-0 h-100 article-card" data-aos="fade-up" data-aos-delay={index * 100}>
                      <Card.Img
                        variant="top"
                        src={displayImageUrl} // <-- Gunakan URL yang sudah diperbaiki
                        alt={article.title}
                        style={{ height: '220px', objectFit: 'cover' }}
                        // Tambahkan ini untuk handle jika gambar benar-benar tidak ada
                        onError={(e) => { e.target.onerror = null; e.target.src='https://via.placeholder.com/400x220.png?text=Image+Not+Found' }}
                      />
                      <Card.Body className="d-flex flex-column p-4">
                        <div className="mb-2">
                          <Badge pill bg="orange-light" text="orange">{article.category}</Badge>
                        </div>
                        <Card.Title className="fw-bold mb-3 flex-grow-1">{article.title}</Card.Title>
                        <Card.Text className="text-muted small mb-3">
                          {/* Terapkan fungsi stripHtml di sini */}
                          {stripHtml(article.content).substring(0, 120)}...
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center text-muted mt-auto">
                           <small>Oleh: {article.author}</small>
                           <small>{new Date(article.publishedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</small>
                        </div>
                          <Link to={`/articles/${article.slug}`} className="btn btn-outline-orange mt-3">
                              Baca Selengkapnya
                          </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })
            ) : (
              <Col className="text-center py-5">
                <p className="text-muted">Belum ada artikel yang tersedia saat ini.</p>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ArticlesPage;