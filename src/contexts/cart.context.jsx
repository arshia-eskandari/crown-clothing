import { createContext, useState, useEffect} from 'react';
import { ONE } from '../config';

const addCartItem = (cartItems, product) => {
    const found = cartItems.find(item => product.id === item.id);

    if (found) {
        return cartItems.map(item =>
            product.id === item.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }

    return [...cartItems, { ...product, quantity: ONE }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0))
    }, [cartItems])

    const addItemToCart = productToAdd => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart , cartItems, cartCount};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
