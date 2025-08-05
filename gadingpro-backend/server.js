// gadingpro-backend/server.js (VERSI FINAL YANG DIPERBAIKI)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

const sequelize = require('./config/database');
const User = require('./models/User');
const Project = require('./models/Project');
const Branch = require('./models/Branch');
const Inquiry = require('./models/Inquiry');
const UnitType = require('./models/UnitType');
const Article = require('./models/Article');

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

const fs = require('fs');
const dir = './public/uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, 'article-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // Batas ukuran file 2MB
    fileFilter: function(req, file, cb){
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Hanya file gambar (jpeg, jpg, png, gif) yang diizinkan!'));
        }
    }
});

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Konfigurasi CORS Anda sudah bagus
const allowedOrigins = [
    frontendUrl,
    adminUrl,
  'http://localhost:5173',
  'http://localhost:3000',
  /https:\/\/[a-zA-Z0-9-]+\.(devtunnels\.ms|vscode\.dev|github\.dev)/,
  /https:\/\/.*\.ngrok-free\.app/
];
const corsOptions = {
    origin: '*', // Izinkan permintaan dari SEMUA sumber
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, ngrok-skip-browser-warning",
    exposedHeaders: 'Content-Range',
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

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
        const { q, category, location, priceRange, _sort, _order = 'ASC' } = req.query;

        let where = {};
        let order = [];

        // Filter pencarian berdasarkan nama atau lokasi
        if (q) {
            where[Op.or] = [
                { name: { [Op.like]: `%${q}%` } },
                { location: { [Op.like]: `%${q}%` } },
                { developer: { [Op.like]: `%${q}%` } }
            ];
        }

        // Filter berdasarkan kategori
        if (category && category !== 'Semua') {
            where.category = category;
        }

        // Filter berdasarkan lokasi
        if (location && location !== 'Semua Lokasi') {
            where.location = { [Op.like]: `%${location}%` };
        }

        // Filter berdasarkan rentang harga
        if (priceRange && priceRange !== 'Semua Harga') {
            const [min, max] = priceRange.split('-').map(Number);
            // Kita akan menyimpan harga sebagai angka di masa depan, untuk saat ini filter ini didummy
            // Untuk implementasi nyata, Anda perlu kolom harga numerik di database.
        }

        // Pengurutan (Sorting)
        if (_sort) {
            // Contoh: ?_sort=price&_order=DESC
            order.push([_sort, _order]);
        } else {
            order.push(['id', 'DESC']); // Default sort
        }

        const projects = await Project.findAll({
            where,
            order,
            include: [{
                model: User,
                as: 'creator',
                attributes: ['username', 'phone', 'profilePicture']
            }]
        });

        res.json(projects);
    } catch (err) {
        next(err);
    }
});
app.get('/public/articles', async (req, res, next) => {
    try {
        const articles = await Article.findAll({
            order: [['publishedDate', 'DESC']]
        });
        res.json(articles);
    } catch (err) {
        next(err);
    }
});

app.get('/public/articles/:slug', async (req, res, next) => {
    try {
        const { slug } = req.params;
        const article = await Article.findOne({ where: { slug: slug } });

        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: 'Article not found' });
        }
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
        // 1. Ambil `unitType` dari req.body
        const { name, email, phone, message, type, unitType } = req.body; 

        if (!name || !email || !phone || !type) {
            return res.status(400).json({ message: 'Name, email, phone, and type are required' });
        }

        // 2. Sertakan `unitType` saat membuat data baru
        const newInquiry = await Inquiry.create({ name, email, phone, message, type, unitType });
        
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

        let whereClause = {}; 

        if (filters.q) {
            const searchQuery = `%${filters.q}%`;
            whereClause[Op.or] = [ // Sekarang ini akan menambahkan properti ke objek yang sudah ada
                { name: { [Op.like]: searchQuery } },
                { location: { [Op.like]: searchQuery } },
                { developer: { [Op.like]: searchQuery } } // Menambahkan developer ke pencarian
            ];
        }

        const { count, rows } = await Project.findAndCountAll({
            where: whereClause, // Sekarang variabel ini dijamin ada
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
app.delete('/api/inquiries/:id', authenticateToken, async (req, res, next) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        await inquiry.destroy();
        // Kirim kembali data yang dihapus (cukup ID-nya) agar react-admin bisa konfirmasi
        res.json({ id: req.params.id }); 
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

app.get('/api/users', authenticateToken, async (req, res, next) => {
    try {
        const { _sort = 'id', _order = 'ASC', _start = 0, _end = 10, filter = '{}' } = req.query;
        const start = parseInt(_start, 10);
        const limit = parseInt(_end, 10) - start;
        const filters = JSON.parse(filter);
        
        let whereClause = {};
        if (filters.q) {
            const searchQuery = `%${filters.q}%`;
            whereClause = {
                [Op.or]: [
                    { username: { [Op.like]: searchQuery } },
                    { email: { [Op.like]: searchQuery } },
                    { role: { [Op.like]: searchQuery } }
                ]
            };
        }

        const { count, rows } = await User.findAndCountAll({
            where: whereClause,
            order: [[_sort, _order]],
            offset: start,
            limit: limit,
            attributes: { exclude: ['password'] } // Jangan kirim password ke frontend
        });

        res.header('Content-Range', `users ${start}-${start + rows.length - 1}/${count}`);
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        next(err);
    }
});

// GET single user
app.get('/api/users/:id', authenticateToken, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
             attributes: { exclude: ['password'] }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// CREATE a new user
app.post('/api/users', authenticateToken, async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        const { password: _, ...userWithoutPassword } = newUser.get({ plain: true });
        res.status(201).json(userWithoutPassword);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        next(err);
    }
});


// UPDATE a user
app.put('/api/users/:id', authenticateToken, async (req, res, next) => {
    try {
        const { username, email, role, password } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const updatedData = { username, email, role };
        // Jika ada password baru di request, hash dan update juga
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updatedData);
        
        const { password: _, ...userWithoutPassword } = user.get({ plain: true });
        res.json(userWithoutPassword);
    } catch (err) {
        next(err);
    }
});

app.get('/api/units', authenticateToken, async (req, res, next) => {
    try {
        const { _sort = 'id', _order = 'ASC', _start = 0, _end = 10, filter = '{}' } = req.query;
        const start = parseInt(_start, 10);
        const limit = parseInt(_end, 10) - start;
        const filters = JSON.parse(filter);

        // Ini bagian penting untuk memfilter unit berdasarkan projectId
        const whereClause = {};
        if (filters.projectId) {
            whereClause.projectId = filters.projectId;
        }

        const { count, rows } = await UnitType.findAndCountAll({
            where: whereClause,
            order: [[_sort, _order]],
            offset: start,
            limit: limit,
            include: [{ model: Project, attributes: ['name'] }] // Sertakan nama proyek
        });

        res.header('Content-Range', `items ${start}-${start + rows.length - 1}/${count}`);
        res.json(formatForReactAdmin(rows));
    } catch (err) {
        next(err);
    }
});

app.get('/api/units/:id', authenticateToken, async (req, res, next) => {
    try {
        const unit = await UnitType.findByPk(req.params.id);
        if (!unit) return res.status(404).json({ message: 'Unit not found' });
        res.json(formatForReactAdmin(unit));
    } catch (err) {
        next(err);
    }
});

app.post('/api/units', authenticateToken, async (req, res, next) => {
    try {
        const newUnit = await UnitType.create(req.body);
        res.status(201).json(formatForReactAdmin(newUnit));
    } catch (err) {
        next(err);
    }
});

app.put('/api/units/:id', authenticateToken, async (req, res, next) => {
    try {
        const unit = await UnitType.findByPk(req.params.id);
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        // --- Proses Data dengan Aman ---
        // 1. Ambil semua data dari body request
        const receivedData = req.body;
        const dataToUpdate = {};

        // 2. Loop melalui semua key di data yang diterima
        for (const key in receivedData) {
            // Abaikan 'id' karena kita tidak ingin mengupdatenya
            if (key === 'id') continue;

            // 3. Logika khusus untuk field 'images' yang sering menyebabkan error
            if (key === 'images' && receivedData[key]) {
                if (Array.isArray(receivedData[key])) {
                    // Jika 'images' adalah array, ubah menjadi array of strings (URL)
                    // Ini menangani kasus dimana react-admin mengirim: [{ src: 'url1' }, { src: 'url2' }]
                    dataToUpdate[key] = receivedData[key]
                        .map(img => (typeof img === 'object' && img.src ? img.src : img))
                        .filter(Boolean); // Filter nilai null atau undefined
                } else if (typeof receivedData[key] === 'object' && receivedData[key].src) {
                    // Jika 'images' adalah satu objek, ambil 'src'-nya
                    dataToUpdate[key] = [receivedData[key].src];
                } else {
                    // Jika sudah dalam format yang benar (misal: array of strings), biarkan saja
                    dataToUpdate[key] = receivedData[key];
                }
            } else {
                // 4. Untuk semua field lain, langsung masukkan ke data yang akan diupdate
                dataToUpdate[key] = receivedData[key];
            }
        }

        // 5. Lakukan update ke database dengan data yang sudah bersih
        await UnitType.update(dataToUpdate, {
            where: { id: req.params.id }
        });

        const updatedUnit = await UnitType.findByPk(req.params.id);
        res.json(formatForReactAdmin(updatedUnit));

    } catch (err) {
        console.error('Error updating unit:', err); // Log error untuk debug di masa depan
        next(err);
    }
});

app.delete('/api/units/:id', authenticateToken, async (req, res, next) => {
    try {
        await UnitType.destroy({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

app.get('/api/articles', async (req, res, next) => {
  const { count, rows } = await Article.findAndCountAll();
  res.header('Content-Range', `articles 0-${count}/${count}`);
  res.json(rows);
});
app.get('/api/articles/:id', authenticateToken, async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article); // Kirim data artikel yang ditemukan
    } catch (err) {
        next(err);
    }
});
app.post('/api/articles', authenticateToken, async (req, res, next) => {
    try {
        // PERBAIKAN DI SINI: Ambil semua data dari body
        const { title, slug, category, author, content, imageUrl } = req.body;

        // SEKARANG kita tidak lagi bergantung pada req.file
        // dataProvider sudah mengirimkan 'imageUrl' dalam format base64 atau URL lama
        const newArticle = await Article.create({
            title,
            slug,
            category,
            author,
            content,
            imageUrl // Langsung gunakan imageUrl dari req.body
        });
        res.status(201).json(newArticle);
    } catch (err) {
        next(err);
    }
});
app.put('/api/articles/:id', authenticateToken, async (req, res, next) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // --- FINAL FIX LOGIC HERE ---
        const { title, slug, category, author, content, imageUrl } = req.body;

        const dataToUpdate = {
            title,
            slug,
            category,
            author,
            content,
        };

        // Only update imageUrl if a new one is provided in the request body.
        // If you edit the article without uploading a new image, 
        // req.body.imageUrl will be undefined, and the existing image will be preserved.
        if (imageUrl !== undefined) {
            dataToUpdate.imageUrl = imageUrl;
        }

        await article.update(dataToUpdate);
        // --- END OF FIX ---

        res.json(article);
    } catch (err) {
        next(err);
    }
});
app.get('/api/users', async (req, res, next) => {
  const { count, rows } = await User.findAndCountAll();
  res.header('Content-Range', `users 0-${count}/${count}`);
  res.json(rows);
});

// Middleware penanganan error global
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ message: err.message || 'An unexpected error occurred!' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});