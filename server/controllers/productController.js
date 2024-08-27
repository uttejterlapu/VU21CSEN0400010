const { fetchProducts } = require('../services/apiService');
const { getProductById } = require('../services/storage');

const acceptedCompanies = ["AMZ", "FLP", "SNP", "ΜΥΝ", "ΑΖΟ"];
const acceptedCategories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const getProducts = async (req, res) => {
    const { company, category } = req.params;
    const { top, minPrice, maxPrice } = req.query;
    
    if (!acceptedCompanies.includes(company)) {
        return res.status(400).json({ error: 'Invalid company name' });
    }

    if (!acceptedCategories.includes(category)) {
        return res.status(400).json({ error: 'Invalid category name' });
    }

    try {
        const products = await fetchProducts(company, category, top, minPrice, maxPrice);
        console.log(products);
        
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductDetails = (req, res) => {
    const { productId } = req.params;

    try {
        const product = getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getProducts, getProductDetails };
