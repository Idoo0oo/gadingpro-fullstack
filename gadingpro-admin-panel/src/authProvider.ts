// gadingpro-admin-panel/src/authProvider.ts
import type { AuthProvider } from 'react-admin';

const authProvider: AuthProvider = {
    // Dipanggil saat pengguna mencoba login
    login: ({ username, password }) => {
        const request = new Request('http://localhost:5000/api/login', { // Endpoint login backend Anda
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
            .then(({ accessToken }) => {
                localStorage.setItem('token', accessToken); // Simpan token di localStorage
                return Promise.resolve();
            });
    },
    // Dipanggil saat pengguna mencoba logout
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // Dipanggil saat API merespons dengan status 401 atau 403
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    // Dipanggil saat API merespons dengan status 403
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // Dipanggil saat halaman dimuat ulang
    getIdentity: () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return Promise.reject('No token found');
            const payload = JSON.parse(atob(token.split('.')[1]));
            return Promise.resolve({
                id: payload.username, // Gunakan username sebagai ID
                fullName: payload.username,
                role: payload.role, // Ambil peran dari token
            });
        } catch (error) {
            return Promise.reject('Invalid token');
        }
    },
    // Dipanggil untuk memeriksa peran pengguna (otorisasi)
    getPermissions: () => Promise.resolve(), // Sederhana, Anda bisa tambahkan logika peran di sini
};

export default authProvider;