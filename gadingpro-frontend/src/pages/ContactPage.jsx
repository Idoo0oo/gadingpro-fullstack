// src/pages/ContactPage.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import komponen
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';
import CompanyMaps from '../components/CompanyMaps';
import FaqComponent from '../components/FaqComponent'; // Opsional jika ingin ada FAQ

const ContactPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-sine',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="contact-page page-with-navbar-padding" style={{ backgroundColor: '#f8f9fa' }}>
      <ContactInfo />
      <ContactForm />
      <CompanyMaps />

      {/* FAQ Section (Opsional) */}
      <section className="bg-white py-5">
        <div className="container">
          <FaqComponent />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;