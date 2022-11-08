import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Athentication from './components/authentication/authentication.component';
import CheckOut from './routes/checkout/checkout.component';
import {
    createUserDocumentFromAuth,
    getCurrentUser,
    onAuthStateChangedListener,
} from './utils/firebase/firbase.utils';
import { useEffect } from 'react';
import { checkUserSession } from './store/user/user.action';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]); // dispatch will never change (run only once)

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Athentication />} />
                <Route path="checkout" element={<CheckOut />} />
            </Route>
        </Routes>
    );
};

export default App;
