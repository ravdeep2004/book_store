import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { FaStar, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

    useEffect(() => {
        fetchBook();
        fetchReviews();
    }, [id]);

    const fetchBook = async () => {
        try {
            const response = await api.get(`/books/${id}`);
            setBook(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching book", error);
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await api.get(`/reviews/${id}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews", error);
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to review');
            return;
        }
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }
        try {
            await api.post(`/reviews/${id}`, { rating, comment });
            toast.success('Review submitted');
            setComment('');
            setRating(0);
            fetchReviews();
            fetchBook();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        const parts = name.split(" ");
        return parts.map(p => p[0]).join("").toUpperCase().substring(0, 2);
    };

    const renderStars = (rating) => {
        return (
            <div className="review-stars">
                {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} color={s <= rating ? '#FFD700' : '#DCDCDC'} size={18} />
                ))}
            </div>
        );
    };

    const handleWishlistToggle = () => {
        if (isInWishlist(book._id)) {
            removeFromWishlist(book._id);
        } else {
            addToWishlist(book);
        }
    };

    if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" style={{ color: '#A03037' }} /></Container>;
    if (!book) return <Container className="mt-5"><h2>Book not found</h2></Container>;

    return (
        <Container className="detail-container">
            <div className="breadcrumb-custom">
                <Link to="/" style={{ color: '#9D9D9D' }}>Home</Link> / <span className="active">Book({book.title?.substring(0, 10)}...)</span>
            </div>

            <Row>
                <Col lg={6} className="detail-img-section">
                    <div className="detail-thumbnails d-none d-md-flex">
                        {[1, 2].map((_, i) => (
                            <div key={i} className="thumbnail-item">
                                <img src={book.imageUrl} alt="Thumbnail" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x150?text=Cover"; }} />
                            </div>
                        ))}
                    </div>
                    <div className="main-img-container">
                        <img src={book.imageUrl} alt={book.title} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600?text=No+Cover"; }} />
                    </div>
                </Col>

                <Col lg={6} className="detail-info-section">
                    <h1 className="detail-title">{book.title}</h1>
                    <div className="detail-author">by {book.author}</div>

                    <div className="detail-rating">
                        <div className="rating-badge" style={{ fontSize: '12px', padding: '3px 8px' }}>
                            <span>{book.averageRating || 4.5}</span> <FaStar size={10} />
                        </div>
                        <div className="rating-count" style={{ fontSize: '13px' }}>({reviews.length} Reviews)</div>
                    </div>

                    <div className="detail-price">
                        <span>Rs. {book.price}</span>
                        <span className="detail-old-price">Rs. {book.price + 500}</span>
                    </div>

                    <div className="detail-section">
                        <div className="detail-section-title">* Book Detail</div>
                        <p className="detail-description">
                            {book.description || "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."}
                        </p>
                    </div>

                    <div className="detail-btn-group mt-4 mb-4">
                        <Button className="btn-add-bag" onClick={() => addToCart(book)}>
                            ADD TO BAG
                        </Button>
                        <Button
                            className="btn-wishlist"
                            onClick={handleWishlistToggle}
                            style={{ backgroundColor: isInWishlist(book._id) ? '#A03037' : '#333232' }}
                        >
                            <FaHeart color={isInWishlist(book._id) ? '#fff' : '#fff'} />
                            {isInWishlist(book._id) ? ' REMOVE FROM WISHLIST' : ' WISHLIST'}
                        </Button>
                    </div>

                    <hr style={{ color: '#DCDCDC', margin: '30px 0' }} />

                    <div className="detail-section">
                        <div className="detail-section-title">Customer Feedback</div>

                        <div className="mb-5 p-4" style={{ backgroundColor: '#F5F5F5', borderRadius: '4px' }}>
                            <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '10px' }}>Overall rating</div>
                            <div className="d-flex mb-3 gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className="cursor-pointer"
                                        color={star <= rating ? '#FFD700' : '#DCDCDC'}
                                        onClick={() => setRating(star)}
                                        style={{ cursor: 'pointer', fontSize: '24px' }}
                                    />
                                ))}
                            </div>
                            <Form onSubmit={submitReview}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Write your review"
                                        style={{ fontSize: '14px', borderRadius: '2px', border: 'none' }}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <div className="text-end">
                                    <Button type="submit" style={{ backgroundColor: '#3371B5', border: 'none', padding: '6px 25px', borderRadius: '2px', fontSize: '14px' }}>
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>

                        {/* Detailed Reviews List */}
                        <div className="reviews-list">
                            {reviews.map((rev) => (
                                <div key={rev._id} className="review-item">
                                    <div className="review-avatar">
                                        {getInitials(rev.userId?.name)}
                                    </div>
                                    <div className="review-content">
                                        <div className="review-user-name">{rev.userId?.name || 'Customer'}</div>
                                        {renderStars(rev.rating)}
                                        <p className="review-text">{rev.comment}</p>
                                    </div>
                                </div>
                            ))}
                            {reviews.length === 0 && <p className="text-muted small">No reviews yet.</p>}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default BookDetails;
