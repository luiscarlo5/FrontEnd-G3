/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getCartItems, addToCart } from '../services/CartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(() => {
        const cart = getCartItems();
        return cart.reduce((total, item) => total + item.quantity, 0);
    });

    const updateCartCount = () => {
        const cart = getCartItems();
        setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    const addItemToCart = (product) => {
        addToCart(product);
        updateCartCount();
    };

    return (
        <CartContext.Provider value={{ cartCount, addItemToCart }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
