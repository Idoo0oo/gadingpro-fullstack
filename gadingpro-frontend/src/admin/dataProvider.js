import { fetchUtils } from 'react-admin';

// Mengatur URL API backend secara dinamis
const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// Fungsi helper untuk menambahkan token otentikasi ke setiap request
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

// Objek dataProvider yang berisi semua logika untuk interaksi API
export const dataProvider = {
    // Mengambil daftar data (misal: semua proyek)
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/api/${resource}?${new URLSearchParams(query).toString()}`;
        return httpClient(url).then(({ headers, json }) => {
            // React Admin membutuhkan header 'Content-Range' untuk paginasi
            const contentRange = headers.get('Content-Range');
            if (!contentRange) {
                console.error('The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?');
                // Fallback jika header tidak ada
                return {
                    data: json,
                    total: json.length,
                };
            }
            return {
                data: json,
                total: parseInt(contentRange.split('/').pop(), 10),
            };
        });
    },

    // Mengambil satu data spesifik
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/api/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    // Mengambil beberapa data berdasarkan ID
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/api/${resource}?${new URLSearchParams(query).toString()}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    // Mengambil data referensi
    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/api/${resource}?${new URLSearchParams(query).toString()}`;
        return httpClient(url).then(({ headers, json }) => {
            const contentRange = headers.get('Content-Range');
            if (!contentRange) {
                console.error('Missing Content-Range header');
                return { data: json, total: json.length };
            }
            return {
                data: json,
                total: parseInt(contentRange.split('/').pop(), 10),
            };
        });
    },

    // Membuat data baru
    create: (resource, params) =>
        httpClient(`${apiUrl}/api/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    // Memperbarui data yang ada
    update: (resource, params) =>
        httpClient(`${apiUrl}/api/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    // Menghapus satu data
    delete: (resource, params) =>
        httpClient(`${apiUrl}/api/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    // Menghapus beberapa data
    deleteMany: (resource, params) => {
        const requests = params.ids.map(id =>
            httpClient(`${apiUrl}/api/${resource}/${id}`, {
                method: 'DELETE',
            })
        );
        return Promise.all(requests).then(() => ({ data: params.ids }));
    },
};

export default dataProvider;