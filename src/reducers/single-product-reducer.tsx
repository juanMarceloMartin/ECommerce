import IReducerAction from '../commons/interfaces/IReducerAction';
import { ProductsApi } from '../api/products-api';
import { GlobalReducerActions } from './global-reducer';

const SINGLE_PRODUCT_INITIAL_STATE = {
    product: {},
    relatedProducts: [{}],
}

export const SINGLE_PRODUCT_REDUCER_TYPES = {
    SET_PRODUCT: "SET_PRODUCT",
    SET_RELATED_PRODUCTS: "SET_RELATED_PRODUCTS"
}

export const singleProductReducer = (state = SINGLE_PRODUCT_INITIAL_STATE, action: IReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case SINGLE_PRODUCT_REDUCER_TYPES.SET_PRODUCT:
            return {
                ...state,
                product: payload
            }

        case SINGLE_PRODUCT_REDUCER_TYPES.SET_RELATED_PRODUCTS:
            return {
                ...state,
                relatedProducts: payload
            }
        default:
            return state;
    };
};

const getSelectedProduct = (id: number) => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            const response = await ProductsApi.getSelectedProduct(id);
            dispatch({ type: SINGLE_PRODUCT_REDUCER_TYPES.SET_PRODUCT, payload: response });
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

const getRelatedProducts = (id: number) => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            const response = await ProductsApi.getRelatedProducts(id);
            dispatch({ type: SINGLE_PRODUCT_REDUCER_TYPES.SET_RELATED_PRODUCTS, payload: response });
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}


export const SingleProductReducerActions = {
    getSelectedProduct,
    getRelatedProducts
}