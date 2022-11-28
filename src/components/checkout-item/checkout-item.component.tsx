import { useSelector, useDispatch } from 'react-redux';
import {
    addItemToCart,
    removeItemsFromCart,
} from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
    BaseSpan,
} from './checkout-item.styles';
import { CartItem } from '../../store/cart/cart.types';

export type CheckoutItemProps = {
    item: CartItem;
};

const CheckoutItem = (props: CheckoutItemProps) => {
    const item = props.item;
    const dispatch = useDispatch();
    const { name, imageUrl, price, quantity } = item;
    const cartItems = useSelector(selectCartItems);

    const clearHandler = () =>
        dispatch(removeItemsFromCart(cartItems, item, false));
    const removeItemHandler = () =>
        dispatch(removeItemsFromCart(cartItems, item, true));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, item));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>${price}</BaseSpan>
            <RemoveButton onClick={clearHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;
