// gadingpro-backend/server.js
require('dotenv').config(); // Load environment variables at the very top
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize'); // Import Op for operators

const sequelize = require('./config/database');
const User = require('./models/User');
const Project = require('./models/Project');
const Branch = require('./models/Branch');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const allowedOrigins = [
  'http://localhost:5173', // Untuk pengembangan lokal frontend
  'http://localhost:3001', // Untuk pengembangan lokal admin panel
  'https://ff86-118-137-88-147.ngrok-free.app', // GANTI DENGAN URL NGROK FRONTEND SAAT INI
  'https://c4ec-118-137-88-147.ngrok-free.app' // GANTI DENGAN URL NGROK ADMIN PANEL SAAT INI
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // izinkan permintaan tanpa origin (seperti dari aplikasi seluler atau curl)
    // atau jika origin ada di daftar allowedOrigins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Izinkan metode HTTP yang relevan
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Total-Count'], // Pastikan Authorization juga diizinkan
  exposedHeaders: ['X-Total-Count'], // Penting untuk react-admin pagination
  credentials: true // Jika Anda mengirim cookie atau header otorisasi
}));
app.use(express.json());

// Database Connection & Synchronization
sequelize.authenticate()
  .then(() => {
    console.log('MySQL Connection has been established successfully.');
    // Di tahap development, `alter: true` akan mencoba mengubah skema tabel tanpa menghapus data.
    // Untuk fresh start dan jika tidak takut kehilangan data lama, bisa pakai `force: true` (akan menghapus dan membuat ulang tabel).
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database or synchronize models:', err);
  });

// ----------------------------------------------------
// Middleware Otentikasi
// ----------------------------------------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// ----------------------------------------------------
// API Routes
// ----------------------------------------------------

// Authentication Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken, user: { id: user.id, username: user.username, role: user.role } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Helper function to format data for React Admin (mengonversi ID ke string)
const formatForReactAdmin = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => ({ ...item.toJSON(), id: item.id.toString() }));
  }
  return { ...data.toJSON(), id: data.id.toString() };
};

// --- Projects API (Protected) ---
app.get('/api/projects', authenticateToken, async (req, res) => {
  try {
    // Perbaikan parsing parameter dari req.query
    const { _sort, _order, _start, _end, filter } = req.query;
    const sortField = _sort || 'id';
    const sortOrder = _order || 'ASC';
    const start = parseInt(_start || '0', 10); // Pastikan ini di-parse ke integer
    const end = parseInt(_end || '9', 10);   // Pastikan ini di-parse ke integer

    const filters = filter ? JSON.parse(filter) : {};

    // DEBUG LOGS UNTUK PROJECTS
    console.log('BACKEND DEBUG: Projects - Received _start:', _start, '_end:', _end);
    console.log('BACKEND DEBUG: Projects - Parsed start:', start, 'end:', end);

    let whereClause = {};
    if (filters.q) { // Full-text search example
        whereClause[Op.or] = [
            { name: { [Op.like]: `%${filters.q}%` } },
            { location: { [Op.like]: `%${filters.q}%` } },
            { description: { [Op.like]: `%${filters.q}%` } },
        ];
        delete filters.q;
    }
    // Handle specific filters for React Admin (e.g., id for getMany)
    if (filters.id) {
        whereClause.id = filters.id;
        delete filters.id;
    }
    // Add other filters as needed
    Object.assign(whereClause, filters);

    // Variabel yang akan digunakan di findAndCountAll
    const offsetValue = start;
    const limitValue = end - start + 1;

    const { count, rows } = await Project.findAndCountAll({
      where: whereClause,
      order: [[sortField, sortOrder]],
      offset: offsetValue, // Gunakan offsetValue
      limit: limitValue,   // Gunakan limitValue
    });

    // DEBUG LOGS UNTUK PROJECTS
    console.log('BACKEND DEBUG: Projects - Count from DB:', count);
    console.log('BACKEND DEBUG: Projects - Rows returned (first 2):', rows.slice(0, 2));

    res.header('X-Total-Count', count); // Penting: Mengirim total count
    res.json(formatForReactAdmin(rows));
  } catch (err) {
    console.error('BACKEND ERROR: Projects API:', err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(formatForReactAdmin(project));
  } catch (err) {
    console.error('BACKEND ERROR: Projects Detail API:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(formatForReactAdmin(newProject));
  } catch (err) {
    console.error('BACKEND ERROR: Projects Create API:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const [updatedRows] = await Project.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRows === 0) return res.status(404).json({ message: 'Project not found' });
    const updatedProject = await Project.findByPk(req.params.id);
    res.json(formatForReactAdmin(updatedProject));
  } catch (err) {
    console.error('BACKEND ERROR: Projects Update API:', err);
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const deletedRows = await Project.destroy({ where: { id: req.params.id } });
    if (deletedRows === 0) return res.status(404).json({ message: 'Project not found' });
    res.status(204).send();
  } catch (err) {
    console.error('BACKEND ERROR: Projects Delete API:', err);
    res.status(500).json({ message: err.message });
  }
});

// Handle deleteMany for Projects
app.delete('/api/projects', authenticateToken, async (req, res) => {
    try {
        const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
        const idsToDelete = filters.id || [];

        const deletedRows = await Project.destroy({
            where: {
                id: { [Op.in]: idsToDelete }
            }
        });
        if (deletedRows === 0) return res.status(404).json({ message: 'Projects not found or already deleted' });
        res.status(204).send();
    } catch (err) {
    console.error('BACKEND ERROR: Projects DeleteMany API:', err);
        res.status(500).json({ message: err.message });
    }
});


// --- Branches API (Protected) ---
app.get('/api/branches', authenticateToken, async (req, res) => {
    try {
        // Perbaikan parsing parameter dari req.query
        const { _sort, _order, _start, _end, filter } = req.query;
        const sortField = _sort || 'id';
        const sortOrder = _order || 'ASC';
        const start = parseInt(_start || '0', 10);
        const end = parseInt(_end || '9', 10);

        const filters = filter ? JSON.parse(filter) : {};

        // DEBUG LOGS UNTUK BRANCHES
        console.log('BACKEND DEBUG: Branches - Received _start:', _start, '_end:', _end);
        console.log('BACKEND DEBUG: Branches - Parsed start:', start, 'end:', end);

        let whereClause = {};
        if (filters.q) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${filters.q}%` } },
                { city: { [Op.like]: `%${filters.q}%` } },
                { address: { [Op.like]: `%${filters.q}%` } },
            ];
            delete filters.q;
        }
        if (filters.id) {
            whereClause.id = filters.id;
            delete filters.id;
        }
        Object.assign(whereClause, filters);

        // Variabel yang akan digunakan di findAndCountAll
        const offsetValue = start;
        const limitValue = end - start + 1;

        const { count, rows } = await Branch.findAndCountAll({
            where: whereClause,
            order: [[sortField, sortOrder]],
            offset: offsetValue, // Gunakan offsetValue
            limit: limitValue,   // Gunakan limitValue
        });

        // DEBUG LOGS UNTUK BRANCHES
        console.log('BACKEND DEBUG: Branches - Count from DB:', count);
        console.log('BACKEND DEBUG: Branches - Rows returned (first 2):', rows.slice(0, 2));

        res.header('X-Total-Count', count);
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        console.error('BACKEND ERROR: Branches API:', err);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/branches/:id', authenticateToken, async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    res.json(formatForReactAdmin(branch));
  } catch (err) {
    console.error('BACKEND ERROR: Branches Detail API:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/branches', authenticateToken, async (req, res) => {
  try {
    const newBranch = await Branch.create(req.body);
    res.status(201).json(formatForReactAdmin(newBranch));
  } catch (err) {
    console.error('BACKEND ERROR: Branches Create API:', err);
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/branches/:id', authenticateToken, async (req, res) => {
  try {
    const [updatedRows] = await Branch.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRows === 0) return res.status(404).json({ message: 'Branch not found' });
    const updatedBranch = await Branch.findByPk(req.params.id);
    res.json(formatForReactAdmin(updatedBranch));
  } catch (err) {
    console.error('BACKEND ERROR: Branches Update API:', err);
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/branches/:id', authenticateToken, async (req, res) => {
  try {
    const deletedRows = await Branch.destroy({ where: { id: req.params.id } });
    if (deletedRows === 0) return res.status(404).json({ message: 'Branch not found' });
    res.status(204).send();
  } catch (err) {
    console.error('BACKEND ERROR: Branches Delete API:', err);
    res.status(500).json({ message: err.message });
  }
});

// Handle deleteMany for Branches
app.delete('/api/branches', authenticateToken, async (req, res) => {
    try {
        const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
        const idsToDelete = filters.id || [];

        const deletedRows = await Branch.destroy({
            where: {
                id: { [Op.in]: idsToDelete }
            }
        });
        if (deletedRows === 0) return res.status(404).json({ message: 'Branches not found or already deleted' });
        res.status(204).send();
    } catch (err) {
    console.error('BACKEND ERROR: Branches DeleteMany API:', err);
        res.status(500).json({ message: err.message });
    }
});

// --- Inquiries API (Read-Only, Protected) ---
app.get('/api/inquiries', authenticateToken, async (req, res) => {
    try {
        // Perbaikan parsing parameter dari req.query
        const { _sort, _order, _start, _end, filter } = req.query;
        const sortField = _sort || 'id';
        const sortOrder = _order || 'ASC';
        const start = parseInt(_start || '0', 10);
        const end = parseInt(_end || '9', 10);

        const filters = filter ? JSON.parse(filter) : {};

        // DEBUG LOGS UNTUK INQUIRIES
        console.log('BACKEND DEBUG: Inquiries - Received _start:', _start, '_end:', _end);
        console.log('BACKEND DEBUG: Inquiries - Parsed start:', start, 'end:', end);

        let whereClause = {};
        if (filters.q) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${filters.q}%` } },
                { email: { [Op.like]: `%${filters.q}%` } },
                { phone: { [Op.like]: `%${filters.q}%` } },
                { message: { [Op.like]: `%${filters.q}%` } },
            ];
            delete filters.q;
        }
        if (filters.id) {
            whereClause.id = filters.id;
            delete filters.id;
        }
        Object.assign(whereClause, filters);

        // Variabel yang akan digunakan di findAndCountAll
        const offsetValue = start;
        const limitValue = end - start + 1;

        const { count, rows } = await Inquiry.findAndCountAll({
            where: whereClause,
            order: [[sortField, sortOrder]],
            offset: offsetValue, // Gunakan offsetValue
            limit: limitValue,   // Gunakan limitValue
        });

        // DEBUG LOGS UNTUK INQUIRIES
        console.log('BACKEND DEBUG: Inquiries - Count from DB:', count);
        console.log('BACKEND DEBUG: Inquiries - Rows returned (first 2):', rows.slice(0, 2));

        res.header('X-Total-Count', count);
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        console.error('BACKEND ERROR: Inquiries API:', err);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(formatForReactAdmin(inquiry));
  } catch (err) {
    console.error('BACKEND ERROR: Inquiries Detail API:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete single inquiry (React Admin requires this for the Delete button)
app.delete('/api/inquiries/:id', authenticateToken, async (req, res) => {
    try {
        const deletedRows = await Inquiry.destroy({ where: { id: req.params.id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Inquiry not found' });
        res.status(204).send();
    } catch (err) {
    console.error('BACKEND ERROR: Inquiries Delete API:', err);
        res.status(500).json({ message: err.message });
    }
});

// Handle deleteMany for Inquiries
app.delete('/api/inquiries', authenticateToken, async (req, res) => {
    try {
        const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
        const idsToDelete = filters.id || [];

        const deletedRows = await Inquiry.destroy({
            where: {
                id: { [Op.in]: idsToDelete }
            }
        });
        if (deletedRows === 0) return res.status(404).json({ message: 'Inquiries not found or already deleted' });
        res.status(204).send();
    } catch (err) {
    console.error('BACKEND ERROR: Inquiries DeleteMany API:', err);
        res.status(500).json({ message: err.message });
    }
});

// --- Route for Public Forms (not protected) ---
app.post('/api/inquiry', async (req, res) => {
  const { name, email, phone, message, type } = req.body;

  if (!name || !email || !phone || !type) {
    return res.status(400).json({ message: 'Name, email, phone, and type are required' });
  }

  try {
    const newInquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
      type
    });
    res.status(201).json({ message: 'Inquiry submitted successfully!', data: formatForReactAdmin(newInquiry) });
  } catch (err) {
    console.error('BACKEND ERROR: Inquiry Public API:', err);
    res.status(500).json({ message: err.message });
  }
});


// Public API for Frontend (No authentication)
// These endpoints will be consumed by gadingpro-frontend, which doesn't handle tokens
app.get('/public/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects.map(p => ({ ...p.toJSON(), id: p.id.toString() })));
  } catch (err) {
    console.error('BACKEND ERROR: Public Projects API:', err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/public/branches', async (req, res) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches.map(b => ({ ...b.toJSON(), id: b.id.toString() })));
  } catch (err) {
    console.error('BACKEND ERROR: Public Branches API:', err);
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