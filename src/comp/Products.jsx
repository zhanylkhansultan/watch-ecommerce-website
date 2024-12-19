
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // Create this file for custom styling

const Products = () => {
    const [products, setProducts] = useState([]); // State to hold product data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    useEffect(() => {
        // Fetch products from the API
        axios
            .get('http://localhost:9000/products/list', {
                // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Optional token if required
            })
            .then((res) => {
                setProducts(res.data.content); // Update the products state
                setLoading(false); // Stop loading
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again.');
                setLoading(false); // Stop loading
            });
    }, []);

    if (loading) return <div>Loading products...</div>; // Display loading state
    if (error) return <div className="error-message">{error}</div>; // Display error message

    return (
        <div className="products-container">
            <h1>Products</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            src={product.imageUrl || '/images/default-product.jpg'}
                            alt={product.name}
                            className="product-image"
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
