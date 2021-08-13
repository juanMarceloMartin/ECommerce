import IReducerAction from '../commons/interfaces/IReducerAction';
import IUserState from '../commons/interfaces/IUserState';

const USER_INITIAL_STATE: IUserState = {
    id: "",
    orderHistory: [],
}

export const USER_REDUCER_TYPES = {
    SET_ID: "SET_ID",
    SET_ORDER_HISTORY: "SET_ORDER_HISTORY"
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
            const updatedOrderHistory = state.orderHistory.slice();
            updatedOrderHistory.push(payload);

            return {
                ...state,
                orderHistory: updatedOrderHistory
            }
        default:
            return state;
    }
};
