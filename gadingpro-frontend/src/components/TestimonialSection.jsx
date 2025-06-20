import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { dataSwiper } from "../data"; // Pastikan path data sudah benar

const TestimonialSection = () => {
  return (
    <section className="testimonial py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col>
            <div className="text-center">
              <h2 className="fw-bold mb-3">Testimonial</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
                Dengarkan pengalaman nyata dari para klien yang telah
                mempercayai kami untuk mewujudkan hunian impian mereka.
              </p>
            </div>
          </Col>
        </Row>

        {/* Testimonial Slider */}
        <Row>
          <Col>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {dataSwiper.map((data) => (
                <SwiperSlide key={data.id} className="shadow-sm">
                  <div className="testimonial-card p-4 bg-white rounded-3 h-100">
                    {/* Bintang Emas ditambahkan di sini */}
                    <div className="rating mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                      ))}
                    </div>
                    <p className="desc mb-4">{data.desc}</p>
                    <div className="d-flex align-items-center">
                      <div className="people me-3">
                        <img
                          src={data.image}
                          alt={data.name}
                          className="rounded-circle"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div>
                        <h5 className="mb-1 fw-bold">{data.name}</h5>
                        <p className="m-0 text-muted small">{data.skill}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialSection;