// gadingpro-backend/seedAdmin.js

require('dotenv').config();
const User = require('./models/User'); // Cukup import User, sequelize akan di-handle oleh model
const sequelize = require('./config/database');

async function createAdmin() {
  const adminUsername = 'admin';
  const adminPassword = 'admin123'; 

  try {
    // Sinkronisasi untuk memastikan tabel 'Users' ada
    await sequelize.sync();
    console.log('Database and User table have been synchronized.');

    // Cek apakah admin sudah ada
    const existingAdmin = await User.findOne({ where: { username: adminUsername } });

    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists. No action taken.`);
    } else {
      // Buat admin baru dengan password plain text
      // Model 'User' akan secara otomatis mengenkripsi password ini berkat hook 'beforeCreate'
      await User.create({
        username: adminUsername,
        password: adminPassword,
      });
      console.log(`Admin user '${adminUsername}' was created successfully!`);
    }

  } catch (error) {
    console.error('An error occurred while seeding the admin user:', error);
  } finally {
    // Tutup koneksi database setelah selesai
    await sequelize.close();
    console.log('Database connection has been closed.');
  }
}

// Panggil fungsi untuk menjalankan proses seeder
createAdmin();