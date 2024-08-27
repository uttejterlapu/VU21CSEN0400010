const https = require('https');
const { v4: uuidv4 } = require('uuid'); // Import the UUID library for unique IDs
const { getAuthToken } = require('./authService');

const apiBaseUrl = 'https://20.244.56.144/test';

// Function to fetch product data using the obtained bearer token
const fetchProductData = (bearerToken) => {
    return new Promise((resolve, reject) => {
        const companyName = 'AMZ'; // Example company name
        const categoryName = 'Laptop'; // Example category name
        const topN = 10; // Number of top products
        const minPrice = 100; // Minimum price
        const maxPrice = 2000; // Maximum price

        const url = `${apiBaseUrl}/companies/${companyName}/categories/${categoryName}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            rejectUnauthorized: false // This allows self-signed certificates
        };

        const req = https.request(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const products = JSON.parse(data);
                    
                    // Assign a unique ID to each product
                    const productsWithIds = products.map(product => ({
                        ...product,
                        id: uuidv4() // Assign a unique ID
                    }));
                    
                    resolve(productsWithIds);
                } catch (err) {
                    reject(new Error('Error parsing JSON response:', err.message));
                }
            });
        });

        req.on('error', (err) => {
            reject(new Error('Error making GET request:', err.message));
        });

        req.end();
    });
};

// Function to get the bearer token and then fetch product data
const getAndFetchProductData = async () => {
    try {
        const bearerToken = await getAuthToken();
        const products = await fetchProductData(bearerToken);
        return products;
    } catch (err) {
        throw new Error('Error:', err.message);
    }
};

module.exports = { getAndFetchProductData };
