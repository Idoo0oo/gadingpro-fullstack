// gadingpro-backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'agent'),
    defaultValue: 'agent',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // Boleh kosong
  },
  profilePicture: {
    type: 'MEDIUMTEXT', // Tipe data untuk menyimpan base64 image
    allowNull: true,
  },
}, {
  tableName: 'users', // Nama tabel di database
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
});

module.exports = User;