import IReducerAction from '../commons/interfaces/IReducerAction';
import { ProductsApi } from '../api/products-api';
import { GlobalReducerActions } from './global-reducer';

const PRODUCTS_INITIAL_STATE = {
    list: [],
    categories: [{}],
    selectedCategory: localStorage.getItem("selected_category")
}

export const PRODUCTS_REDUCER_TYPES = {
    SET_LIST: "SET_LIST",
    SET_CATEGORIES: "SET_CATEGORIES",
    SET_SELECTED_CATEGORY: "SET_SELECTED_CATEGORY"
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

        case PRODUCTS_REDUCER_TYPES.SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: payload
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
            localStorage.setItem("selected_category", "all");
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_SELECTED_CATEGORY, payload: "all" })
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

const getLisOfNewItems = () => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            const response = await ProductsApi.getLisOfNewItems();
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_LIST, payload: response });
            localStorage.setItem("selected_category", "all");
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_SELECTED_CATEGORY, payload: "all" })
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
            const response: any = await ProductsApi.getCategories();
            response.push({ name: "all" })
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_CATEGORIES, payload: response })
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

const getListByCategory = (category: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            const response = await ProductsApi.selectCategory(category);
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_LIST, payload: response })
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_SELECTED_CATEGORY, payload: category })
            localStorage.setItem("selected_category", category);
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

export const ProductsReducerActions = {
    getList,
    getCategories,
    getListByCategory,
    getLisOfNewItems
}