// gadingpro-admin/src/dataProvider.js (VERSI FINAL YANG DIPERBAIKI)

import { fetchUtils } from 'react-admin';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

/**
 * --- PENAMBAHAN FUNGSI KONVERSI GAMBAR ---
 * Mengubah file menjadi format base64
 * @param {File} file 
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file.rawFile);
    });

/**
 * --- PENAMBAHAN FUNGSI UNTUK MENANGANI UPLOAD ---
 * @param {Object} params
 */
const addUploadCapabilities = async (params) => {
    // Untuk gambar utama (image)
    if (params.data.image && params.data.image.rawFile instanceof File) {
        const base64 = await convertFileToBase64(params.data.image);
        params.data.image = base64;
    }

    // Untuk gambar galeri (images) yang bisa lebih dari satu
    if (params.data.images && params.data.images.length) {
        // Filter hanya file baru yang perlu di-upload
        const newImages = params.data.images.filter(
            p => p.rawFile instanceof File
        );
        // Pertahankan gambar lama (yang sudah berupa URL/string)
        const formerImages = params.data.images.filter(
            p => !(p.rawFile instanceof File)
        );

        const base64NewImages = await Promise.all(
            newImages.map(convertFileToBase64)
        );

        params.data.images = [...formerImages.map(p => p.src || p), ...base64NewImages];
    }

    if (params.data.profilePicture && params.data.profilePicture.rawFile instanceof File) {
        const base64 = await convertFileToBase64(params.data.profilePicture);
        params.data.profilePicture = base64;
    }
    
    return params;
};

export const baseDataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        // Perhitungan start dan end untuk pagination
        const start = (page - 1) * perPage;
        const end = page * perPage - 1;

        // DIPERBAIKI: Membuat query string dengan format yang benar (_start, _end, dll)
        const query = {
            _sort: field,
            _order: order,
            _start: start,
            _end: end,
            filter: JSON.stringify(params.filter),
        };

        const url = `${apiUrl}/api/${resource}?${new URLSearchParams(query).toString()}`;

        return httpClient(url).then(({ headers, json }) => {
            if (!headers.get('content-range')) {
                throw new Error(
                    'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                );
            }
            return {
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };
        });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/api/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/api/${resource}?${new URLSearchParams(query).toString()}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const start = (page - 1) * perPage;
        const end = page * perPage - 1;

        const query = {
            _sort: field,
            _order: order,
            _start: start,
            _end: end,
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/api/${resource}?${new URLSearchParams(query).toString()}`;

        return httpClient(url).then(({ headers, json }) => {
            if (!headers.get('content-range')) {
                throw new Error('The Content-Range header is missing in the HTTP Response.');
            }
            return {
                data: json,
                total: parseInt(headers.get('content-range').split('/').pop(), 10),
            };
        });
    },

    create: async (resource, params) => {
        const processedParams = await addUploadCapabilities(params);
        return httpClient(`${apiUrl}/api/${resource}`, {
            method: 'POST',
            body: JSON.stringify(processedParams.data),
        }).then(({ json }) => ({
            data: { ...processedParams.data, id: json.id },
        }));
    },

    update: async (resource, params) => {
        const processedParams = await addUploadCapabilities(params);
        return httpClient(`${apiUrl}/api/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(processedParams.data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/api/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(() => ({ data: { id: params.id } })), // <-- Kembalikan ID record yang dihapus

    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/api/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(() => ({ data: params.ids })), // <-- Kembalikan array ID yang dihapus
};

export default baseDataProvider;