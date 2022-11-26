import { CartItem } from './cart.types';
import { AnyAction } from 'redux';
import { setCartItems, setIsCartOpen } from './cart.actions';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = (
    state = INITIAL_STATE,
    action: AnyAction
): CartState => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
    }

    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    }

    return state;
};
