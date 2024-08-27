const express = require('express');
const router = express.Router();
const { getProducts, getProductDetails } = require('../controllers/productController');

router.get('/companies/:company/categories/:category/products', getProducts);
router.get('/companies/:company/categories/:category/products/:productId', getProductDetails);
router.get('/products/:productId', getProductDetails);
module.exports = router;
