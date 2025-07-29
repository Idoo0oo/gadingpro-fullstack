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
const UnitType = require('./models/UnitType');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Pastikan JWT_SECRET terdefinisi di file .env
if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined. Please set it in your .env file.');
  process.exit(1);
}

Project.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
User.hasMany(Project, { foreignKey: 'creatorId' });

Project.hasMany(UnitType, { foreignKey: 'projectId', as: 'unitTypes' });
UnitType.belongsTo(Project, { foreignKey: 'projectId' });

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const adminUrl = process.env.ADMIN_URL || 'http://localhost:3000';

// Konfigurasi CORS Anda sudah bagus
const allowedOrigins = [
    frontendUrl,
    adminUrl,
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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Sinkronisasi Database
sequelize.sync()
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
        // --- PERUBAHAN DI SINI ---
        const projects = await Project.findAll({
            include: [{
                model: User,
                as: 'creator', // Alias untuk relasi
                attributes: ['username', 'phone', 'profilePicture'] // Ambil data ini dari user
            }]
        });
        // --- AKHIR PERUBAHAN ---
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

app.get('/public/projects/:id', async (req, res, next) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [{
                model: UnitType,
                as: 'unitTypes',
                order: [['price', 'ASC']] // Urutkan tipe unit dari termurah
            }]
        });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        next(err);
    }
});

app.get('/public/units/:id', async (req, res, next) => {
    try {
        const unitType = await UnitType.findByPk(req.params.id, {
            include: [{ // Sertakan data proyek induknya
                model: Project,
                attributes: ['id', 'name']
            }]
        });

        if (!unitType) {
            return res.status(404).json({ message: 'Unit type not found' });
        }

        // Ambil tipe unit lain dari proyek yang sama
        const otherUnitTypes = await UnitType.findAll({
            where: {
                projectId: unitType.projectId,
                id: { [Op.ne]: req.params.id } // Kecualikan unit yang sedang dilihat
            }
        });

        res.json({ unitType, otherUnitTypes });
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
    
    // --- PERUBAHAN DI SINI: Tambahkan 'role' ke dalam token ---
    const token = jwt.sign(
        { id: user.id, username: user.username }, // Hapus role
        JWT_SECRET,
        { expiresIn: '8h' }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
});


// Rute Terlindungi (Untuk Admin Panel, perlu token)

// --- Projects API (Protected) ---
app.get('/api/projects', authenticateToken, async (req, res, next) => {
    try {
        const { _sort = 'id', _order = 'ASC', _start = 0, _end = 9, filter = '{}' } = req.query;
        const start = parseInt(_start, 10);
        const limit = parseInt(_end, 10) - start + 1;
        const filters = JSON.parse(filter);

        if (filters.q) {
            const searchQuery = `%${filters.q}%`;
            whereClause[Op.or] = [ // Gabungkan dengan filter pencarian
                { name: { [Op.like]: searchQuery } },
                { location: { [Op.like]: searchQuery } },
            ];
        }

        const { count, rows } = await Project.findAndCountAll({
            where: whereClause, // Terapkan kondisi di sini
            order: [[_sort, _order]],
            offset: start,
            limit: limit
        });

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
        // --- TAMBAHKAN creatorId saat membuat proyek ---
        const projectData = {
            ...req.body,
            creatorId: req.user.id // Ambil ID dari token
        };
        const newProject = await Project.create(projectData);
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
    try {
        const { _sort = 'id', _order = 'ASC', _start = 0, _end = 9, filter = '{}' } = req.query;
        const start = parseInt(_start, 10);
        const limit = parseInt(_end, 10) - start + 1;
        const filters = JSON.parse(filter);

        let whereClause = {};
        if (filters.q) {
            const searchQuery = `%${filters.q}%`;
            whereClause = {
                [Op.or]: [
                    { name: { [Op.like]: searchQuery } },
                    { city: { [Op.like]: searchQuery } },
                    { address: { [Op.like]: searchQuery } }
                ]
            };
        }

        const { count, rows } = await Branch.findAndCountAll({
            where: whereClause, // Gunakan klausa where di sini
            order: [[_sort, _order]],
            offset: start,
            limit: limit
        });
        
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

app.post('/api/branches', authenticateToken, async (req, res, next) => {
    try {
        const newBranch = await Branch.create(req.body);
        res.status(201).json(formatForReactAdmin(newBranch));
    } catch (err) {
        next(err);
    }
});

app.put('/api/branches/:id', authenticateToken, async (req, res, next) => {
    try {
        await Branch.update(req.body, { where: { id: req.params.id } });
        const updatedBranch = await Branch.findByPk(req.params.id);
        res.json(formatForReactAdmin(updatedBranch));
    } catch (err) {
        next(err);
    }
});

app.delete('/api/branches/:id', authenticateToken, async (req, res, next) => {
    try {
        await Branch.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

// --- Inquiries API (Protected) ---
app.get('/api/inquiries', authenticateToken, async (req, res, next) => {
    try {
        const { _sort = 'id', _order = 'DESC', _start = 0, _end = 9, filter = '{}' } = req.query;
        const start = parseInt(_start, 10);
        const limit = parseInt(_end, 10) - start + 1;
        const filters = JSON.parse(filter);

        let whereClause = {};
        if (filters.q) {
            const searchQuery = `%${filters.q}%`;
            whereClause = {
                [Op.or]: [
                    { name: { [Op.like]: searchQuery } },
                    { email: { [Op.like]: searchQuery } },
                    { phone: { [Op.like]: searchQuery } },
                    { message: { [Op.like]: searchQuery } }
                ]
            };
        }

        const { count, rows } = await Inquiry.findAndCountAll({
            where: whereClause, // Gunakan klausa where di sini
            order: [[_sort, _order]],
            offset: start,
            limit: limit
        });

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

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};

app.get('/api/users', authenticateToken, isAdmin, async (req, res, next) => {
    try {
        const { _sort = 'id', _order = 'ASC', _start = 0, _end = 9 } = req.query;
        const start = parseInt(_start, 10);
        const limit = parseInt(_end, 10) - start + 1;

        const { count, rows } = await User.findAndCountAll({
            order: [[_sort, _order]],
            offset: start,
            limit: limit
        });
        res.header('Content-Range', `items ${start}-${start + rows.length - 1}/${count}`);
        res.json(formatForReactAdmin(rows));
    } catch(err) {
        next(err);
    }
});

app.get('/api/users/:id', authenticateToken, isAdmin, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(formatForReactAdmin(user));
    } catch(err) {
        next(err);
    }
});

app.post('/api/users', authenticateToken, isAdmin, async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(formatForReactAdmin(newUser));
    } catch (err) {
        next(err);
    }
});

app.put('/api/users/:id', authenticateToken, isAdmin, async (req, res, next) => {
    try {
        // Jika password tidak diubah, jangan hash ulang
        const data = { ...req.body };
        if (!data.password) {
            delete data.password;
        }
        await User.update(data, { where: { id: req.params.id } });
        const updatedUser = await User.findByPk(req.params.id);
        res.json(formatForReactAdmin(updatedUser));
    } catch (err) {
        next(err);
    }
});

app.delete('/api/users/:id', authenticateToken, isAdmin, async (req, res, next) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.status(204).send();
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