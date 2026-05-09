import { getCache, setCache } from './cache';

const BASE_URL = 'https://itx-frontend-test.onrender.com'; 

export const getProducts = async () => {
    const cached = getCache('products');
    if (cached) return cached; // Si hay datos en cache, retornarlos

    // Si no hay datos en cache, hacer la petición a la API
    const response = await fetch(`${BASE_URL}/api/products`);
    const data = await response.json();

    setCache('products', data); // Almacenar los datos en cache
    return data;
};

export const getProductById = async (id) => {
    const cachedKey = `product_${id}`;
    const cached = getCache(cachedKey);
    if (cached) return cached; // Si hay datos en cache, retornarlos

    // Si no hay datos en cache, hacer la petición a la API
    const response = await fetch(`${BASE_URL}/api/products/${id}`);
    const data = await response.json();

    setCache(cachedKey, data); // Almacenar los datos en cache
    return data;
};

export const addToCart = async (id, colorCode, storageCode) => {
    const response = await fetch(`${BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, colorCode, storageCode })
    });
    return response.json(); // Devuelve { count: number }
}