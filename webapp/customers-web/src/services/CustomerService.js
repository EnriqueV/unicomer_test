import http from './http-common.js';

const getAll = () => {
    return http.get('/unicomer');
}

const getById = (id) => {
    return http.get(`/unicomer/${id}`);
}

const createCustomer = (data) => {
    return http.post('/unicomer', data);
}

const deleteCustomer = (id) => {
    return http.delete(`/unicomer/${id}`);
}

const updateCustomer = (id, data) => {
    return http.put(`/unicomer/${id}`, data);
}

const CustomerService = {
    getAll,
    getById,
    createCustomer,
    deleteCustomer,
    updateCustomer
}

export default CustomerService;