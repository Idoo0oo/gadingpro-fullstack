import { Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";


import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import GetBrosurePage from "./pages/GetBrosurePage";
import ContactPage from './pages/ContactPage';
import ScrollToTop from "./components/ScrollToTop";

function App() {
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
