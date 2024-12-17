import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [product, setProduct] = useState ({ name: '' });

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5002/products');
        setProducts(response.data);
    };

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5001/users');
        setUsers(response.data);
    };

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:5003/orders');
        setOrders(response.data);
    };

    const createProduct = async () => {
        const response = await axios.post('http://localhost:5002/products', product);
        setProducts(response.data); // Update products with the response
        setProduct({ name: '' }); // Clear input
    };

    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Product Management</h1>
            <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => setProduct({ name: e.target.value })}
            />
            <button onClick={createProduct}>Add Product</button>
            <h2>Products</h2>
            <ul>
                {products.map(p => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
            <h2>Users</h2>
            <ul>
                {users.map(u => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
            <h2>Orders</h2>
            <ul>
                {orders.map(o => (
                    <li key={o.id}>Order for Product ID: {o.productId} by User ID: {o.userId}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;