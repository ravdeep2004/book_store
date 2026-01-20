import { Navbar, Container, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaSearch, FaUser, FaShoppingCart, FaSignOutAlt, FaBookOpen, FaHeart } from 'react-icons/fa';

const AppNavbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar className="navbar-custom" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <FaBookOpen className="me-2" />
                    <span className="fw-bold">Bookstore</span>
                </Navbar.Brand>

                <div className="search-bar-container mx-auto d-none d-lg-flex">
                    <FaSearch className="text-muted ms-2" />
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="d-flex align-items-center gap-4">
                    {user ? (
                        <>
                            <Link to="/wishlist" className="nav-icon-link">
                                <FaHeart />
                                <span>Wishlist</span>
                            </Link>
                            <Link to="/profile" className="nav-icon-link">
                                <FaUser />
                                <span>Profile</span>
                            </Link>
                            <Link to="/cart" className="nav-icon-link">
                                <FaShoppingCart />
                                <span>Cart</span>
                            </Link>
                            <button onClick={handleLogout} className="btn btn-link nav-icon-link p-0 border-0 text-white">
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/wishlist" className="nav-icon-link">
                                <FaHeart />
                                <span>Wishlist</span>
                            </Link>
                            <Link to="/login" className="nav-icon-link">
                                <FaUser />
                                <span>Login</span>
                            </Link>
                            <Link to="/cart" className="nav-icon-link">
                                <FaShoppingCart />
                                <span>Cart</span>
                            </Link>
                        </>
                    )}
                </div>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
