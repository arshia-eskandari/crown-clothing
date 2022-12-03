import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES, LARGE, MEDIUM, SMALL } from '../../config';
import {
    ProductCartContainer,
    Footer,
    Name,
    SizeBtn,
    SizeBtnContainer,
} from './product-card.styles';
import { addItemToCart } from '../../store/cart/cart.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/categories.types';
import { useState, MouseEvent } from 'react';

type ProductObj = {
    product: CategoryItem;
};

const ProductCard = ({ product }: ProductObj) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const [size, setSize] = useState(MEDIUM);
    const { name, price, imageUrl } = product;

    const changeSize = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
        size: string
    ) => {
        e.preventDefault();
        setSize(size);
    };

    const addToCart = () =>
        dispatch(addItemToCart(cartItems, { ...product, size }));

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <span>${price.toFixed(2)}</span>
            </Footer>
            <SizeBtnContainer>
                <SizeBtn
                    buttonType={
                        size === LARGE
                            ? BUTTON_TYPE_CLASSES.inverted
                            : BUTTON_TYPE_CLASSES.base
                    }
                    onClick={e => {
                        changeSize(e, LARGE);
                    }}
                >
                    L
                </SizeBtn>
                <SizeBtn
                    buttonType={
                        size === MEDIUM
                            ? BUTTON_TYPE_CLASSES.inverted
                            : BUTTON_TYPE_CLASSES.base
                    }
                    onClick={e => {
                        changeSize(e, MEDIUM);
                    }}
                >
                    M
                </SizeBtn>
                <SizeBtn
                    buttonType={
                        size === SMALL
                            ? BUTTON_TYPE_CLASSES.inverted
                            : BUTTON_TYPE_CLASSES.base
                    }
                    onClick={e => {
                        changeSize(e, SMALL);
                    }}
                >
                    S
                </SizeBtn>
            </SizeBtnContainer>
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
