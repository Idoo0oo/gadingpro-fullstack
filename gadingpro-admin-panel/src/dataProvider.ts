// gadingpro-admin-panel/src/dataProvider.ts
import { stringify } from 'query-string';
import { fetchUtils } from 'react-admin';
import type { DataProvider, PaginationPayload, SortPayload } from 'react-admin';

const apiUrl = 'http://localhost:5000/api';

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

        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        
        console.log('DEBUG: dataProvider trying to fetch URL:', url);

        return httpClient(url).then(({ headers, json }) => {
            // --- DEBUG LOGS BARU ---
            console.log('DEBUG: Raw X-Total-Count header:', headers.get('x-total-count'));
            console.log('DEBUG: Raw JSON response:', json);

            // Sederhanakan parsing total count untuk kasus hanya angka
            const totalCount = parseInt(headers.get('x-total-count') || '0', 10);
            
            console.log('DEBUG: Parsed Total Count:', totalCount);
            console.log('DEBUG: Sample Data (first item):', json && json.length > 0 ? json[0] : 'No data');
            // --- AKHIR DEBUG LOGS BARU ---

            return {
                data: json,
                total: totalCount, // Gunakan totalCount yang sudah disederhanakan
            };
        });
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            id: params.ids, // Array of IDs
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
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

        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('x-total-count')?.split('/').pop() || '0', 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            id: params.ids,
        };
        // Note: updateMany might not be directly supported by a simple REST API
        // You might need to loop through params.ids and send multiple PUT requests,
        // or implement a custom bulk update endpoint in your backend.
        // For simplicity, let's assume the backend can handle a filter by IDs in PUT for now.
        // If not, React Admin will fallback to multiple single updates.
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json,
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            id: params.ids, // Array of IDs
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(() => ({ data: params.ids })); // React Admin expects the deleted IDs back
    },
};

export default dataProvider;