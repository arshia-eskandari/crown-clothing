import { ONE } from '../../config';
import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

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

export const setIsCartOpen = bool =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};

export const removeItemsFromCart = (cartItems, productToRemove, isRemovingOne) => {
    const newCartItems = removeItems(cartItems, productToRemove, isRemovingOne);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};
