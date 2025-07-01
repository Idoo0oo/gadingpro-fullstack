// gadingpro-backend/server.js (VERSI FINAL YANG DIPERBAIKI)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const sequelize = require('./config/database');
const User = require('./models/User');
const Project = require('./models/Project');
const Branch = require('./models/Branch');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Pastikan JWT_SECRET terdefinisi di file .env
if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined. Please set it in your .env file.');
  process.exit(1);
}

// Konfigurasi CORS Anda sudah bagus
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /https:\/\/[a-zA-Z0-9-]+\.(devtunnels\.ms|vscode\.dev|github\.dev)/,
  /https:\/\/.*\.ngrok-free\.app/
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') return allowedOrigin === origin;
      return allowedOrigin.test(origin);
    });
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning'],
  exposedHeaders: ['Content-Range'],
  credentials: true
}));
app.use(express.json());

// Sinkronisasi Database
sequelize.sync({ alter: true })
  .then(() => console.log('All models were synchronized successfully.'))
  .catch(err => console.error('Unable to synchronize models:', err));

// Middleware Otentikasi
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

// Helper function untuk format data React Admin
const formatForReactAdmin = (data) => {
    if (!data) return null;
    if (Array.isArray(data)) {
        return data.map(item => ({ ...item.toJSON(), id: item.id.toString() }));
    }
    return { ...data.toJSON(), id: data.id.toString() };
};


// ----------------------------------------------------
// RUTE API
// ----------------------------------------------------

// Rute Publik (Untuk Website Frontend, tidak perlu token)
app.get('/public/projects', async (req, res, next) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (err) {
        next(err);
    }
});
app.get('/public/branches', async (req, res, next) => {
    try {
        const branches = await Branch.findAll();
        res.json(branches);
    } catch (err) {
        next(err);
    }
});
app.post('/public/inquiry', async (req, res, next) => {
    try {
        const { name, email, phone, message, type } = req.body;
        if (!name || !email || !phone || !type) {
            return res.status(400).json({ message: 'Name, email, phone, and type are required' });
        }
        const newInquiry = await Inquiry.create({ name, email, phone, message, type });
        res.status(201).json({ message: 'Inquiry submitted successfully!', data: newInquiry });
    } catch (err) {
        next(err);
    }
});


// Rute Otentikasi (Login)
app.post('/api/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
    
    // DIPERBAIKI: Menggunakan variabel JWT_SECRET yang konsisten
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});


// Rute Terlindungi (Untuk Admin Panel, perlu token)

// --- Projects API (Protected) ---
app.get('/api/projects', authenticateToken, async (req, res, next) => {
    // ---- START DEBUG LOG ----
    console.log('\n================================================');
    console.log('--- REQUEST RECEIVED FOR /api/projects ---');
    console.log('Timestamp:', new Date().toLocaleTimeString());
    console.log('Original req.query:', req.query); // Log #1: Melihat parameter mentah dari frontend
    // ---- END DEBUG LOG ----

    try {
        const { _sort = 'id', _order = 'ASC', _start = 0, _end = 9, filter = '{}' } = req.query;
        
        const start = parseInt(_start);
        const end = parseInt(_end);
        // Ini adalah perhitungan yang seharusnya sudah benar
        const limit = end - start + 1;

        // ---- START DEBUG LOG ----
        console.log('Parsed Pagination Values:'); // Log #2: Melihat hasil perhitungan kita
        console.log(`  _start (offset) = ${start}`);
        console.log(`  _end = ${end}`);
        console.log(`  Calculated Limit = ${limit}`);
        // ---- END DEBUG LOG ----

        const filters = JSON.parse(filter);

        const { count, rows } = await Project.findAndCountAll({
            where: filters,
            order: [[_sort, _order]],
            offset: start,
            limit: limit
        });

        // ---- START DEBUG LOG ----
        console.log('Database Query Result:'); // Log #3: Melihat hasil dari database
        console.log(`  Rows returned: ${rows.length}`);
        console.log(`  Total count from DB: ${count}`);
        console.log('================================================\n');
        // ---- END DEBUG LOG ----

        res.header('Content-Range', `items ${start}-${start + rows.length - 1}/${count}`);
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        next(err);
    }
});
app.get('/api/projects/:id', authenticateToken, async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id);
        res.json(formatForReactAdmin(project));
    } catch (err) {
        next(err);
    }
});
app.post('/api/projects', authenticateToken, async (req, res, next) => {
    try {
        const newProject = await Project.create(req.body);
        res.status(201).json(formatForReactAdmin(newProject));
    } catch (err) {
        next(err);
    }
});
app.put('/api/projects/:id', authenticateToken, async (req, res, next) => {
    try {
        await Project.update(req.body, { where: { id: req.params.id } });
        const updatedProject = await Project.findByPk(req.params.id);
        res.json(formatForReactAdmin(updatedProject));
    } catch (err) {
        next(err);
    }
});
app.delete('/api/projects/:id', authenticateToken, async (req, res, next) => {
    try {
        await Project.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

// --- Branches API (Protected) ---
app.get('/api/branches', authenticateToken, async (req, res, next) => {
    // ---- START DEBUG LOG ----
    console.log('\n================================================');
    console.log('--- REQUEST RECEIVED FOR /api/branches ---');
    console.log('Timestamp:', new Date().toLocaleTimeString());
    console.log('Original req.query:', req.query);
    // ---- END DEBUG LOG ----

    try {
        const { _sort = 'id', _order = 'ASC', _start = 0, _end = 9, filter = '{}' } = req.query;
        
        const start = parseInt(_start);
        const end = parseInt(_end);
        const limit = end - start + 1; // Perhitungan yang benar

        // ---- START DEBUG LOG ----
        console.log('Parsed Pagination Values:');
        console.log(`  _start (offset) = ${start}`);
        console.log(`  _end = ${end}`);
        console.log(`  Calculated Limit = ${limit}`);
        // ---- END DEBUG LOG ----

        const filters = JSON.parse(filter);

        const { count, rows } = await Branch.findAndCountAll({
            where: filters,
            order: [[_sort, _order]],
            offset: start,
            limit: limit
        });

        // ---- START DEBUG LOG ----
        console.log('Database Query Result:');
        console.log(`  Rows returned: ${rows.length}`);
        console.log(`  Total count from DB: ${count}`);
        console.log('================================================\n');
        // ---- END DEBUG LOG ----

        res.header('Content-Range', `items ${start}-${start + rows.length - 1}/${count}`);
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        next(err);
    }
});
// (Tambahkan rute GET by ID, POST, PUT, DELETE untuk branches seperti contoh projects)
app.get('/api/branches/:id', authenticateToken, async (req, res, next) => {
    try {
        const branch = await Branch.findByPk(req.params.id);
        res.json(formatForReactAdmin(branch));
    } catch (err) {
        next(err);
    }
});

// --- Inquiries API (Protected) ---
app.get('/api/inquiries', authenticateToken, async (req, res, next) => {
    // ---- START DEBUG LOG ----
    console.log('\n================================================');
    console.log('--- REQUEST RECEIVED FOR /api/inquiries ---');
    console.log('Timestamp:', new Date().toLocaleTimeString());
    console.log('Original req.query:', req.query);
    // ---- END DEBUG LOG ----

    try {
        const { _sort = 'id', _order = 'DESC', _start = 0, _end = 9, filter = '{}' } = req.query;
        
        const start = parseInt(_start);
        const end = parseInt(_end);
        const limit = end - start + 1; // Perhitungan yang benar

        // ---- START DEBUG LOG ----
        console.log('Parsed Pagination Values:');
        console.log(`  _start (offset) = ${start}`);
        console.log(`  _end = ${end}`);
        console.log(`  Calculated Limit = ${limit}`);
        // ---- END DEBUG LOG ----

        const filters = JSON.parse(filter);

        const { count, rows } = await Inquiry.findAndCountAll({
            where: filters,
            order: [[_sort, _order]],
            offset: start,
            limit: limit
        });

        // ---- START DEBUG LOG ----
        console.log('Database Query Result:');
        console.log(`  Rows returned: ${rows.length}`);
        console.log(`  Total count from DB: ${count}`);
        console.log('================================================\n');
        // ---- END DEBUG LOG ----

        res.header('Content-Range', `items ${start}-${start + rows.length - 1}/${count}`);
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        next(err);
    }
});
// (Tambahkan rute GET by ID dan DELETE untuk inquiries seperti contoh projects)
app.get('/api/inquiries/:id', authenticateToken, async (req, res, next) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        res.json(formatForReactAdmin(inquiry));
    } catch (err) {
        next(err);
    }
});


// DIHAPUS: Blok 'raExpressMongoose' yang menyebabkan error sudah tidak ada lagi.

// Middleware penanganan error global
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ message: err.message || 'An unexpected error occurred!' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});