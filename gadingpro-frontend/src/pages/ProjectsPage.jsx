// gadingpro-fullstack/gadingpro-frontend/src/pages/ProjectsPage.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';

import ProjectsHero from '../components/ProjectsHero';
import ProjectsContent from '../components/ProjectsContent';
import FaqComponent from '../components/FaqComponent';

const ProjectsPage = () => {
  const [projectsAll, setProjectsAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedLocation, setSelectedLocation] = useState('Semua Lokasi');
  const [selectedPriceRange, setSelectedPriceRange] = useState('Semua Harga');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("1. Memulai fetchProjects..."); // Log Awal
      setLoading(true);
      setError(null);

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${backendUrl}/public/projects`;
        console.log("2. URL yang akan di-fetch:", apiUrl); // Log URL

        const response = await fetch(apiUrl, {
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

        // Mencetak info PENTING dari respons
        console.log("3. Respons diterima dari server. Status:", response.status);
        console.log("4. Content-Type Header:", response.headers.get('Content-Type'));

        // Cek jika Content-Type BUKAN JSON, meskipun status OK
        if (response.ok && !response.headers.get('Content-Type')?.includes('application/json')) {
            const text = await response.text();
            console.error("5a. Status OK, tapi Konten BUKAN JSON. Isinya:", text.substring(0, 500));
            throw new Error('Server returned HTML instead of JSON, even with a 200 OK status.');
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error("5b. Respons TIDAK OK. Isi teks:", errorText.substring(0, 500));
          throw new Error(`Server error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("6. Data JSON berhasil di-parse."); // Log Sukses
        setProjectsAll(data);

      } catch (err) {
        console.error("7. Terjadi ERROR di dalam blok try-catch:", err); // Log Error Fatal
        setError(err.message);
      } finally {
        console.log("8. Proses fetch selesai (finally block)."); // Log Akhir
        setLoading(false);
      }
    };

    fetchProjects();
}, []);
  const parsePrice = useCallback((priceString) => {
    if (!priceString) return 0;
    const numStr = priceString.replace(/[^\d.,]/g, '').replace(',', '.');
    const num = parseFloat(numStr);
    if (priceString.includes('Miliar')) return num * 1000;
    if (priceString.includes('Juta')) return num;
    return num;
  }, []);

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('Semua');
    setSelectedLocation('Semua Lokasi');
    setSelectedPriceRange('Semua Harga');
    setSortBy('newest');
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projectsAll.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.developer && project.developer.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'Semua' || project.category === selectedCategory;

      const matchesLocation = selectedLocation === 'Semua Lokasi' ||
        project.location.includes(selectedLocation);

      let matchesPrice = true;
      if (selectedPriceRange !== 'Semua Harga') {
        const projectPrice = parsePrice(project.price);
        switch (selectedPriceRange) {
          case '< Rp 1 Miliar':
            matchesPrice = projectPrice < 1000;
            break;
          case 'Rp 1 - 2 Miliar':
            matchesPrice = projectPrice >= 1000 && projectPrice < 2000;
            break;
          case 'Rp 2 - 3 Miliar':
            matchesPrice = projectPrice >= 2000 && projectPrice < 3000;
            break;
          case '> Rp 3 Miliar':
            matchesPrice = projectPrice >= 3000;
            break;
          default:
            matchesPrice = true;
        }
      }
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.completionYear || 0) - (a.completionYear || 0);
        case 'oldest':
          return (a.completionYear || 0) - (b.completionYear || 0);
        case 'price-low':
          return parsePrice(a.price) - parsePrice(b.price);
        case 'price-high':
          return parsePrice(b.price) - parsePrice(a.price);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projectsAll, searchTerm, selectedCategory, selectedLocation, selectedPriceRange, sortBy, parsePrice]);

  const stats = useMemo(() => {
    if (loading || error) {
      return {
        totalProjects: 0,
        totalLocations: 0,
        completedProjects: 0,
        averagePrice: 'N/A',
      };
    }

    const uniqueLocations = new Set(projectsAll.map(p => p.location));
    const totalLocations = uniqueLocations.size;
    const completedProjects = projectsAll.filter(p => p.status === 'Ready Stock').length;

    let totalPrices = 0;
    let validProjectsForAvg = 0;
    projectsAll.forEach(p => {
      const price = parsePrice(p.price);
      if (!isNaN(price) && price > 0) {
        totalPrices += price;
        validProjectsForAvg++;
      }
    });

    let averagePriceFormatted = 'N/A';
    if (validProjectsForAvg > 0) {
      const avgPrice = totalPrices / validProjectsForAvg;
      if (avgPrice >= 1000) {
        averagePriceFormatted = `Rp ${(avgPrice / 1000).toFixed(1)} M`;
      } else {
        averagePriceFormatted = `Rp ${avgPrice.toFixed(0)} Jt`;
      }
    }


    return {
      totalProjects: projectsAll.length,
      totalLocations,
      completedProjects,
      averagePrice: averagePriceFormatted,
    };
  }, [projectsAll, loading, error, parsePrice]);

  if (loading) {
    return <div className="text-center py-5 page-with-navbar-padding">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-5 page-with-navbar-padding text-danger">Error: {error}</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <ProjectsHero
        totalProjects={stats.totalProjects}
        totalLocations={stats.totalLocations}
      />

      <ProjectsContent
        stats={stats}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredProjects={filteredProjects}
        resetFilters={resetFilters}
      />

      <section className="bg-white py-5">
        <div className="container">
          <FaqComponent />
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;