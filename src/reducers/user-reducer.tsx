import IReducerAction from '../commons/interfaces/IReducerAction';
import IUserState from '../commons/interfaces/IUserState';
import { GlobalReducerActions } from './global-reducer';

const USER_INITIAL_STATE: IUserState = {
    id: "",
    orderHistory: JSON.parse(localStorage.getItem("order_history") || "[]")
}

export const USER_REDUCER_TYPES = {
    SET_ID: "SET_ID",
    SET_ORDER_HISTORY: "SET_ORDER_HISTORY",
    ADD_NEW_ORDER: "ADD_NEW_ORDER"
}

export const userReducer = (state = USER_INITIAL_STATE, action: IReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case USER_REDUCER_TYPES.SET_ID:
            return {
                ...state,
                id: payload
            }
        
        case USER_REDUCER_TYPES.SET_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: payload
            }

        case USER_REDUCER_TYPES.ADD_NEW_ORDER:
            const updatedOrderHistory = state.orderHistory.slice();
            updatedOrderHistory.push(payload);
            localStorage.setItem("order_history", JSON.stringify(updatedOrderHistory))

            return {
                ...state,
                orderHistory: updatedOrderHistory
            }
        default:
            return state;
    }
};

const setOrderHistory = (userId: string) => {
    const orderHistory = JSON.parse(localStorage.getItem("order_history") || "[]");
    let usersOrderHistory: [] = [];
    if (orderHistory.length) {
        usersOrderHistory = orderHistory.filter((order: any) => {
            return order.userId === userId;
        })
    }

    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            dispatch({ type: USER_REDUCER_TYPES.SET_ORDER_HISTORY, payload: usersOrderHistory })
            dispatch(GlobalReducerActions.hidePageLoader());
        } catch (error) {
            console.log(error)
        }
    }

}

export const UserReducerActions = {
    setOrderHistory
}