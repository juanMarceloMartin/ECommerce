import { combineReducers } from 'redux';
import { productsReducer } from './products-reducer';
import { cartReducer } from './cart-reducer';
import { globalReducer } from './global-reducer';
import { singleProductReducer } from './single-product-reducer';

export const rootReducer = combineReducers({
    global: globalReducer,
    products: productsReducer,
    cart: cartReducer,
    singleProduct: singleProductReducer
});