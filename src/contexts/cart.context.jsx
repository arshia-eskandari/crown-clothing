import { createContext, useReducer } from 'react';
import { ONE } from '../config';
import { createAction } from '../utils/reducer/reducer.utils';

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

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0,
};

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`unhandled type of ${type} is cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [total, setTotal] = useState(0);

    // useEffect(() => {
    //     setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    // }, [cartItems]);

    // useEffect(() => {
    //     setTotal(
    //         cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    //     );
    // }, [cartItems]);

    const [{ cartItems, cartCount, isCartOpen, total }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
    );

    const addItemToCart = productToAdd => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducers(newCartItems);
    };

    const removeItemsFromCart = (productToRemove, isRemovingOne) => {
        const newCartItems = removeItems(
            cartItems,
            productToRemove,
            isRemovingOne
        );
        updateCartItemsReducers(newCartItems);
    };

    const updateCartItemsReducers = newCartItems => {
        const newCartTotal = newCartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const newCartCount = newCartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                total: newCartTotal,
                cartCount: newCartCount,
            })
        );
    };

    const setIsCartOpen = bool => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    const value = {
        setIsCartOpen,
        addItemToCart,
        removeItemsFromCart,
        isCartOpen,
        cartItems,
        cartCount,
        total,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
