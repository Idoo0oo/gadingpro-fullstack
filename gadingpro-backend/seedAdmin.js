require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' }
});

// Hash password sebelum menyimpan
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  const adminUsername = 'admin';
  const adminPassword = 'password123'; // GANTI DENGAN PASSWORD YANG KUAT!

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected for Admin Seeding!');

    const existingAdmin = await User.findOne({ username: adminUsername });
    if (existingAdmin) {
      console.log(`Admin user '${adminUsername}' already exists.`);
      return;
    }

    const newAdmin = new User({
      username: adminUsername,
      password: adminPassword,
      role: 'admin'
    });

    await newAdmin.save();
    console.log(`Admin user '${adminUsername}' created successfully!`);

  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

createAdminUser();