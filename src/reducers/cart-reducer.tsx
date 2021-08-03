import IReducerAction from '../commons/interfaces/IReducerAction';
import ICartItem from '../commons/interfaces/ICartItem';
import ICartState from '../commons/interfaces/ICartState';
import { GlobalReducerActions } from './global-reducer';

const CART_INITIAL_STATE = {
    list: new Array<ICartItem>(),
    total: 0,
    openCart: false,
    displayCartIcon: true
}

export const CART_REDUCER_TYPES = {
    ADD_PRODUCT: "ADD_PRODUCT",
    ADD_UNIT: "ADD_UNIT",
    SUBSTRACT_UNIT: "SUBSTRACT_UNIT",
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_OPEN_CART: "SET_OPEN_CART",
    SET_DISPLAY_CART_ICON: "SET_DISPLAY_CART_ICON"
}

function handleQtyChanges(state: ICartState, id: number, instruction: string) {
    const result = {
        updatedList: state.list,
        newTotal: state.total
    };

    if (instruction === "add") {
        result.updatedList.forEach(item => {
            if (item.id === id) {
                item.quantity = item.quantity + 1;
            }
        })
        result.newTotal = result.newTotal + 1;
    } else {
        result.updatedList.forEach(item => {
            if (item.id === id && item.quantity > 1) {
                item.quantity = item.quantity - 1;
            }
        })
        result.newTotal = result.newTotal - 1;
    }

    return result;
}

export const cartReducer = (state = CART_INITIAL_STATE, action: IReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case CART_REDUCER_TYPES.ADD_PRODUCT:
            return {
                ...state,
                cart: state.list.push(payload)
            }

        case CART_REDUCER_TYPES.ADD_UNIT:
            const stateAfterAddition = handleQtyChanges(state, payload, "add")

            return {
                ...state,
                total: stateAfterAddition.newTotal,
                list: stateAfterAddition.updatedList
            }

        case CART_REDUCER_TYPES.SUBSTRACT_UNIT:
            const stateAfterSubstraction = handleQtyChanges(state, payload, "substract")

            return {
                ...state,
                total: stateAfterSubstraction.newTotal,
                list: stateAfterSubstraction.updatedList
            }

        case CART_REDUCER_TYPES.REMOVE_ITEM:
            const stateAfterRemovedItem = state.list.filter(item => item.id !== payload);

            return {
                ...state,
                list: stateAfterRemovedItem,
                total: state.total - 1
            }

        case CART_REDUCER_TYPES.SET_OPEN_CART:
            return {
                ...state,
                openCart: payload
            }

        case CART_REDUCER_TYPES.SET_DISPLAY_CART_ICON:
            return {
                ...state,
                displayCartIcon: payload
            }


        default:
            return state;
    }

};

const addOneUnit = (id: number) => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            dispatch({ type: CART_REDUCER_TYPES.ADD_UNIT, payload: id })
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

const substractOneUnit = (id: number) => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            dispatch({ type: CART_REDUCER_TYPES.SUBSTRACT_UNIT, payload: id });
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

const removeItem = (id: number) => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            dispatch({ type: CART_REDUCER_TYPES.REMOVE_ITEM, payload: id });
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }
}

const openCart = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CART_REDUCER_TYPES.SET_OPEN_CART, payload: true })
        } catch (error) {
            console.log(error)
        }
    }
};

const closeCart = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CART_REDUCER_TYPES.SET_OPEN_CART, payload: false })
        } catch (error) {
            console.log(error)
        }
    }
};

const displayCartIcon = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CART_REDUCER_TYPES.SET_DISPLAY_CART_ICON, payload: true })
        } catch (error) {
            console.log(error)
        }
    }
};

const hideCartIcon = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CART_REDUCER_TYPES.SET_DISPLAY_CART_ICON, payload: false })
        } catch (error) {
            console.log(error)
        }
    }
};

export const CartReducerActions = {
    addOneUnit,
    substractOneUnit,
    removeItem,
    openCart,
    closeCart,
    displayCartIcon,
    hideCartIcon
}