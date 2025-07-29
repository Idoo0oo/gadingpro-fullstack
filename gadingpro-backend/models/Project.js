// gadingpro-backend/models/Project.js (Setelah Dimodifikasi)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  developer: DataTypes.STRING, // <-- BARU
  location: DataTypes.STRING,
  googleMapsUrl: DataTypes.STRING, // <-- BARU (untuk lokasi Gmaps)
  priceMin: DataTypes.BIGINT, // <-- BARU (range harga min)
  priceMax: DataTypes.BIGINT, // <-- BARU (range harga max)
  status: DataTypes.STRING,
  brochureLink: DataTypes.STRING,
  image: DataTypes.TEXT('medium'), // Banner utama proyek
  images: { // Galeri foto proyek
    type: DataTypes.TEXT('medium'),
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    }
  },
  promo: DataTypes.TEXT, // <-- BARU (untuk promo, opsional)
  nearbyLocations: { // <-- BARU (untuk lokasi terdekat)
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('nearbyLocations');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('nearbyLocations', JSON.stringify(value));
    }
  },
  description: DataTypes.TEXT,
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'projects'
});

module.exports = Project;