import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { projectCategories, projectLocations, priceRanges } from '../data/index';

const ProjectFilters = ({
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
}) => {
  const inputStyle = {
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease'
  };

  const focusStyle = {
    borderColor: '#f97316',
    boxShadow: '0 0 0 0.2rem rgba(249, 115, 22, 0.25)'
  };

  return (
    <div className="card shadow-lg mb-4" data-aos="fade-up" data-aos-delay="100">
      <div className="card-body p-4">
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <SlidersHorizontal className="text-warning me-3" size={24} />
          <h3 className="h5 fw-bold text-dark mb-0">Filter & Pencarian</h3>
        </div>

        {/* Search Bar */}
        <div className="position-relative mb-4">
          <div className="position-absolute top-50 start-0 translate-middle-y ps-3">
            <Search className="text-muted" size={20} />
          </div>
          <input
            type="text"
            className="form-control ps-5 py-3"
            style={inputStyle}
            placeholder="Cari berdasarkan nama project atau lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = focusStyle.borderColor;
              e.target.style.boxShadow = focusStyle.boxShadow;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Filters Grid */}
        <div className="row g-3">
          {/* Category Filter */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-semibold text-dark small">Kategori</label>
            <select
              className="form-select py-3"
              style={inputStyle}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = focusStyle.borderColor;
                e.target.style.boxShadow = focusStyle.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              {projectCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-semibold text-dark small">Lokasi</label>
            <select
              className="form-select py-3"
              style={inputStyle}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = focusStyle.borderColor;
                e.target.style.boxShadow = focusStyle.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              {projectLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-semibold text-dark small">Rentang Harga</label>
            <select
              className="form-select py-3"
              style={inputStyle}
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = focusStyle.borderColor;
                e.target.style.boxShadow = focusStyle.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label fw-semibold text-dark small">Urutkan</label>
            <select
              className="form-select py-3"
              style={inputStyle}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = focusStyle.borderColor;
                e.target.style.boxShadow = focusStyle.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="name">Nama A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;