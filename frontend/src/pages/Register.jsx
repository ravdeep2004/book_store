import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming register takes name, email, password, and optionally phone
        const success = await register(name, email, password);
        if (success) {
            navigate('/login');
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
                        <Link to="/login" className="auth-tab">LOGIN</Link>
                        <Link to="/register" className="auth-tab active">SIGNUP</Link>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-2" style={{ backgroundColor: '#A03037', border: 'none', height: '37px' }}>
                            Signup
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
