import { Outlet } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import {
    NavigationContainer,
    NavLinks,
    NavLink,
    Username,
    LogoContainer,
} from './navigation.styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import { useLocation } from 'react-router-dom';
import { setIsCartOpen } from '../../store/cart/cart.actions';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (isCartOpen) dispatch(setIsCartOpen(!isCartOpen))
    }, [location]);

    const signOutUser = () => dispatch(signOutStart());
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo" />
                    <Username>
                        {currentUser
                            ? currentUser.displayName.split(' ')[0]
                            : ''}
                    </Username>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>
                    {currentUser ? (
                        <NavLink to={{}} onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
