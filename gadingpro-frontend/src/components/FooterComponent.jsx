import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div className="footer py-5 pb-2">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5" >
          <img
                src="https://agents-events-prod.storage.googleapis.com/wp-content/uploads/sites/20/2024/03/20035510/Gading-Pro-Logo.png"
                alt="GadingPro Logo"
                height="55"
            />
          <p className="desc pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, laborum! Veniam perspiciatis quas rerum officiis maxime tempora assumenda consectetur commodi.</p>
          <div className="no mb-1 mt-4">
            <Link className="text-decoration-none">
            <i className="fa-brands fa-whatsapp"></i>
            <p className="m-0">+62 838-3753-4805</p>
            </Link>
          </div>
          <div className="mail">
            <Link className="text-decoration-none">
            <i className="fa-regular fa-envelope"></i>
            <p className="m-0">gadingpro@gmail.com</p>
            </Link>
          </div>
          </Col>
          <Col className="d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
          <h5 className="fw-bold">Menu</h5>
          <Link to="">Home</Link>
          <Link to="about">About</Link>
          <Link to="projects">Projects</Link>
          <Link to="get-brosure">Get Brochure</Link>
          <Link to="contact-us">Contact Us</Link>
          </Col>
          <Col lg="4" className="mt-lg-0 mt-5">
          <h5 className="fw-bold mb-3">Subscribe Untuk Info Menarik</h5>
          <div className="subscribes">
            <input type="text" placeholder="Subscribe..." />
            <button className="btn btn-outline-orange rounded-end rounded-0">Subscribe</button>
          </div>
          <div className="social mt-2">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
          </Col>
        </Row>
        <Row>
          <hr className="border-secondary mt-5" />
          <Col>
          <p className="text-center px-md-0 px-3">&copy; CopyRight {new Date().getFullYear()} by <span className="fw-bold">GadingPro</span>, All Right Reserve</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FooterComponent