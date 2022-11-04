import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
    BaseSpan,
} from './checkout-item.styles';

const CheckoutItem = ({ item }) => {
    const { name, imageUrl, price, quantity } = item;
    const { removeItemsFromCart, addItemToCart } = useContext(CartContext);

    const clearHandler = () => removeItemsFromCart(item, false);
    const removeItemHandler = () => removeItemsFromCart(item, true);
    const addItemHandler = () => addItemToCart(item);

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
