import { useEffect, useState } from 'react';
import { Container, Table, Badge, Spinner } from 'react-bootstrap';
import api from '../services/api';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders", error);
            setLoading(false);
        }
    };

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <Container className="mt-4">
            <h2 className="mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <Table responsive hover striped>
                    <thead className="table-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {order.items.map((item) => (
                                        <div key={item._id}>
                                            {item.bookId?.title} (x{item.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td>₹{order.totalAmount}</td>
                                <td>
                                    <Badge bg={order.paymentStatus === 'SUCCESS' ? 'success' : 'warning'}>
                                        {order.paymentStatus}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default MyOrders;
