import React from 'react';
import { Building2, MapPin, Calendar, TrendingUp } from 'lucide-react';

const ProjectStats = ({
  totalProjects,
  totalLocations,
  completedProjects,
  averagePrice,
}) => {
  const stats = [
    {
      icon: Building2,
      label: 'Total Projects',
      value: totalProjects.toString(),
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10',
    },
    {
      icon: MapPin,
      label: 'Lokasi',
      value: totalLocations.toString(),
      color: 'text-success',
      bgColor: 'bg-success bg-opacity-10',
    },
    {
      icon: Calendar,
      label: 'Project Selesai',
      value: completedProjects.toString(),
      color: 'text-info',
      bgColor: 'bg-info bg-opacity-10',
    },
    {
      icon: TrendingUp,
      label: 'Rata-rata Harga',
      value: averagePrice,
      color: 'text-warning',
      bgColor: 'bg-warning bg-opacity-10',
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="col-12 col-sm-6 col-lg-3">
            <div 
              className="card h-100 shadow-sm border-0 position-relative overflow-hidden"
              style={{
                borderRadius: '1rem',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1 fw-medium">{stat.label}</p>
                    <h3 className="fw-bold text-dark mb-0" style={{ fontSize: '1.75rem' }}>
                      {stat.value}
                    </h3>
                  </div>
                  <div 
                    className={`${stat.bgColor} ${stat.color} p-3 rounded-3 d-flex align-items-center justify-content-center`}
                    style={{ width: '60px', height: '60px' }}
                  >
                    <IconComponent size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectStats;