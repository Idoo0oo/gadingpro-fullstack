// gadingpro-backend/models/Inquiry.js (Setelah Dimodifikasi)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inquiry = sequelize.define('Inquiry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  message: DataTypes.TEXT,
  unitType: DataTypes.STRING, // <-- BARU
  type: {
    type: DataTypes.ENUM('contact', 'brochure', 'whatsapp'), // <-- TAMBAHKAN 'whatsapp'
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'inquiries'
});

module.exports = Inquiry;