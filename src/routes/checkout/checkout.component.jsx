import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
} from './checkout.styles';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
    selectCartItems,
    selectCartTotal,
} from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';

const CheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <h1>CHECKOUT</h1>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} item={cartItem} />
            ))}
            <Total>Total: ${total.toFixed(2)}</Total>
        </CheckoutContainer>
    );
};

export default CheckOut;
