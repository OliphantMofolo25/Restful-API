const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5001/users');
        if (Array.isArray(response.data)) {
            setUsers(response.data);
        } else {
            console.error("Expected an array but got:", response.data);
            setUsers([]);
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        setError('Failed to fetch users.');
    }
};

const fetchProducts = async () => {
    try {
        const response = await axios.get('http://localhost:5002/products');
        if (Array.isArray(response.data)) {
            setProducts(response.data);
        } else {
            console.error("Expected an array but got:", response.data);
            setProducts([]);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        setError('Failed to fetch products.');
    }
};

const fetchOrders = async () => {
    try {
        const response = await axios.get('http://localhost:5003/orders');
        if (Array.isArray(response.data)) {
            setOrders(response.data);
        } else {
            console.error("Expected an array but got:", response.data);
            setOrders([]);
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        setError('Failed to fetch orders.');
    }
};

const createUser  = async () => {
    try {
        const response = await axios.post('http://localhost:5001/users', user);
        if (Array.isArray(response.data)) {
            setUsers(response.data); // Update users with the response
        } else {
            console.error("Expected an array but got:", response.data);
            setUsers([]);
        }
        setUser ({ name: '' });
    } catch (error) {
        console.error("Error creating user:", error);
        setError('Failed to create user.');
    }
};

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchUsers(), fetchProducts(), fetchOrders()]);
        setLoading(false);
    };
    fetchData();
}, []);

return (
    <div className="container">
        <h1>Sleek Fetch Logistics</h1>
        <p>Your reliable runner service for seamless online shopping.</p>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <h2>User Management</h2>
        <input
            type="text"
            placeholder="User  Name"
            value={user.name}
            onChange={(e) => setUser ({ name: e.target.value })}
        />
        <button onClick={createUser }>Add User</button>
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
        <h2>Orders</h2>
        <ul>
            {Array.isArray(orders) && orders.map(o => (
                <li key={o.id}>Order for Product ID: {o.productId} by User ID: {o.userId}</li>
            ))}
        </ul>
    </div>
);