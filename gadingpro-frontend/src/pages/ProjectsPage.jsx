// gadingpro-fullstack/gadingpro-frontend/src/pages/ProjectsPage.jsx (FIXED)
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
      setLoading(true);
      setError(null);

      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${backendUrl}/public/projects`;
        
        const response = await fetch(apiUrl, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response error:", errorText.substring(0, 500));
          throw new Error(`Server error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProjectsAll(data);

      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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
      
      // --- PERBAIKAN LOGIKA FILTER HARGA ---
      let matchesPrice = true;
      if (selectedPriceRange !== 'Semua Harga') {
        const priceMin = project.priceMin || 0;
        switch (selectedPriceRange) {
          case '< Rp 1 Miliar':
            matchesPrice = priceMin < 1000000000;
            break;
          case 'Rp 1 - 2 Miliar':
            matchesPrice = priceMin >= 1000000000 && priceMin < 2000000000;
            break;
          case 'Rp 2 - 3 Miliar':
            matchesPrice = priceMin >= 2000000000 && priceMin < 3000000000;
            break;
          case '> Rp 3 Miliar':
            matchesPrice = priceMin >= 3000000000;
            break;
          default:
            matchesPrice = true;
        }
      }
      return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    // --- PERBAIKAN LOGIKA SORTING ---
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.completionYear || 0) - (a.completionYear || 0);
        case 'oldest':
          return (a.completionYear || 0) - (b.completionYear || 0);
        case 'price-low':
          return (a.priceMin || 0) - (b.priceMin || 0);
        case 'price-high':
          return (b.priceMin || 0) - (a.priceMin || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projectsAll, searchTerm, selectedCategory, selectedLocation, selectedPriceRange, sortBy]);

  const stats = useMemo(() => {
    if (loading || error) {
      return {
        totalProjects: 0,
        totalLocations: 0,
        completedProjects: 0,
        averagePrice: 'N/A',
      };
    }
    
    const parsePriceForStats = (price) => {
      if (!price) return 0;
      // Menggunakan priceMin yang sudah numerik
      return price / 1000000; // Mengubah ke jutaan
    };

    const uniqueLocations = new Set(projectsAll.map(p => p.location));
    const totalLocations = uniqueLocations.size;
    const completedProjects = projectsAll.filter(p => p.status === 'Ready Stock').length;

    let totalPrices = 0;
    let validProjectsForAvg = 0;
    projectsAll.forEach(p => {
      const price = parsePriceForStats(p.priceMin);
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
  }, [projectsAll, loading, error]);

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