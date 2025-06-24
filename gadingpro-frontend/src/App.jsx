// gadingpro-fullstack/gadingpro-frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react'; // Import useEffect
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";


import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import GetBrosurePage from "./pages/GetBrosurePage";
import ContactPage from './pages/ContactPage';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // Inisialisasi AOS sekali di sini
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-sine',
      once: true,
      offset: 100,
    });
  }, []);

  return <div>
      <NavbarComponent />
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={AboutPage} />
        <Route path="/projects" Component={ProjectsPage} />
        <Route path="/get-brosure" Component={GetBrosurePage} />
        <Route path="/contact-us" Component={ContactPage} />
      </Routes>

      <FooterComponent />
  </div>
}

export default App