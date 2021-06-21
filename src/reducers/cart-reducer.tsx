import IReducerAction from '../commons/interfaces/IReducerAction';
import ICartItem from '../commons/interfaces/ICartItem';

const CART_INITIAL_STATE = {
    list: new Array<ICartItem>()
}

export const CART_REDUCER_TYPES = {
    ADD_PRODUCT: "ADD_PRODUCT"
}

export const cartReducer = (state = CART_INITIAL_STATE, action: IReducerAction) => {
    const {type, payload} = action;
    switch (type) {
        case CART_REDUCER_TYPES.ADD_PRODUCT:
            return {
                ...state,
                cart: state.list.push(payload)
            }
        default:
            return state;
    };
};