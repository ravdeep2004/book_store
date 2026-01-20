import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-left">
                    <img src="/auth_img.png" alt="Online Shopping" />
                    <h3>Online Book Shopping</h3>
                </div>
                <div className="auth-right">
                    <div className="auth-tabs">
                        <Link to="/login" className="auth-tab active">LOGIN</Link>
                        <Link to="/register" className="auth-tab">SIGNUP</Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="text-end">
                                <Link to="/forgot-password" style={{ fontSize: '10px', color: '#9D9D9D' }}>Forgot Password?</Link>
                            </div>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-2" style={{ backgroundColor: '#A03037', border: 'none', height: '37px' }}>
                            Login
                        </Button>

                        <div className="text-center my-3 fw-bold" style={{ fontSize: '14px' }}>
                            OR
                        </div>

                        <div className="social-buttons">
                            <button className="social-btn" style={{ background: '#4267B2', color: 'white', border: 'none' }}>
                                Facebook
                            </button>
                            <button className="social-btn" onClick={() => window.location.href = 'http://localhost:5001/auth/google'}>
                                Google
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
