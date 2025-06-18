// src/components/ProjectsContent.jsx
import React from 'react';
import { Filter, Grid3X3, List } from 'lucide-react';
import ProjectCard from './ProjectCard'; // Pastikan path benar
import ProjectFilters from './ProjectFilters'; // Pastikan path benar
import ProjectStats from './ProjectStats'; // Pastikan path benar

const ProjectsContent = ({
  stats,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filteredProjects,
  handleOpenModal, // Diterima sebagai prop
  resetFilters // Akan kita tambahkan fungsi ini di ProjectsPage
}) => {
  return (
    <div className="container position-relative" style={{ marginTop: '-4rem', zIndex: 10 }}>
      {/* Stats Section */}
      <ProjectStats {...stats} />

      {/* Filters Section */}
      <ProjectFilters
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
      />

      {/* Results Header */}
      <div className="card shadow-lg mb-5" data-aos="fade-up">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
            <div>
              <h2 className="h3 fw-bold text-dark mb-2">
                {filteredProjects.length} Project Ditemukan
              </h2>
              <p className="text-muted mb-0">
                {searchTerm && `Hasil pencarian untuk "${searchTerm}"`}
                {selectedCategory !== 'Semua' && ` • Kategori: ${selectedCategory}`}
                {selectedLocation !== 'Semua Lokasi' && ` • Lokasi: ${selectedLocation}`}
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="d-flex align-items-center mt-3 mt-sm-0">
              <span className="small text-muted me-2">Tampilan:</span>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`btn ${viewMode === 'grid' ? 'btn-warning' : 'btn-outline-secondary'}`}
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`btn ${viewMode === 'list' ? 'btn-warning' : 'btn-outline-secondary'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length > 0 ? (
        <div className={`row g-4 mb-5 ${viewMode === 'list' ? 'row-cols-1' : 'row-cols-1 row-cols-md-2 row-cols-lg-3'}`}>
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="col">
              <ProjectCard
                project={project}
                index={index}
                onViewDetails={handleOpenModal}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5" data-aos="fade-up">
          <div className="card shadow-lg mx-auto" style={{ maxWidth: '400px' }}>
            <div className="card-body p-5">
              <Filter className="text-muted mx-auto mb-3" size={64} />
              <h3 className="h4 fw-bold text-dark mb-2">
                Tidak Ada Project Ditemukan
              </h3>
              <p className="text-muted mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <button
                onClick={resetFilters} // Memanggil fungsi resetFilters dari prop
                className="btn btn-warning fw-semibold px-4 py-2"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsContent;