import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({ productId: '', userId: '' });

    // Fetch orders from the Order Management API
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5003/orders');
            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setOrders([]); // Reset to empty array if not an array
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Fetch users from the User Management API
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5001/users');
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setUsers([]); // Reset to empty array if not an array
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch products from the Product Management API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5002/products');
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setProducts([]); // Reset to empty array if not an array
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Create a new order
    const createOrder = async () => {
        try {
            const response = await axios.post('http://localhost:5003/orders', order);
            if (Array.isArray(response.data)) {
                setOrders(response.data); // Update orders with the response
            } else {
                console.error("Expected an array but got:", response.data);
                setOrders([]); // Reset to empty array if not an array
            }
            setOrder({ productId: '', userId: '' }); // Clear input
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Order Management</h1>
            <input
                type="text"
                placeholder="Product ID"
                value={order.productId}
                onChange={(e) => setOrder({ ...order, productId: e.target.value })}
            />
            <input
                type="text"
                placeholder="User  ID"
                value={order.userId}
                onChange={(e) => setOrder({ ...order, userId: e.target.value })}
            />
            <button onClick={createOrder}>Add Order</button>
            <h2>Orders</h2>
            <ul>
                {Array.isArray(orders) && orders.map(o => (
                    <li key={o.id}>Order for Product ID: {o.productId} by User ID: {o.userId}</li>
                ))}
            </ul>
            <h2>Users</h2>
            <ul>
                {Array.isArray(users) && users.map(u => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
            <h2>Products</h2>
            <ul>
                {Array.isArray(products) && products.map(p => (
                    <li key={p.id}>{p.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;