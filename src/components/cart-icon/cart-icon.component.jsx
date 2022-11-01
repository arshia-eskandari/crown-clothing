import './cart-icon.styles.scss';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

    const toggle = () => {
        setIsCartOpen(!isCartOpen);
        console.log(isCartOpen);
    };

    return (
        <div className="cart-icon-container" onClick={toggle}>
            <ShoppingCart className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon;
