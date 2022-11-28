import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage,
    StyledButton
} from './cart-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useCallback } from 'react';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckOutHandler = useCallback(() => {
        navigate('/checkout');
    }, [navigate]); // navigate never changes

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map(item => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <StyledButton onClick={goToCheckOutHandler}>Checkout</StyledButton>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
