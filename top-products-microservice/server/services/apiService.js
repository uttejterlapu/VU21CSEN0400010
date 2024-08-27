const https = require('https');
const { v4: uuidv4 } = require('uuid');
const { getAuthToken } = require('./authService');
const { setProducts } = require('./storage');
const apiBaseUrl = 'https://20.244.56.144/test';

const fetchProducts = async (companyName, categoryName, topN, minPrice, maxPrice) => {
    // console.log(companyName, categoryName, topN, minPrice, maxPrice);
    
    try {
        const bearerToken = await getAuthToken();
        const url = new URL(`${apiBaseUrl}/companies/${companyName}/categories/${categoryName}/products`);
        
        url.searchParams.append('top', topN);
        if (minPrice) url.searchParams.append('minPrice', minPrice);
        if (maxPrice) url.searchParams.append('maxPrice', maxPrice);

        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            },
            rejectUnauthorized: false
        };

        return new Promise((resolve, reject) => {
            const req = https.request(url.toString(), options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const products = JSON.parse(data);
                        setProducts(products)
                        const productsWithIds = products.map(product => ({
                            ...product,
                            id: uuidv4()
                        }));
                        resolve(productsWithIds);
                    } catch (err) {
                        reject(new Error('Error parsing JSON response: ' + err.message));
                    }
                });
            });

            req.on('error', (err) => {
                reject(new Error('Error making GET request: ' + err.message));
            });

            req.end();
        });
    } catch (err) {
        throw new Error('Error in fetchProducts: ' + err.message);
    }
};

module.exports = { fetchProducts };
