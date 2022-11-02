import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const CheckOut = () => {
    const { cartItems, total } =
        useContext(CartContext);

    return (
        <div className="checkout-container">
            <h1>I am the checkout page</h1>
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map(cartItem => (
                <CheckoutItem key={cartItem.id} item={cartItem} />
            ))}
            <span className="total">Total: ${total.toFixed(2)}</span>
        </div>
    );
};

export default CheckOut;
