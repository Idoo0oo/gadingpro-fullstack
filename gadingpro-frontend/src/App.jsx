import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom"; // Cukup import Routes dan Route

// Library dan CSS
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/main.css';

// Komponen
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load semua halaman
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const UnitTypeDetailPage = lazy(() => import('./pages/UnitTypeDetailPage'));

// Komponen fallback untuk Suspense
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

function App() {
  console.log('Nilai VITE_BACKEND_URL dari .env:', import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Hapus tag <Router> dari sini, karena sudah ada di main.jsx
  return (
    <div>
      <NavbarComponent />
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/projects/:projectId/units/:unitId" element={<UnitTypeDetailPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/contact-us" element={<ContactPage />} />

        </Routes>
      </Suspense>
      <FooterComponent />
    </div>
  )
}

export default App;