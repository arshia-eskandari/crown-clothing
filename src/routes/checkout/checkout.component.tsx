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
import PaymentForm from '../../components/payment-form/payment-form.component';
import { Fragment } from 'react';
import Footer from '../footer/footer.component';

const CheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    return (
        <Fragment>
            <CheckoutContainer>
            <h1>CHECKOUT</h1>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Name</span>
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
            <PaymentForm />
        </CheckoutContainer>
        <Footer />
        </Fragment>
    );
};

export default CheckOut;
