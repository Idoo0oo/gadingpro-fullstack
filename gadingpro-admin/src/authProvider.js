// Mengatur URL API backend secara dinamis
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import { jwtDecode } from 'jwt-decode'; 

export const authProvider = {
    // Fungsi untuk login
    login: ({ username, password }) => {
        const request = new Request(`${apiUrl}/api/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('token', auth.token);
                // --- PERUBAHAN DI SINI: Decode token untuk mendapatkan role ---
                const decodedToken = jwtDecode(auth.token);
                localStorage.setItem('username', decodedToken.username);
            })
            .catch(() => {
                throw new Error('Network error');
            });
    },

    // Fungsi untuk logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    // Fungsi untuk menangani error (misalnya saat token tidak valid)
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // Fungsi untuk memeriksa apakah pengguna sudah login
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },

    getIdentity: () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    // Fungsi untuk mendapatkan izin/hak akses (jika ada)
    getPermissions: () => {
        return Promise.resolve('admin'); 
    },
};

export default authProvider;