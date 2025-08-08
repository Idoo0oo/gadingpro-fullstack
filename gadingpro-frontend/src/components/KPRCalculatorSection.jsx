import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const KPRCalculatorSection = () => {
  const [kprData, setKprData] = useState({
    hargaRumah: "",
    uangMuka: "",
    jangkaWaktu: 15,
    sukuBunga: 6.5,
  });

  const [hasilKPR, setHasilKPR] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const hitungKPR = () => {
    const harga = parseFloat(kprData.hargaRumah);
    const uangMuka = parseFloat(kprData.uangMuka);
    const tahun = parseInt(kprData.jangkaWaktu);
    const bunga = parseFloat(kprData.sukuBunga);

    if (!harga || !uangMuka || harga <= uangMuka) {
      alert("Mohon isi data dengan benar");
      return;
    }

    const pokokPinjaman = harga - uangMuka;
    const bungaBulanan = bunga / 100 / 12;
    const jumlahBulan = tahun * 12;

    const angsuranBulanan =
      (pokokPinjaman *
        (bungaBulanan * Math.pow(1 + bungaBulanan, jumlahBulan))) /
      (Math.pow(1 + bungaBulanan, jumlahBulan) - 1);

    const totalPembayaran = angsuranBulanan * jumlahBulan;
    const totalBunga = totalPembayaran - pokokPinjaman;

    setHasilKPR({
      pokokPinjaman,
      angsuranBulanan,
      totalPembayaran,
      totalBunga,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKprData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="hitung-kpr" className="kpr-calculator py-5 bg-white">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h2 className="fw-bold mb-3">Kalkulator KPR</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
                Hitung simulasi angsuran KPR Anda dengan mudah dan akurat.
                Dapatkan gambaran jelas tentang kemampuan finansial sebelum
                memutuskan membeli properti.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-lg-5">
                <Row>
                  {/* Form Input */}
                  <Col lg={6} className="mb-4 mb-lg-0">
                    <h4 className="fw-bold mb-4 text-orange">
                      <i className="fa-solid fa-calculator me-2"></i>
                      Input Data KPR
                    </h4>

                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Harga Rumah (Rp)
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="hargaRumah"
                        value={
                          kprData.hargaRumah
                            ? new Intl.NumberFormat("id-ID").format(
                                kprData.hargaRumah
                              )
                            : ""
                        }
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\./g, "");
                          setKprData({ ...kprData, hargaRumah: rawValue });
                        }}
                        placeholder="500.000.000"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Uang Muka (Rp)
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="uangMuka"
                        value={
                          kprData.uangMuka
                            ? new Intl.NumberFormat("id-ID").format(
                                kprData.uangMuka
                              )
                            : ""
                        }
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\./g, "");
                          setKprData({ ...kprData, uangMuka: rawValue });
                        }}
                        placeholder="100.000.000"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium">
                        Jangka Waktu (Tahun)
                      </label>
                      <select
                        className="form-select form-select-md"
                        name="jangkaWaktu"
                        value={kprData.jangkaWaktu}
                        onChange={handleInputChange}
                      >
                        <option value={5}>5 Tahun</option>
                        <option value={10}>10 Tahun</option>
                        <option value={15}>15 Tahun</option>
                        <option value={20}>20 Tahun</option>
                        <option value={25}>25 Tahun</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-medium">
                        Suku Bunga (% per tahun)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        className="form-control form-control-lg"
                        name="sukuBunga"
                        value={kprData.sukuBunga}
                        onChange={handleInputChange}
                        placeholder="6.5"
                      />
                    </div>

                    <button
                      className="btn btn-orange btn-lg w-100 rounded-3 fw-medium"
                      onClick={hitungKPR}
                    >
                      <i className="fa-solid fa-calculator me-2"></i>
                      Hitung Angsuran
                    </button>
                  </Col>

                  {/* Hasil Perhitungan */}
                  <Col lg={6}>
                    <h4 className="fw-bold mb-4 text-dark">
                      <i className="fa-solid fa-chart-line me-2"></i>
                      Hasil Perhitungan
                    </h4>

                    {hasilKPR ? (
                      <div className="hasil-kpr">
                        <div className="result-card bg-light p-3 rounded-3 mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">Pokok Pinjaman</span>
                            <span className="fw-bold text-dark">
                              {formatCurrency(hasilKPR.pokokPinjaman)}
                            </span>
                          </div>
                        </div>

                        <div className="result-card bg-light p-3 rounded-3 mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">
                              Angsuran per Bulan
                            </span>
                            <span className="fw-bold text-orange h5 mb-0">
                              {formatCurrency(hasilKPR.angsuranBulanan)}
                            </span>
                          </div>
                        </div>

                        <div className="result-card bg-light p-3 rounded-3 mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">
                              Total Pembayaran
                            </span>
                            <span className="fw-bold text-dark">
                              {formatCurrency(hasilKPR.totalPembayaran)}
                            </span>
                          </div>
                        </div>

                        <div className="result-card bg-light p-3 rounded-3 mb-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-muted">Total Bunga</span>
                            <span className="fw-bold text-dark">
                              {formatCurrency(hasilKPR.totalBunga)}
                            </span>
                          </div>
                        </div>

                        <div className="alert alert-info border-0 rounded-3">
                          <div className="d-flex">
                            <i className="fa-solid fa-info-circle text-info me-2 mt-1"></i>
                            <div>
                              <small className="text-info">
                                <strong>Catatan:</strong> Perhitungan ini
                                adalah simulasi dan hasil aktual dapat berbeda
                                tergantung kebijakan bank. Konsultasikan
                                dengan ahli keuangan untuk informasi lebih
                                detail.
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-5">
                        <i
                          className="fa-solid fa-chart-pie text-muted mb-3"
                          style={{ fontSize: "3rem" }}
                        ></i>
                        <p className="text-muted">
                          Masukkan data KPR Anda dan klik tombol "Hitung
                          Angsuran" untuk melihat hasil simulasi
                        </p>
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        {/* Tips Section */}
        <Row className="mt-5">
          <Col>
            <div className="tips-section bg-light p-4 rounded-4">
              <h5 className="fw-bold mb-3 text-center">
                <i className="fa-solid fa-lightbulb text-warning me-2"></i>
                Tips Mengajukan KPR
              </h5>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="tip-item text-center">
                    <div
                      className="tip-icon bg-orange text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <i className="fa-solid fa-piggy-bank text-secondary"></i>
                    </div>
                    <h6 className="fw-bold">Siapkan Uang Muka</h6>
                    <small className="text-muted">
                      Siapkan uang muka minimal 10-20% dari harga properti
                    </small>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="tip-item text-center">
                    <div
                      className="tip-icon bg-orange text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <i className="fa-solid fa-file-alt text-secondary"></i>
                    </div>
                    <h6 className="fw-bold">Lengkapi Dokumen</h6>
                    <small className="text-muted">
                      Pastikan semua dokumen persyaratan sudah lengkap dan
                      valid
                    </small>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="tip-item text-center">
                    <div
                      className="tip-icon bg-orange text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <i className="fa-solid fa-balance-scale text-secondary"></i>
                    </div>
                    <h6 className="fw-bold">Sesuaikan Kemampuan</h6>
                    <small className="text-muted">
                      Pastikan angsuran tidak melebihi 30% dari penghasilan
                      bulanan
                    </small>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default KPRCalculatorSection;