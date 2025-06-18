// gadingpro-backend/models/Branch.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Branch = sequelize.define('Branch', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  city: DataTypes.STRING,
  name: DataTypes.STRING,
  address: DataTypes.TEXT,
  phone: DataTypes.STRING,
  instagram: DataTypes.STRING,
  googleMaps: DataTypes.STRING,
}, {
  tableName: 'branches' // Nama tabel di database
});

module.exports = Branch;