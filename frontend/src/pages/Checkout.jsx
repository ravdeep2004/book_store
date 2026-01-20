import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Since checkout is now merged into Cart step flow, redirect to cart
        navigate('/cart');
    }, [navigate]);

    return null;
};

export default Checkout;
