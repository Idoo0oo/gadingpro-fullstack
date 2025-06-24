// gadingpro-admin-panel/src/authProvider.ts
import type { AuthProvider } from 'react-admin';

const currentOrigin = window.location.origin;
let backendBaseUrl: string;

if (currentOrigin.includes('.devtunn.ms') || currentOrigin.includes('.vercel.app')) {
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT;
  backendBaseUrl = currentOrigin.replace(/-\d+\.(devtunn\.ms|vercel\.app)/, `-${backendPort}.$1`);
} else {
  backendBaseUrl = `http://localhost:${import.meta.env.VITE_APP_BACKEND_PORT}`;
}
// Menggunakan variabel lingkungan dari Vite
const apiUrlBase = `${window.location.origin}${import.meta.env.VITE_APP_API_URL}`;


const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        const request = new Request(`${apiUrlBase}/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        // ... (sisa kode login dan method lainnya tetap sama) ...
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    return response.json().then(error => {
                        throw new Error(error.message || response.statusText);
                    });
                }
                return response.json();
            })
            .then(({ accessToken }) => {
                localStorage.setItem('token', accessToken);
                return Promise.resolve();
            });
    },
    // Dipanggil saat pengguna mencoba logout
     logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject({ redirectTo: '/login' });
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
                id: payload.username,
                fullName: payload.username,
                role: payload.role,
            });
        } catch (error) {
            return Promise.reject('Invalid token');
        }
    },
    getPermissions: () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return Promise.resolve('guest');
            const payload = JSON.parse(atob(token.split('.')[1]));
            return Promise.resolve(payload.role);
        } catch (error) {
            return Promise.resolve('guest');
        }
    },
};


export default authProvider;