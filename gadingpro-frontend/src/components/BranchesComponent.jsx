import { useState, useEffect } from 'react'; // Add useEffect
import { MapPin, Phone, Instagram, ChevronsUpDown } from 'lucide-react';

const BranchesComponent = () => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState([]); // State to hold branches fetched from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch branches from backend
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/branches'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBranches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);


  // Filter branches based on search term
  const filteredBranches = branches.filter(branch =>
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBranches = searchTerm.length > 0
    ? filteredBranches
    : (showAll ? branches : branches.slice(0, 4));

  if (loading) {
    return <section className="py-5 bg-light text-center">Loading branches...</section>;
  }

  if (error) {
    return <section className="py-5 bg-light text-center text-danger">Error: {error}</section>;
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">
            Cabang Perusahaan
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
            Tersebar di berbagai kota besar Indonesia untuk melayani Anda dengan lebih baik
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="input-group" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Cari cabang (kota, nama, alamat)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </button>
          </div>
          {searchTerm && (
            <div className="text-center mt-2">
              <small className="text-muted">
                Menampilkan {filteredBranches.length} hasil pencarian
              </small>
            </div>
          )}
        </div>

        <div className="row">
          {displayedBranches.length > 0 ? (
            displayedBranches.map((branch) => (
              <div key={branch.id} className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm border-0 hover-shadow transition-all">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title font-weight-bold text-dark mb-0 mr-3">{branch.name}</h5>
                      <span
                        className="badge text-white px-3 py-1"
                        style={{ backgroundColor: "#ff6b35" }}
                      >
                        {branch.city}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex mb-2">
                        <MapPin className="flex-shrink-0 mr-2 mt-1" size={16} color="#ff6b35" />
                        <span className="text-muted small">{branch.address}</span>
                      </div>

                      <div className="d-flex">
                        <Phone className="flex-shrink-0 mr-2" size={16} color="#ff6b35" />
                        <span className="text-muted small">{branch.phone}</span>
                      </div>
                    </div>

                    <div className="d-flex" style={{ gap: '8px' }}>
                      <a
                        href={branch.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-orange btn-sm flex-grow-1 d-flex align-items-center justify-content-center py-1 px-2"
                      >
                        <i className="fa-solid fa-location-dot me-2"></i>
                        Google Maps
                      </a>

                      <a
                        href={branch.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-orange btn-sm flex-grow-1 d-flex align-items-center justify-content-center py-1 px-2"
                      >
                        <i className="fa-brands fa-instagram me-2"></i>
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4">
              <p className="text-muted">Tidak ada cabang yang ditemukan</p>
            </div>
          )}
        </div>

        {searchTerm.length === 0 && branches.length > 4 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-primary px-4 py-2 text-white d-flex align-items-center mx-auto"
              style={{ backgroundColor: "#ff6b35", borderColor: "#ff6b35" }}
            >
              <ChevronsUpDown className="mr-2" size={16} />
              {showAll ? 'Sembunyikan' : `Lihat Selengkapnya (${branches.length - 4} cabang lainnya)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BranchesComponent;