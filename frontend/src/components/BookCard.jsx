import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/book/${book._id}`);
    };

    return (
        <div className="book-card-item" onClick={handleClick}>
            <div className="book-card-img-container">
                {book.imageUrl ? (
                    <img src={book.imageUrl} alt={book.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x600?text=No+Cover"; }}
                    />
                ) : (
                    <div style={{ fontSize: '3rem', color: '#9ca3af' }}>📖</div>
                )}
            </div>
            <div className="book-card-info">
                <div className="book-card-title" title={book.title}>
                    {book.title}
                </div>
                <div className="book-card-author">by {book.author}</div>
                <div className="book-card-rating">
                    <div className="rating-badge">
                        <span>4.5</span> <FaStar size={8} />
                    </div>
                    <div className="rating-count">({book.reviewCount || 20})</div>
                </div>
                <div className="book-card-price">
                    <span>Rs. {book.price}</span>
                    <span className="old-price">Rs. {book.price + 500}</span>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
