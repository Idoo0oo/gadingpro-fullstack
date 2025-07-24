// gadingpro-backend/models/Project.js
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
  location: DataTypes.STRING,
  price: DataTypes.STRING,
  status: DataTypes.STRING,
  brochureLink: DataTypes.STRING,
  image: 'MEDIUMTEXT',
  images: {
    type: 'MEDIUMTEXT', // <<< UBAH DARI DataTypes.STRING MENJADI DataTypes.TEXT
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    }
  },
  bedrooms: DataTypes.INTEGER,
  bathrooms: DataTypes.INTEGER,
  garage: DataTypes.INTEGER,
  landSize: DataTypes.INTEGER,
  buildingSize: DataTypes.INTEGER,
  facilities: {
    type: DataTypes.TEXT, // <<< UBAH DARI DataTypes.STRING MENJADI DataTypes.TEXT
    get() {
      const rawValue = this.getDataValue('facilities');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('facilities', JSON.stringify(value));
    }
  },
  category: DataTypes.STRING,
  type: DataTypes.STRING,
  developer: DataTypes.STRING,
  completionYear: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  features: {
    type: DataTypes.TEXT, // <<< UBAH DARI DataTypes.STRING MENJADI DataTypes.TEXT
    get() {
      const rawValue = this.getDataValue('features');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('features', JSON.stringify(value));
    }
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: null, // Bisa null jika ada proyek lama sebelum sistem ini
    references: {
      model: 'users', // Merujuk ke tabel 'users'
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  tableName: 'projects' // Nama tabel di database
});

module.exports = Project;