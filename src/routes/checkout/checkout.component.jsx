import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckOut = () => {
    const { cartCount, cartItems } = useContext(CartContext);

    return (
        <div>
            <h1>I am the checkout page</h1>
        </div>
    );
};

export default CheckOut;
