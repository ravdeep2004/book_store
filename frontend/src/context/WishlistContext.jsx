import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (book) => {
        if (wishlist.find(item => item._id === book._id)) {
            toast.info('Item already in wishlist');
            return;
        }
        setWishlist([...wishlist, book]);
        toast.success('Added to wishlist');
    };

    const removeFromWishlist = (bookId) => {
        setWishlist(wishlist.filter(item => item._id !== bookId));
        toast.success('Removed from wishlist');
    };

    const isInWishlist = (bookId) => {
        return wishlist.some(item => item._id === bookId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
