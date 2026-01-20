import { Container, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import api from '../services/api';
import BookCard from '../components/BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('Sort by relevance');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 20;

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const fetchBooks = async (page) => {
        setLoading(true);
        try {
            const response = await api.get(`/books?page=${page}&limit=${limit}`);
            const data = response.data;
            setBooks(data.books || []);
            setTotalPages(data.totalPages || 1);
            setTotalItems(data.total || 0);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching books", err);
            setError('Failed to load books. Please try again later.');
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    if (loading && books.length === 0) return (
        <Container className="d-flex justify-content-center mt-5">
            <Spinner animation="border" role="status" style={{ color: '#A03037' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );

    if (error) return (
        <Container className="mt-5">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container className="mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-baseline gap-2">
                    <h3 className="fw-bold mb-0" style={{ fontSize: '20px' }}>Books</h3>
                    <span className="text-muted" style={{ fontSize: '13px' }}>({totalItems} items)</span>
                </div>
                <div style={{ width: '150px' }}>
                    <Form.Select
                        size="sm"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{ fontSize: '12px', borderRadius: '2px', border: '1px solid #E4E4E4' }}
                    >
                        <option>Sort by relevance</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </Form.Select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" style={{ color: '#A03037' }} />
                </div>
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {books.map((book) => (
                        <Col key={book._id}>
                            <BookCard book={book} />
                        </Col>
                    ))}
                </Row>
            )}

            {!loading && books.length === 0 && (
                <div className="text-center mt-5">
                    <h3 className="text-muted">No books available at the moment.</h3>
                </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
                <div className="pagination-custom">
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            )}
        </Container>
    );
};

export default Home;
