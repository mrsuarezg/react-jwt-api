import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { fetchWrapper, history } from '@/_helpers';

const materialSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/materials`;
const suppliersUrl = `${config.apiUrl}/materials/suppliers`;

export const materialService = {    
    getAll,
    getSuppliers,
    getById,
    create,
    update,
    delete: _delete,
    material: materialSubject.asObservable(),
    get materialValue () { return materialSubject.value }
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getSuppliers(){
    return fetchWrapper.get(suppliersUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscore because 'delete' is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}