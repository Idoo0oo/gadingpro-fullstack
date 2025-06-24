// gadingpro-fullstack/gadingpro-frontend/src/components/RequestBrochureForm.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Send, Mail, User, Phone } from 'lucide-react';
import AOS from 'aos';


const RequestBrochureForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting', null
  const [error, setError] = useState(null); // State untuk menyimpan pesan error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`<span class="math-inline">\{window\.location\.origin\}</span>{import.meta.env.VITE_APP_API_URL}/inquiry`, { // Tambahkan window.location.origin
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type: 'brochure' }), // Add type
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong during submission.');
      }

      setSubmissionStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
    } catch (err) {
      setSubmissionStatus('error');
      setError(err.message);
      console.error('Form submission error:', err);
    }
  };

  return (
    <section className="py-5 bg-light" data-aos="fade-up">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <h2 className="fw-bold mb-3">Tidak menemukan brosur yang Anda cari?</h2>
            <p className="text-muted lead">
              Isi formulir di bawah ini dan kami akan menghubungi Anda untuk memberikan informasi lebih lanjut atau brosur kustom.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={7}>
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5">
              <h4 className="fw-bold text-center text-orange mb-4">
                <Send className="me-2" size={24} /> Kirim Permintaan Brosur
              </h4>
              {submissionStatus === 'success' && (
                <Alert variant="success" className="mb-4 d-inline-block">
                  <h4 className="alert-heading">Terima Kasih!</h4>
                  <p>Permintaan brosur Anda telah berhasil kami terima. Kami akan segera menghubungi Anda.</p>
                  <hr />
                  <p className="mb-0">Silakan cek email Anda untuk konfirmasi.</p>
                </Alert>
              )}
              {submissionStatus === 'error' && (
                <Alert variant="danger" className="mb-4 d-inline-block">
                  <h4 className="alert-heading">Submission Failed!</h4>
                  <p>There was an error sending your request: {error}</p>
                  <hr />
                  <p className="mb-0">Please try again later.</p>
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
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
                  <Form.Label className="fw-medium">Pesan (Opsional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={3}
                    placeholder="Sampaikan kebutuhan spesifik Anda..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={submissionStatus === 'submitting'}
                  />
                </Form.Group>
                <Button
                  variant="orange"
                  type="submit"
                  className="w-100 fw-bold py-3 rounded-3"
                  disabled={submissionStatus === 'submitting'}
                >
                  {submissionStatus === 'submitting' ? 'Mengirim...' : 'Kirim Permintaan'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RequestBrochureForm;