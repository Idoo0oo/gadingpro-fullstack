// gadingpro-admin-panel/src/dataProvider.ts
import { stringify } from 'query-string';
import { fetchUtils } from 'react-admin';
import type { DataProvider, PaginationPayload, SortPayload } from 'react-admin';

const currentOrigin = window.location.origin;
let backendBaseUrl: string;

if (currentOrigin.includes('.devtunn.ms') || currentOrigin.includes('.vercel.app')) {
  const backendPort = import.meta.env.VITE_APP_BACKEND_PORT;
  backendBaseUrl = currentOrigin.replace(/-\d+\.(devtunn\.ms|vercel\.app)/, `-${backendPort}.$1`);
} else {
  backendBaseUrl = `http://localhost:${import.meta.env.VITE_APP_BACKEND_PORT}`;
}

// Menggunakan variabel lingkungan dari Vite
const apiUrlBase = `${backendBaseUrl}${import.meta.env.VITE_APP_API_BASE_PATH}`;

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = new Headers(options.headers);
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const { pagination, sort } = params as { pagination?: PaginationPayload, sort?: SortPayload };
        const { page, perPage } = pagination || { page: 1, perPage: 10 };
        const { field, order } = sort || { field: 'id', order: 'ASC' };
        
        const query: { [key: string]: any } = {
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage - 1,
        };

        if (params.filter && params.filter.q) {
            query.q = params.filter.q;
        }
        if (params.filter && params.filter.id && Array.isArray(params.filter.id)) {
            query.id = params.filter.id;
        }

        const customFilters = { ...params.filter };
        delete customFilters.q;
        delete customFilters.id;
        Object.assign(query, customFilters);

        const url = `${apiUrlBase}/${resource}?${stringify(query)}`;
        
        // console.log('DEBUG: dataProvider trying to fetch URL:', url); // Hapus log ini di produksi

        return httpClient(url).then(({ headers, json }) => {
           const totalCount = parseInt(headers.get('x-total-count') || '0', 10);
            return {
                data: json,
                total: totalCount,
            };
        });
    },

     getOne: (resource, params) =>
        httpClient(`${apiUrlBase}/${resource}/${params.id}`).then(({ json }) => ({ data: json })),
    getMany: (resource, params) => {
        const query = { id: params.ids };
        const url = `${apiUrlBase}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { pagination, sort } = params as { pagination?: PaginationPayload, sort?: SortPayload };
        const { page, perPage } = pagination || { page: 1, perPage: 10 };
        const { field, order } = sort || { field: 'id', order: 'ASC' };
        
        const query: { [key: string]: any } = {
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage - 1,
            [params.target]: params.id, // Reference filter
        };
        // Add other custom filters from React Admin if needed
        Object.assign(query, params.filter);

        const url = `${apiUrlBase}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ headers, json }) => ({ data: json, total: parseInt(headers.get('x-total-count') || '0', 10) }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrlBase}/${resource}/${params.id}`, { method: 'PUT', body: JSON.stringify(params.data) }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        return Promise.all(params.ids.map(id => httpClient(`${apiUrlBase}/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(params.data) }))).then(() => ({ data: params.ids }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrlBase}/${resource}`, { method: 'POST', body: JSON.stringify(params.data) }).then(({ json }) => ({ data: json })),

    delete: (resource, params) =>
        httpClient(`${apiUrlBase}/${resource}/${params.id}`, { method: 'DELETE' }).then(({ json }) => ({ data: json })),

   deleteMany: (resource, params) => {
        const query = { id: params.ids };
        const url = `${apiUrlBase}/${resource}?${stringify(query)}`;
        return httpClient(url, { method: 'DELETE' }).then(() => ({ data: params.ids }));
    },
};

export default dataProvider;