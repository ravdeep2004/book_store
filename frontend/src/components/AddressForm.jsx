import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

const AddressForm = ({ show, handleClose, refreshAddresses }) => {
    const [formData, setFormData] = useState({
        name: '', phone: '', street: '', city: '', state: '', pincode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/addresses', formData);
            toast.success('Address Added Successfully');
            refreshAddresses();
            handleClose();
            setFormData({ name: '', phone: '', street: '', city: '', state: '', pincode: '' });
        } catch (error) {
            toast.error('Failed to add address');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Street</Form.Label>
                        <Form.Control type="text" name="street" value={formData.street} onChange={handleChange} required />
                    </Form.Group>
                    <div className="d-flex gap-2">
                        <Form.Group className="mb-2 w-50">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-2 w-50">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required />
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-2">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Save Address
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddressForm;
