import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { checkUserSession } from './store/user/user.action';
import { useDispatch } from 'react-redux';
import Spinner from './components/spinner/spinner.component';

const Home = lazy(() => import('./routes/home/home.component'));
const Athentication = lazy(() =>
    import('./components/authentication/authentication.component')
);
const Shop = lazy(() => import('./routes/shop/shop.component'));
const CheckOut = lazy(() => import('./routes/checkout/checkout.component'));
const Navigation = lazy(() =>
    import('./routes/navigation/navigation.component')
);

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]); // dispatch will never change (run only once)

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<Athentication />} />
                    <Route path="checkout" element={<CheckOut />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
