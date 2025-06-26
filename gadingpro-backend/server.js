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

// Pastikan JWT_SECRET terdefinisi
if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined. Please set it in your .env file.');
  process.exit(1);
}

const allowedOrigins = [
  'http://localhost:5173', // Untuk pengembangan lokal frontend
  'https://gadingpro.netlify.app',
  'https://gadingpro-admin.netlify.app',
  /https:\/\/[a-zA-Z0-9-]+\.(devtunnels\.ms|vscode\.dev|github\.dev)/,
  /https:\/\/.*\.ngrok-free\.app/
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (e.g., from curl, mobile apps)

    // Cek apakah origin ada di daftar yang diizinkan atau cocok dengan pola regex
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      }
      return allowedOrigin.test(origin);
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS: Origin ${origin} not allowed`); // Tambahkan log untuk debugging CORS
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  exposedHeaders: ['X-Total-Count'],
  credentials: true
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
    process.exit(1); // Keluar dari aplikasi jika koneksi DB gagal
  });

// ----------------------------------------------------
// Middleware Otentikasi
// ----------------------------------------------------
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err.message); // Log error JWT
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// ----------------------------------------------------
// Helper Functions
// ----------------------------------------------------
// Helper function to format data for React Admin (mengonversi ID ke string)
const formatForReactAdmin = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => ({ ...item.toJSON(), id: item.id.toString() }));
  }
  return { ...data.toJSON(), id: data.id.toString() };
};

// Middleware Validasi Input Sederhana
const validateProjectInput = (req, res, next) => {
  const { name, location, price, status, image } = req.body;
  if (!name || !location || !price || !status || !image) {
    return res.status(400).json({ message: 'Name, location, price, status, and image are required fields.' });
  }
  next();
};

const validateBranchInput = (req, res, next) => {
  const { city, name, address, phone } = req.body;
  if (!city || !name || !address || !phone) {
    return res.status(400).json({ message: 'City, name, address, and phone are required fields.' });
  }
  next();
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

// --- Projects API (Protected) ---
app.get('/api/projects', authenticateToken, async (req, res, next) => {
  try {
    const { _sort, _order, _start, _end, filter } = req.query;
    const sortField = _sort || 'id';
    const sortOrder = _order || 'ASC';
    const start = parseInt(_start || '0', 10);
    const end = parseInt(_end || '9', 10);

    const filters = filter ? JSON.parse(filter) : {};

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

    const offsetValue = start;
    const limitValue = end - start + 1;

    const { count, rows } = await Project.findAndCountAll({
      where: whereClause,
      order: [[sortField, sortOrder]],
      offset: offsetValue,
      limit: limitValue,
    });

    res.header('X-Total-Count', count.toString()); // Pastikan ini hanya angka string
    res.json(formatForReactAdmin(rows));
  } catch (err) {
    next(err); // Teruskan error ke middleware penanganan error global
  }
});

app.get('/api/projects/:id', authenticateToken, async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(formatForReactAdmin(project));
  } catch (err) {
    next(err);
  }
});

app.post('/api/projects', authenticateToken, validateProjectInput, async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(formatForReactAdmin(newProject));
  } catch (err) {
    next(err);
  }
});

app.put('/api/projects/:id', authenticateToken, validateProjectInput, async (req, res, next) => {
  try {
    const [updatedRows] = await Project.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRows === 0) return res.status(404).json({ message: 'Project not found' });
    const updatedProject = await Project.findByPk(req.params.id);
    res.json(formatForReactAdmin(updatedProject));
  } catch (err) {
    next(err);
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res, next) => {
  try {
    const deletedRows = await Project.destroy({ where: { id: req.params.id } });
    if (deletedRows === 0) return res.status(404).json({ message: 'Project not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Handle deleteMany for Projects
app.delete('/api/projects', authenticateToken, async (req, res, next) => {
    try {
        const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
        const idsToDelete = filters.id || [];

        const deletedRows = await Project.destroy({
            where: {
                id: { [Op.in]: idsToDelete }
            }
        });
        if (deletedRows === 0) return res.status(404).json({ message: 'Projects not found or already deleted' });
        res.json({ data: idsToDelete.map(id => ({ id })) }); // Mengembalikan objek dengan ID yang dihapus
    } catch (err) {
    next(err);
    }
});


// --- Branches API (Protected) ---
app.get('/api/branches', authenticateToken, async (req, res, next) => {
    try {
        const { _sort, _order, _start, _end, filter } = req.query;
        const sortField = _sort || 'id';
        const sortOrder = _order || 'ASC';
        const start = parseInt(_start || '0', 10);
        const end = parseInt(_end || '9', 10);

        const filters = filter ? JSON.parse(filter) : {};

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

        const offsetValue = start;
        const limitValue = end - start + 1;

        const { count, rows } = await Branch.findAndCountAll({
            where: whereClause,
            order: [[sortField, sortOrder]],
            offset: offsetValue,
            limit: limitValue,
        });

        res.header('X-Total-Count', count.toString()); // Pastikan ini hanya angka string
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        next(err);
    }
});

app.get('/api/branches/:id', authenticateToken, async (req, res, next) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    res.json(formatForReactAdmin(branch));
  } catch (err) {
    next(err);
  }
});

app.post('/api/branches', authenticateToken, validateBranchInput, async (req, res, next) => {
  try {
    const newBranch = await Branch.create(req.body);
    res.status(201).json(formatForReactAdmin(newBranch));
  } catch (err) {
    next(err);
  }
});

app.put('/api/branches/:id', authenticateToken, validateBranchInput, async (req, res, next) => {
  try {
    const [updatedRows] = await Branch.update(req.body, {
      where: { id: req.params.id }
    });
    if (updatedRows === 0) return res.status(404).json({ message: 'Branch not found' });
    const updatedBranch = await Branch.findByPk(req.params.id);
    res.json(formatForReactAdmin(updatedBranch));
  } catch (err) {
    next(err);
  }
});

app.delete('/api/branches/:id', authenticateToken, async (req, res, next) => {
  try {
    const deletedRows = await Branch.destroy({ where: { id: req.params.id } });
    if (deletedRows === 0) return res.status(404).json({ message: 'Branch not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Handle deleteMany for Branches
app.delete('/api/branches', authenticateToken, async (req, res, next) => {
    try {
        const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
        const idsToDelete = filters.id || [];

        const deletedRows = await Branch.destroy({
            where: {
                id: { [Op.in]: idsToDelete }
            }
        });
        if (deletedRows === 0) return res.status(404).json({ message: 'Branches not found or already deleted' });
        res.json({ data: idsToDelete.map(id => ({ id })) }); // Mengembalikan objek dengan ID yang dihapus
    } catch (err) {
    next(err);
    }
});

// --- Inquiries API (Read-Only, Protected) ---
app.get('/api/inquiries', authenticateToken, async (req, res, next) => {
    try {
        const { _sort, _order, _start, _end, filter } = req.query;
        const sortField = _sort || 'id';
        const sortOrder = _order || 'ASC';
        const start = parseInt(_start || '0', 10);
        const end = parseInt(_end || '9', 10);

        const filters = filter ? JSON.parse(filter) : {};

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

        const offsetValue = start;
        const limitValue = end - start + 1;

        const { count, rows } = await Inquiry.findAndCountAll({
            where: whereClause,
            order: [[sortField, sortOrder]],
            offset: offsetValue,
            limit: limitValue,
        });

        res.header('X-Total-Count', count.toString()); // Pastikan ini hanya angka string
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        next(err);
    }
});

app.get('/api/inquiries/:id', authenticateToken, async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(formatForReactAdmin(inquiry));
  } catch (err) {
    next(err);
  }
});

// Delete single inquiry (React Admin requires this for the Delete button)
app.delete('/api/inquiries/:id', authenticateToken, async (req, res, next) => {
    try {
        const deletedRows = await Inquiry.destroy({ where: { id: req.params.id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Inquiry not found' });
        res.status(204).send();
    } catch (err) {
    next(err);
    }
});

// Handle deleteMany for Inquiries
app.delete('/api/inquiries', authenticateToken, async (req, res, next) => {
    try {
        const filters = req.query.filter ? JSON.parse(req.query.filter) : {};
        const idsToDelete = filters.id || [];

        const deletedRows = await Inquiry.destroy({
            where: {
                id: { [Op.in]: idsToDelete }
            }
        });
        if (deletedRows === 0) return res.status(404).json({ message: 'Inquiries not found or already deleted' });
        res.json({ data: idsToDelete.map(id => ({ id })) }); // Mengembalikan objek dengan ID yang dihapus
    } catch (err) {
    next(err);
    }
});

// --- Route for Public Forms (not protected) ---
app.post('/api/inquiry', async (req, res, next) => {
  const { name, email, phone, message, type } = req.body;

  if (!name || !email || !phone || !type) {
    return res.status(400).json({ message: 'Name, email, phone, and type are required' });
  }
  // Tambahkan validasi format email sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
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
    next(err);
  }
});


// Public API for Frontend (No authentication)
// These endpoints will be consumed by gadingpro-frontend, which doesn't handle tokens
app.get('/public/projects', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects.map(p => ({ ...p.toJSON(), id: p.id.toString() })));
  } catch (err) {
    next(err);
  }
});

app.get('/public/branches', async (req, res, next) => {
  try {
    const branches = await Branch.findAll();
    res.json(branches.map(b => ({ ...b.toJSON(), id: b.id.toString() })));
  } catch (err) {
    next(err);
  }
});

// Basic Root Route
app.get('/', (req, res) => {
  res.send('GadingPro Backend API is running!');
});

// Middleware penanganan error global
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack); // Log stack trace
  res.status(err.statusCode || 500).json({
    message: err.message || 'An unexpected error occurred!',
    // Di produksi, jangan kirim stack trace ke klien
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});