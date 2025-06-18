require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// ----------------------------------------------------
// Define Schemas and Models
// ----------------------------------------------------

// --- User Schema for Admin Authentication ---
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

// Project Schema
const projectSchema = new mongoose.Schema({
  // id: { type: Number, required: true, unique: true }, // <<< INI DIHAPUS
  name: String,
  location: String,
  price: String,
  status: String,
  brochureLink: String,
  image: String,
  images: [String],
  bedrooms: Number,
  bathrooms: Number,
  garage: Number,
  landSize: Number,
  buildingSize: Number,
  facilities: [String],
  category: String,
  type: String,
  developer: String,
  completionYear: Number,
  description: String,
  features: Object
}, {
  toJSON: { virtuals: false }, // <<< UBAH KE false, karena kita mapping manual
  toObject: { virtuals: false } // <<< UBAH KE false
});
// projectSchema.virtual('id').get(function() { return this._id.toHexString(); }); // <<< INI DIHAPUS
const Project = mongoose.model('Project', projectSchema);

// Branch Schema
const branchSchema = new mongoose.Schema({
  // id: { type: Number, required: true, unique: true }, // <<< INI DIHAPUS
  city: String,
  name: String,
  address: String,
  phone: String,
  instagram: String,
  googleMaps: String
}, {
  toJSON: { virtuals: false }, // <<< UBAH KE false
  toObject: { virtuals: false } // <<< UBAH KE false
});
// branchSchema.virtual('id').get(function() { return this._id.toHexString(); }); // <<< INI DIHAPUS
const Branch = mongoose.model('Branch', branchSchema);

// Contact/Brochure Request Schema (simplified)
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: String,
  type: { type: String, enum: ['contact', 'brochure'], required: true },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: false }, // <<< UBAH KE false
  toObject: { virtuals: false } // <<< UBAH KE false
});
// inquirySchema.virtual('id').get(function() { return this._id.toHexString(); }); // <<< INI DIHAPUS
const Inquiry = mongoose.model('Inquiry', inquirySchema);


// ----------------------------------------------------
// Middleware Otentikasi
// ----------------------------------------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Jika tidak ada token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token tidak valid atau kadaluarsa
    req.user = user;
    next();
  });
};

// ----------------------------------------------------
// API Routes
// ----------------------------------------------------

// --- Authentication Route ---
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken, user: { id: user._id, username: user.username, role: user.role } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Projects API (Protected) ---
app.get('/api/projects', authenticateToken, async (req, res) => {
  try {
    const totalCount = await Project.countDocuments();
    const projects = await Project.find();
    // Mapping _id ke id secara manual untuk React Admin
    const formattedProjects = projects.map(project => ({
      ...project.toObject(), // Konversi Mongoose document ke plain object
      id: project._id.toHexString(), // Tambahkan id sebagai string
    }));
    res.header('X-Total-Count', totalCount);
    res.json(formattedProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    // Mapping _id ke id secara manual
    const formattedProject = {
      ...project.toObject(),
      id: project._id.toHexString(),
    };
    res.json(formattedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    // Mapping _id ke id secara manual
    const formattedSavedProject = {
      ...savedProject.toObject(),
      id: savedProject._id.toHexString(),
    };
    res.status(201).json(formattedSavedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    // Mapping _id ke id secara manual
    const formattedUpdatedProject = {
      ...updatedProject.toObject(),
      id: updatedProject._id.toHexString(),
    };
    res.json(formattedUpdatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Branches API (Protected) ---
app.get('/api/branches', authenticateToken, async (req, res) => {
  try {
    const totalCount = await Branch.countDocuments();
    const branches = await Branch.find();
    // Mapping _id ke id secara manual
    const formattedBranches = branches.map(branch => ({
      ...branch.toObject(),
      id: branch._id.toHexString(),
    }));
    res.header('X-Total-Count', totalCount);
    res.json(formattedBranches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/branches/:id', authenticateToken, async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    // Mapping _id ke id secara manual
    const formattedBranch = {
      ...branch.toObject(),
      id: branch._id.toHexString(),
    };
    res.json(formattedBranch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/branches', authenticateToken, async (req, res) => {
  const newBranch = new Branch(req.body);
  try {
    const savedBranch = await newBranch.save();
    // Mapping _id ke id secara manual
    const formattedSavedBranch = {
      ...savedBranch.toObject(),
      id: savedBranch._id.toHexString(),
    };
    res.status(201).json(formattedSavedBranch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/branches/:id', authenticateToken, async (req, res) => {
  try {
    const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBranch) return res.status(404).json({ message: 'Branch not found' });
    // Mapping _id ke id secara manual
    const formattedUpdatedBranch = {
      ...updatedBranch.toObject(),
      id: updatedBranch._id.toHexString(),
    };
    res.json(formattedUpdatedBranch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/branches/:id', authenticateToken, async (req, res) => {
  try {
    const deletedBranch = await Branch.findByIdAndDelete(req.params.id);
    if (!deletedBranch) return res.status(404).json({ message: 'Branch not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Inquiries API (Read-Only, Protected) ---
app.get('/api/inquiries', authenticateToken, async (req, res) => {
  try {
    const totalCount = await Inquiry.countDocuments();
    const inquiries = await Inquiry.find();
    // Mapping _id ke id secara manual
    const formattedInquiries = inquiries.map(inquiry => ({
      ...inquiry.toObject(),
      id: inquiry._id.toHexString(),
    }));
    res.header('X-Total-Count', totalCount);
    res.json(formattedInquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    // Mapping _id ke id secara manual
    const formattedInquiry = {
      ...inquiry.toObject(),
      id: inquiry._id.toHexString(),
    };
    res.json(formattedInquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Route for Public Forms (not protected) ---
app.post('/api/inquiry', async (req, res) => {
  const { name, email, phone, message, type } = req.body;

  if (!name || !email || !phone || !type) {
    return res.status(400).json({ message: 'Name, email, phone, and type are required' });
  }

  const newInquiry = new Inquiry({
    name,
    email,
    phone,
    message,
    type
  });

  try {
    const savedInquiry = await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully!', data: savedInquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Basic Root Route
app.get('/', (req, res) => {
  res.send('GadingPro Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});