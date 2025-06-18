// gadingpro-admin-panel/src/dataProvider.ts
import { stringify } from 'query-string';
import { fetchUtils } from 'react-admin';
import type { DataProvider, PaginationPayload, SortPayload } from 'react-admin';

const apiUrl = 'http://localhost:5000/api';
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const { pagination, sort } = params as { pagination?: PaginationPayload, sort?: SortPayload };
        const { page, perPage } = pagination || { page: 1, perPage: 10 };
        const { field, order } = sort || { field: 'id', order: 'DESC' };
        
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        
        console.log('DEBUG: dataProvider trying to fetch URL:', url); // Debug log

        return httpClient(url, {
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('x-total-count')?.split('/').pop() || '0', 10),
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url, {
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { pagination, sort } = params as { pagination?: PaginationPayload, sort?: SortPayload };
        const { page, perPage } = pagination || { page: 1, perPage: 10 };
        const { field, order } = sort || { field: 'id', order: 'DESC' };
        
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url, {
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('x-total-count')?.split('/').pop() || '0', 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ json }) => ({
            data: json,
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }),
        }).then(({ json }) => ({ data: json }));
    },
};

export default dataProvider;