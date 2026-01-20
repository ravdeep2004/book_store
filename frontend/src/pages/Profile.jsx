import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        if (user) {
            fetchAddresses();
        }
    }, [user]);

    const fetchAddresses = async () => {
        try {
            const response = await api.get('/addresses');
            setAddresses(response.data);
        } catch (error) {
            console.error("Error fetching addresses", error);
        }
    };

    if (!user) {
        return (
            <Container className="py-5 text-center">
                <h2>Please login to view your profile</h2>
                <Link to="/login" className="btn btn-primary mt-3">Login</Link>
            </Container>
        );
    }

    return (
        <Container className="py-5" style={{ maxWidth: '900px' }}>
            <div className="breadcrumb-custom">
                <Link to="/" style={{ color: '#9D9D9D' }}>Home</Link> / <span className="active">Profile</span>
            </div>

            <Row className="mt-4">
                <Col md={4}>
                    <Card className="text-center p-4 border-0 shadow-sm" style={{ borderRadius: '8px' }}>
                        <div className="mx-auto mb-3" style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: '#A03037',
                            display: 'flex',
                            align_items: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '32px'
                        }}>
                            {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <h4 className="fw-bold mb-1">{user.name}</h4>
                        <p className="text-muted small">{user.email}</p>
                        <hr />
                        <div className="d-grid gap-2">
                            <Link to="/my-orders" className="btn btn-outline-secondary btn-sm">My Orders</Link>
                            <Button variant="outline-danger" size="sm" onClick={logout}>
                                <FaSignOutAlt className="me-2" /> Logout
                            </Button>
                        </div>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="p-4 border-0 shadow-sm mb-4" style={{ borderRadius: '8px' }}>
                        <h5 className="fw-bold mb-4">Personal Information</h5>
                        <div className="mb-3">
                            <label className="text-muted small d-block">Full Name</label>
                            <div className="fw-bold">{user.name}</div>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small d-block">Email Address</label>
                            <div className="fw-bold">{user.email}</div>
                        </div>
                    </Card>

                    <Card className="p-4 border-0 shadow-sm" style={{ borderRadius: '8px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Delivery Addresses</h5>
                        </div>

                        {addresses.length === 0 ? (
                            <p className="text-muted small">No addresses saved yet.</p>
                        ) : (
                            addresses.map((addr) => (
                                <div key={addr._id} className="address-box p-3 mb-3" style={{ border: '1px solid #E4E4E4', borderRadius: '4px' }}>
                                    <div className="address-type-badge">{addr.type || 'HOME'}</div>
                                    <div className="fw-bold fs-6 mb-1">{addr.name} | {addr.phone}</div>
                                    <div className="text-muted small">
                                        {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                                    </div>
                                </div>
                            ))
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
