// gadingpro-backend/models/UnitType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UnitType = sequelize.define('UnitType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects', // Merujuk ke tabel 'projects'
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT, // Gunakan BIGINT untuk harga
    allowNull: false,
  },
  description: DataTypes.TEXT,
  bedrooms: DataTypes.INTEGER,
  bathrooms: DataTypes.INTEGER,
  garage: DataTypes.INTEGER,
  landSize: DataTypes.INTEGER,
  buildingSize: DataTypes.INTEGER,
  electricity: DataTypes.INTEGER,
  specifications: { // Untuk detail seperti pondasi, dinding, dll.
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('specifications');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('specifications', JSON.stringify(value));
    }
  },
  images: {
    type: DataTypes.TEXT('medium'),
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    }
  },
}, {
  tableName: 'unit_types',
  timestamps: false,
});

module.exports = UnitType;