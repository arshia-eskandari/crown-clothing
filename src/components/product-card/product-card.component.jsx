import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../../config';
import { ProductCartContainer, Footer, Name } from './product-card.styles';
import { addItemToCart } from '../../store/cart/cart.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl } = product;

    const addToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <span>${price.toFixed(2)}</span>
            </Footer>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addToCart}
            >
                Add to cart
            </Button>
        </ProductCartContainer>
    );
};

export default ProductCard;
