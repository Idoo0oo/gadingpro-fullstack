// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "scroll to top" di setiap perubahan pathname
    window.scrollTo(0, 0);
  }, [pathname]); // Bergantung pada pathname

  return null; // Komponen ini tidak me-render apapun
};

export default ScrollToTop;