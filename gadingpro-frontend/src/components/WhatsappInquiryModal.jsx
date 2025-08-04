// gadingpro-frontend/src/components/WhatsappInquiryModal.jsx
import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { Send, User, Home, MessageSquare, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappInquiryModal = ({ show, handleClose, project }) => {
    const [formData, setFormData] = useState({
        name: '',
        unitType: '',
        phone: '', // Menambahkan field nomor telepon
        message: `Halo, saya tertarik dengan proyek ${project?.name}. Bisakah saya mendapatkan informasi lebih lanjut?`,
    });
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'submitting', 'success', 'error'
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        setError('');

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/public/inquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify({
                    ...formData,
                    type: 'whatsapp', // Mengirim tipe inquiry yang benar
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal mengirim permintaan.');
            }

            setSubmissionStatus('success');
            // Reset form setelah berhasil
            setFormData({ name: '', unitType: '', phone: '', message: '' });
            // Tutup modal setelah 2 detik
            setTimeout(() => {
                handleClose();
                setSubmissionStatus(null); 
            }, 2000);

        } catch (err) {
            setSubmissionStatus('error');
            setError(err.message);
            console.error('Inquiry submission error:', err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered dialogClassName="whatsapp-modal-dialog">
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold text-orange d-flex align-items-center">
                    <Send size={24} className="me-2" />
                    Tertarik dengan {project?.name}?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {submissionStatus === 'success' ? (
                    <Alert variant="success">
                        <h4 className="alert-heading">Berhasil Terkirim!</h4>
                        <p>Terima kasih! Tim kami akan segera menghubungi Anda melalui WhatsApp.</p>
                    </Alert>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        {submissionStatus === 'error' && (
                            <Alert variant="danger">
                                Gagal mengirim: {error}
                            </Alert>
                        )}
                        <p className="text-muted small mb-3">
                            Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.
                        </p>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-medium">Nama Lengkap</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text"><User size={20} /></span>
                                <Form.Control
                                    type="text" name="name"
                                    placeholder="Nama Lengkap Anda"
                                    value={formData.name} onChange={handleChange}
                                    required disabled={submissionStatus === 'submitting'}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-medium">Nomor WhatsApp</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text"><FaWhatsapp size={20} /></span>
                                <Form.Control
                                    type="tel" name="phone"
                                    placeholder="081234567890"
                                    value={formData.phone} onChange={handleChange}
                                    required disabled={submissionStatus === 'submitting'}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-medium">Tipe Unit yang Diminati</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text"><Home size={20} /></span>
                                <Form.Select name="unitType" value={formData.unitType} onChange={handleChange} required disabled={submissionStatus === 'submitting'}>
                                    <option value="">Pilih Tipe Unit...</option>
                                    {project?.unitTypes?.map(unit => (
                                        <option key={unit.id} value={unit.name}>{unit.name}</option>
                                    ))}
                                    <option value="Informasi Umum">Saya butuh informasi umum</option>
                                </Form.Select>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label className="fw-medium">Pesan Singkat</Form.Label>
                             <div className="input-group">
                                <span className="input-group-text"><MessageSquare size={20} /></span>
                                <Form.Control
                                    as="textarea" name="message" rows={3}
                                    value={formData.message} onChange={handleChange}
                                    disabled={submissionStatus === 'submitting'}
                                />
                            </div>
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="success" type="submit" disabled={submissionStatus === 'submitting'} className="fw-bold py-2">
                                {submissionStatus === 'submitting' ? (
                                    <><Loader2 className="me-2 animate-spin" size={18} /> Mengirim...</>
                                ) : (
                                    'Kirim Permintaan'
                                )}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default WhatsappInquiryModal;