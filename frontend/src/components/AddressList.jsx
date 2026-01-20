import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';
import api from '../services/api';
import AddressForm from './AddressForm';
import { toast } from 'react-toastify';

const AddressList = ({ onSelectAddress, selectedAddressId }) => {
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await api.get('/addresses');
            setAddresses(response.data);
            if (response.data.length > 0 && !selectedAddressId) {
                onSelectAddress(response.data[0]._id);
            }
        } catch (error) {
            console.error("Error fetching addresses", error);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await api.delete(`/addresses/${id}`);
                toast.success('Address deleted');
                fetchAddresses();
            } catch (error) {
                toast.error('Failed to delete address');
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Select Delivery Address</h5>
                <Button variant="outline-primary" size="sm" onClick={() => setShowModal(true)}>
                    <FaPlus /> Add New
                </Button>
            </div>

            <Row xs={1} md={2} className="g-3">
                {addresses.map((addr) => (
                    <Col key={addr._id}>
                        <Card
                            className={`h-100 cursor-pointer ${selectedAddressId === addr._id ? 'border-primary bg-light' : ''}`}
                            onClick={() => onSelectAddress(addr._id)}
                            style={{ cursor: 'pointer', borderWidth: selectedAddressId === addr._id ? '2px' : '1px' }}
                        >
                            <Card.Body>
                                <div className="d-flex justify-content-between">
                                    <span className="fw-bold">{addr.name}</span>
                                    <Button variant="link" className="text-danger p-0" onClick={(e) => handleDelete(addr._id, e)}>
                                        <FaTrash />
                                    </Button>
                                </div>
                                <div className="text-muted small">
                                    <div>{addr.street}</div>
                                    <div>{addr.city}, {addr.state} - {addr.pincode}</div>
                                    <div>Phone: {addr.phone}</div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {addresses.length === 0 && <p className="text-muted">No addresses found.</p>}

            <AddressForm show={showModal} handleClose={() => setShowModal(false)} refreshAddresses={fetchAddresses} />
        </div>
    );
};

export default AddressList;
