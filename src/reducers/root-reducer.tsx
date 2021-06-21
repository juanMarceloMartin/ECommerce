import { combineReducers } from 'redux';
import { productsReducer } from './products-reducer';
import { cartReducer } from './cart-reducer';

export const rootReducer = combineReducers({
    productsState: productsReducer,
    cart: cartReducer
});