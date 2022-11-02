import { createContext, useState, useEffect } from 'react';
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

const removeItems = (cartItems, product, isRemovingOne) => {
    // since we know the product must exist in the array
    // we do not need to check whether the product exists in
    // the array

    const newCartItems = [];
    cartItems.map(item =>
        product.id === item.id
            ? item.quantity > 1 &&
              isRemovingOne &&
              newCartItems.push({ ...item, quantity: item.quantity - 1 })
            : newCartItems.push(item)
    );

    return newCartItems;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemsFromCart: () => {},
    total: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }, [cartItems]);

    useEffect(() => {
        setTotal(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0));
    }, [cartItems])

    const addItemToCart = productToAdd => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemsFromCart = (productToRemove, isRemovingOne) => {
        setCartItems(removeItems(cartItems, productToRemove, isRemovingOne));
    };

    const value = {
        setIsCartOpen,
        addItemToCart,
        removeItemsFromCart,
        isCartOpen,
        cartItems,
        cartCount,
        total
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
