const CACHE_DURATION = 60 * 60 * 1000; // 1 HORA

export const setCache = (key, data) => {
    const item = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export const getCache = (key) => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const item = JSON.parse(raw);
    const isExpired = (Date.now() - item.timestamp) > CACHE_DURATION;

    if (isExpired) {
        localStorage.removeItem(key); // Limpiar el cache si ha expirado
        return null;
    }

    return item.data; // Retornar los datos almacenados
};