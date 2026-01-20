import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    return (
        <Container className="py-5" style={{ maxWidth: '900px' }}>
            <div className="breadcrumb-custom">
                <Link to="/" style={{ color: '#9D9D9D' }}>Home</Link> / <span className="active">Wishlist</span>
            </div>

            <div className="wishlist-container">
                <div className="wishlist-header">
                    My Wishlist ({wishlist.length})
                </div>
                {wishlist.length === 0 ? (
                    <div className="p-5 text-center">
                        <h4 className="text-muted">Your wishlist is empty</h4>
                        <Link to="/" className="btn btn-primary mt-3 btn-add-bag" style={{ width: '200px' }}>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    wishlist.map((item) => (
                        <div key={item._id} className="wishlist-item">
                            <img src={item.imageUrl} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x150?text=Cover"; }} />
                            <div className="flex-grow-1">
                                <div className="cart-item-title">{item.title}</div>
                                <div className="cart-item-author">by {item.author}</div>
                                <div className="cart-item-price mt-2">Rs. {item.price}</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="remove-btn" onClick={() => removeFromWishlist(item._id)}>
                                    <FaTrash color="#9D9D9D" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Container>
    );
};

export default Wishlist;
