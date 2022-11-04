import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { BUTTON_TYPE_CLASSES } from '../../config';
import {
    ProductCartContainer,
    Footer,
    Name,
} from './product-card.styles';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, price, imageUrl } = product;

    const addToCart = () => {
        addItemToCart(product);
    };

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
