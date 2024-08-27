import React, { useState } from 'react';
import { Grid } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css'; // You can choose a different theme
import { useNavigate } from 'react-router-dom';

const Companies = ["AMZ", "FLP", "SNP", "ΜΥΝ", "ΑΖΟ"];
const Categories = [
    "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger",
    "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker",
    "Headset", "Laptop", "PC"
];

const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [topN, setTopN] = useState(10);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const navigate = useNavigate();

    // Fetch products based on selected company and category
    const fetchProducts = async () => {
        if (!selectedCompany || !selectedCategory) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/companies/${selectedCompany}/categories/${selectedCategory}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`
            );

            if (!response.ok) {
                const text = await response.text();
                console.error('Error response:', text);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchProducts();
    };

    // Transform data to match Grid.js expected format (excluding 'id')
    const formattedData = products.map(product => [
        product.productName,
        product.price,
        product.rating,
        product.discount,
        product.availability,
        {
            element: (
                <button
                    onClick={() => handleProductClick(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                >
                    View Details
                </button>
            )
        }
    ]);

    // Handle product details button click
    const handleProductClick = (product) => {
        console.log('Product data:', product);
        // Optionally, navigate to product details page
        // navigate(`/product/${product.id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-lg">
                <div className='d-flex gap-4 flex-wrap'>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Company:
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Company</option>
                                {Companies.map((company) => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Category:
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Category</option>
                                {Categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <div className='d-flex gap-4 flex-wrap'>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Top N:
                            <input
                                type="number"
                                value={topN}
                                onChange={(e) => setTopN(e.target.value)}
                                min="1"
                                max="50"
                                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Min Price:
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                min="1"
                                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Max Price:
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                min="0"
                                className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </label>
                    </div>
                </div>
                <button type="submit" className="bg-primary border-none  px-4 py-2 rounded shadow hover:bg-blue-600 text-white">
                    Fetch Products
                </button>
            </form>
            <Grid
                data={formattedData}
                columns={[
                    { id: 'productName', name: 'Product Name', filter: true },
                    { id: 'price', name: 'Price', filter: true },
                    { id: 'rating', name: 'Rating', filter: true },
                    { id: 'discount', name: 'Discount', filter: true },
                    { id: 'availability', name: 'Availability', filter: true },
                ]}
                pagination={{ enabled: true, limit: 10 }}
            />
        </div>
    );
};

export default ProductsTable;
