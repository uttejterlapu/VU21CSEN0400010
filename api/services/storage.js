// In-memory storage for products
let productsCache = [];

const setProducts = (products) => {
    productsCache = products;
};

const getProductById = (productId) => {
    return productsCache.find(product => product.id === productId);
};

module.exports = { setProducts, getProductById };
