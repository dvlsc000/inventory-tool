import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchProducts = () => API.get('/products');
export const addProduct = (product) => API.post('/products', product);
export const recordSale = (sale) => API.post('/sales', sale);
export const getLowStock = () => API.get('/low-stock');
export const getAnalytics = () => API.get('/analytics');
