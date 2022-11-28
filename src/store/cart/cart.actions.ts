import { ONE } from '../../config';
import {
    ActionWithPayload,
    createAction,
    withMatcher,
} from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import { CategoryItem } from '../categories/categories.types';

const addCartItem = (cartItems: CartItem[], product: CategoryItem) => {
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

const removeItems = (
    cartItems: CartItem[],
    product: CartItem,
    isRemovingOne: boolean
): CartItem[] => {
    // since we know the product must exist in the array
    // we do not need to check whether the product exists in
    // the array

    const newCartItems: CartItem[] = [];
    cartItems.map(item =>
        product.id === item.id
            ? item.quantity > 1 &&
              isRemovingOne &&
              newCartItems.push({ ...item, quantity: item.quantity - 1 })
            : newCartItems.push(item)
    );

    return newCartItems;
};

export type SetIsCartOpen = ActionWithPayload<
    CART_ACTION_TYPES.SET_IS_CART_OPEN,
    boolean
>;

export type SetCartItems = ActionWithPayload<
    CART_ACTION_TYPES.SET_CART_ITEMS,
    CartItem[]
>;

export type ClearCart = ActionWithPayload<
    CART_ACTION_TYPES.SET_CLEAR_CART,
    CartItem[]
>;

export const setClearCart = withMatcher(
    (cartItems: CartItem[]): ClearCart =>
        createAction(CART_ACTION_TYPES.SET_CLEAR_CART, cartItems)
);

export const clearCart = () => setClearCart([])

export const setIsCartOpen = withMatcher(
    (bool: boolean): SetIsCartOpen =>
        createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems =>
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);


export const addItemToCart = (
    cartItems: CartItem[],
    productToAdd: CategoryItem
) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const removeItemsFromCart = (
    cartItems: CartItem[],
    productToRemove: CartItem,
    isRemovingOne: boolean
) => {
    const newCartItems = removeItems(cartItems, productToRemove, isRemovingOne);
    return setCartItems(newCartItems);
};
