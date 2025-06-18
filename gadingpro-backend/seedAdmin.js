// gadingpro-backend/seedAdmin.js
require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/User'); // Pastikan User model diimport

async function createAdminUser() {
  const adminUsername = 'admin';
  const adminPassword = 'password123'; // GANTI DENGAN PASSWORD YANG KUAT!

  try {
    // Pastikan tabel User sudah ada
    await sequelize.sync({ alter: true });
    console.log('User table synchronized.');

    const existingAdmin = await User.findOne({ where: { username: adminUsername } });
    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists.`);
      return;
    }

    const newAdmin = await User.create({
      username: adminUsername,
      password: adminPassword, // Password akan di-hash oleh hook di model
      role: 'admin'
    });

    console.log(`Admin user '${adminUsername}' created successfully! (ID: ${newAdmin.id})`);

  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

createAdminUser();