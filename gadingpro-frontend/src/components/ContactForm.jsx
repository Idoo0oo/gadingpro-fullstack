// gadingpro-fullstack/gadingpro-frontend/src/components/ContactForm.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';
import AOS from 'aos';

const ContactForm = () => {
  // State untuk mengelola status pengiriman formulir
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting', null
  const [error, setError] = useState(null); // State untuk menyimpan pesan error
  
  // State untuk mengelola data formulir
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Handler untuk perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler untuk submit formulir
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman default
    setSubmissionStatus('submitting'); // Set status menjadi 'submitting'
    setError(null); // Hapus error sebelumnya

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/inquiry`, {
            method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type: 'contact' }), // Kirim data formulir dengan tipe 'contact'
      });

      if (!response.ok) {
        // Jika respons tidak OK (misalnya 400, 500), tangani error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Terjadi kesalahan saat mengirim pesan.');
      }

      // Jika berhasil
      setSubmissionStatus('success'); // Set status menjadi 'success'
      setFormData({ name: '', email: '', phone: '', message: '' }); // Kosongkan formulir
    } catch (err) {
      // Tangani error jika terjadi masalah pada fetch
      setSubmissionStatus('error'); // Set status menjadi 'error'
      setError(err.message); // Simpan pesan error
      console.error('Form submission error:', err);
    }
  };

  return (
    <section className="py-5" data-aos="fade-up">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">
              <h4 className="fw-bold text-center text-orange mb-4">
                Kirim Pesan kepada Kami
              </h4>
              
              {/* Pesan Sukses */}
              {submissionStatus === 'success' && (
                <Alert variant="success" className="mb-4 d-inline-block">
                  <h4 className="alert-heading">Pesan Terkirim!</h4>
                  <p>Terima kasih atas pesan Anda. Kami akan segera meresponsnya.</p>
                  <hr />
                  <p className="mb-0">Mohon tunggu balasan dari kami.</p>
                </Alert>
              )}

              {/* Pesan Error */}
              {submissionStatus === 'error' && (
                <Alert variant="danger" className="mb-4 d-inline-block">
                  <h4 className="alert-heading">Gagal Mengirim!</h4>
                  <p>Terjadi kesalahan saat mengirim permintaan: {error}</p>
                  <hr />
                  <p className="mb-0">Mohon coba lagi nanti.</p>
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Nama Lengkap <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><User size={20} /></span>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Nama Lengkap Anda"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          disabled={submissionStatus === 'submitting'}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium">Email <span className="text-danger">*</span></Form.Label>
                      <div className="input-group">
                        <span className="input-group-text"><Mail size={20} /></span>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="email@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          disabled={submissionStatus === 'submitting'}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">Nomor Telepon/WhatsApp <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><Phone size={20} /></span>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="081234567890"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={submissionStatus === 'submitting'}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Pesan Anda <span className="text-danger">*</span></Form.Label>
                  <div className="input-group">
                    <span className="input-group-text"><MessageSquare size={20} /></span>
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={5}
                      placeholder="Tuliskan pesan Anda di sini..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      disabled={submissionStatus === 'submitting'}
                    />
                  </div>
                </Form.Group>

                <Button
                  variant="orange"
                  type="submit"
                  className="w-100 fw-bold py-3 rounded-3"
                  disabled={submissionStatus === 'submitting'}
                >
                  {submissionStatus === 'submitting' ? 'Mengirim Pesan...' : 'Kirim Pesan'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactForm;