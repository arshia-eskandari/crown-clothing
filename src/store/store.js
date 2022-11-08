import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware,
} from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware/logger';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
    process.env.NOCE_ENV === 'development' && loggerMiddleware,
    sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);