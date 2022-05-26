import http from '../http-common';

const getAll = () => {
    return http.get('/unicomer');
}

const getById = (id: number) => {
    return http.get(`/unicomer/${id}`);
}

const createCustomer = (data: any) => {
    return http.post('/unicomer', data);
}

const deleteCustomer = (id: number) => {
    return http.delete(`/unicomer/${id}`);
}

const updateCustomer = (id: number, data: any) => {
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