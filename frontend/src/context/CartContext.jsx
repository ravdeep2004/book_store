import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart([]);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCart(response.data.items || []);
        } catch (error) {
            console.error("Error fetching cart", error);
        }
    };

    const addToCart = async (book, quantity = 1) => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }
        try {
            await api.post('/cart/add', { bookId: book._id, quantity });
            toast.success('Added to cart');
            fetchCart();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    const removeFromCart = async (bookId) => {
        try {
            await api.delete(`/cart/remove/${bookId}`);
            toast.success('Removed from cart');
            fetchCart();
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const clearCart = async () => {
        try {
            await api.delete('/cart/clear');
            setCart([]);
            toast.success('Cart cleared');
        } catch (error) {
            toast.error('Failed to clear cart');
        }
    }

    const updateQuantity = async (bookId, quantity) => {
        try {
            await api.put('/cart/update-quantity', { bookId, quantity });
            fetchCart();
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    const getCartCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
