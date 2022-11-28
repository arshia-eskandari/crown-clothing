import { CartItemContainer, IMG, ItemDetails, Name } from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import { FC, memo } from 'react';

type CartItemProps = {
    cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;

    return (
        <CartItemContainer>
            <IMG src={imageUrl} alt={name} />
            <ItemDetails>
                <Name>{name}</Name>
                <span>
                    {quantity} x ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    );
});

export default CartItem;
