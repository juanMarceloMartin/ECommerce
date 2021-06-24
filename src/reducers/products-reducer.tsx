import IReducerAction from '../commons/interfaces/IReducerAction';
import { ProductsApi } from '../api/products-api';
import { GlobalReducerActions } from './global-reducer';

const PRODUCTS_INITIAL_STATE = {
    list: [],
    categories: []
}

export const PRODUCTS_REDUCER_TYPES = {
    SET_LIST: "SET_LIST",
    SET_CATEGORIES: "SET_CATEGORIES"
}

export const productsReducer = (state = PRODUCTS_INITIAL_STATE, action: IReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case PRODUCTS_REDUCER_TYPES.SET_LIST:
            return {
                ...state,
                list: payload
            }

        case PRODUCTS_REDUCER_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }

        default:
            return state;
    };
};

const getList = () => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            const response = await ProductsApi.getList();
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_LIST, payload: response });
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

const getCategories = () => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            const response = await ProductsApi.getCategories();
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_CATEGORIES, payload: response })
            dispatch(GlobalReducerActions.showPageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

export const ProductsReducerActions = {
    getList,
    getCategories
}