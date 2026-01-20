import { useState, useContext, useEffect } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus, FaMinus, FaMapMarkerAlt } from 'react-icons/fa';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartCount } = useContext(CartContext);
    const [activeStep, setActiveStep] = useState(1); // 1: Cart, 2: Customer Details, 3: Summary
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const response = await api.get('/addresses');
            setAddresses(response.data);
            if (response.data.length > 0) {
                setSelectedAddressId(response.data[0]._id);
            }
        } catch (error) {
            console.error("Error fetching addresses", error);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.bookId.price * item.quantity), 0);
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.error('Please select a delivery address');
            return;
        }

        try {
            const payload = {
                items: cart.map(item => ({ bookId: item.bookId._id, quantity: item.quantity })),
                addressId: selectedAddressId,
                totalAmount: calculateTotal(),
                paymentStatus: 'SUCCESS'
            };
            const response = await api.post('/orders', payload);
            toast.success('Order Placed Successfully!');
            clearCart();
            navigate('/order-success', { state: { order: response.data } });
        } catch (error) {
            toast.error('Failed to place order');
        }
    };

    if (cart.length === 0 && activeStep === 1) {
        return (
            <Container className="mt-5 text-center">
                <h2 className="fw-bold">Your Cart is Empty</h2>
                <Button variant="primary" className="mt-3 btn-add-bag" style={{ width: '200px' }} onClick={() => navigate('/')}>
                    Start Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Container className="py-5" style={{ maxWidth: '900px' }}>
            {/* Step 1: My Cart */}
            <div className="checkout-step">
                <div className="checkout-step-header" onClick={() => setActiveStep(1)}>
                    <span>My cart ({getCartCount()})</span>
                </div>
                {activeStep === 1 && (
                    <div className="checkout-step-body">
                        {cart.map((item) => (
                            <div key={item.bookId._id} className="cart-item-checkout">
                                <img src={item.bookId.imageUrl} alt={item.bookId.title} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x150?text=Cover"; }} />
                                <div className="cart-item-details">
                                    <div className="cart-item-title">{item.bookId.title}</div>
                                    <div className="cart-item-author">{item.bookId.author}</div>
                                    <div className="cart-item-price">Rs. {item.bookId.price}</div>
                                    <div className="qty-control">
                                        <button className="qty-btn" onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)} disabled={item.quantity <= 1}><FaMinus /></button>
                                        <span className="qty-val">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)}><FaPlus /></button>
                                        <button className="remove-btn" onClick={() => removeFromCart(item.bookId._id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="text-end mt-4">
                            <Button className="checkout-btn" onClick={() => setActiveStep(2)}>
                                PLACE ORDER
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Step 2: Customer Details */}
            <div className="checkout-step">
                <div className="checkout-step-header" onClick={() => setActiveStep(2)}>
                    <span>Customer Details</span>
                </div>
                {activeStep === 2 && (
                    <div className="checkout-step-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-bold" style={{ fontSize: '14px' }}>Address Details</span>
                            <Button variant="outline-primary" size="sm" style={{ fontSize: '10px' }}>Add New Address</Button>
                        </div>

                        <Row>
                            {addresses.map((addr) => (
                                <Col md={12} key={addr._id}>
                                    <div className={`address-box ${selectedAddressId === addr._id ? 'border-primary' : ''}`} onClick={() => setSelectedAddressId(addr._id)} style={{ cursor: 'pointer' }}>
                                        <Form.Check
                                            type="radio"
                                            name="address"
                                            id={`addr-${addr._id}`}
                                            label={
                                                <div style={{ paddingLeft: '10px' }}>
                                                    <div className="address-type-badge">{addr.type || 'HOME'}</div>
                                                    <div style={{ fontSize: '14px', fontWeight: '700' }}>{addr.name} | {addr.phone}</div>
                                                    <div style={{ fontSize: '13px', color: '#333' }}>{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</div>
                                                </div>
                                            }
                                            checked={selectedAddressId === addr._id}
                                            onChange={() => setSelectedAddressId(addr._id)}
                                        />
                                        {selectedAddressId === addr._id && (
                                            <div className="text-end mt-2">
                                                <Button className="checkout-btn" onClick={() => setActiveStep(3)}>CONTINUE</Button>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </div>

            {/* Step 3: Order Summary */}
            <div className="checkout-step">
                <div className="checkout-step-header" onClick={() => setActiveStep(3)}>
                    <span>Order summary</span>
                </div>
                {activeStep === 3 && (
                    <div className="checkout-step-body">
                        {cart.map((item) => (
                            <div key={item.bookId._id} className="cart-item-checkout mb-3">
                                <img src={item.bookId.imageUrl} alt={item.bookId.title} style={{ width: '60px', height: '80px' }} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x150?text=Cover"; }} />
                                <div className="cart-item-details">
                                    <div className="cart-item-title" style={{ fontSize: '14px' }}>{item.bookId.title}</div>
                                    <div className="cart-item-author" style={{ fontSize: '11px' }}>{item.bookId.author}</div>
                                    <div className="cart-item-price" style={{ fontSize: '16px' }}>Rs. {item.bookId.price}</div>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="fw-bold fs-5">Total: Rs. {calculateTotal()}</div>
                            <Button className="checkout-btn" onClick={handlePlaceOrder}>
                                CHECKOUT
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Cart;
