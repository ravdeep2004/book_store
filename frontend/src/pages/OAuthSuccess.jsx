import { useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Spinner } from 'react-bootstrap';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithToken } = useContext(AuthContext);

    const loginProcessed = useRef(false);

    useEffect(() => {
        if (loginProcessed.current) return;

        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        console.log("OAuthSuccess: Full URL:", window.location.href);
        console.log("OAuthSuccess: Token from search:", token ? "Exists (length " + token.length + ")" : "MISSING");

        if (token) {
            loginProcessed.current = true;
            const success = loginWithToken(token);
            console.log("OAuthSuccess: loginWithToken result:", success);
            if (success) {
                navigate('/', { replace: true });
            } else {
                navigate('/login', { replace: true });
            }
        } else {
            console.warn("OAuthSuccess: Redirecting to login because no token found.");
            navigate('/login', { replace: true });
        }
    }, [navigate, loginWithToken]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="text-center">
                <Spinner animation="border" variant="primary" className="mb-3" />
                <h3>Completing Login...</h3>
            </div>
        </Container>
    );
};

export default OAuthSuccess;
