import IReducerAction from '../commons/interfaces/IReducerAction';
import { ProductsApi } from '../api/fake/products-api';

const PRODUCTS_INITIAL_STATE = {
    list: []
}

export const PRODUCTS_REDUCER_TYPES = {
    SET_LIST: "SET_LIST"
}

export const productsReducer = (state = PRODUCTS_INITIAL_STATE, action: IReducerAction) => {
    const {type, payload} = action;
    switch (type) {
        case PRODUCTS_REDUCER_TYPES.SET_LIST:
            return {
                ...state,
                list: payload
            }
        default:
            return state;
    };
};

const getList = () => {
    return async (dispatch: any) => {
        try {
            const response = await ProductsApi.getList(8);
            dispatch({type: PRODUCTS_REDUCER_TYPES.SET_LIST, payload: response})
        } catch (error) {
            console.log(error)
        }
    } 
}

export const ProductsReducerActions = {
    getList
}