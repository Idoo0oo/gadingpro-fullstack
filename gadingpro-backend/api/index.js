import app from '../server'

// gadingpro-backend/api/index.js
// Ini adalah entry point yang akan diakses oleh Vercel
const app = require('../server'); // Mengimpor aplikasi Express dari server.js

module.exports = app;

export default app;