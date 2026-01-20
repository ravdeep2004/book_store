import { Container, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft, FaReceipt } from 'react-icons/fa';

const OrderSuccess = () => {
    const location = useLocation();
    const orderData = location.state?.order;

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="text-center shadow-lg p-5 border-0" style={{ maxWidth: '600px', borderRadius: '20px' }}>
                <Card.Body>
                    <FaCheckCircle className="text-success mb-4" size={80} />
                    <h1 className="fw-bold mb-3">Order Placed!</h1>
                    <p className="text-muted fs-5 mb-4">
                        Thank you for shopping with <strong>BookLane</strong>. Your order has been placed successfully and is being processed.
                    </p>

                    {orderData && (
                        <Card className="bg-light border-0 mb-4 text-start">
                            <Card.Body>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Order ID:</span>
                                    <span className="fw-bold">{orderData._id || 'N/A'}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Total Amount:</span>
                                    <span className="fw-bold text-primary">₹{orderData.totalAmount}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="text-muted">Payment Status:</span>
                                    <span className="badge bg-success">{orderData.paymentStatus}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    <div className="d-grid gap-3">
                        <Link to="/my-orders">
                            <Button variant="primary" size="lg" className="w-100 rounded-pill fw-bold">
                                <FaReceipt className="me-2" /> View My Orders
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button variant="outline-primary" size="lg" className="w-100 rounded-pill fw-bold">
                                <FaArrowLeft className="me-2" /> Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OrderSuccess;
