
import { CheckoutApi } from '../api/checkout-api';
import IReducerAction from '../commons/interfaces/IReducerAction';
import { GlobalReducerActions } from './global-reducer';

const CHECKOUT_INITIAL_STATE = {
    email: localStorage.getItem("email"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    address: localStorage.getItem("address"),
    apt: localStorage.getItem("apt"),
    zipcode: localStorage.getItem("zipcode"),
    city: localStorage.getItem("city"),
    state: localStorage.getItem("state"),
    country: localStorage.getItem("country"),
    phone: localStorage.getItem("phone"),
    cashPayment: false,
    cardPayment: false,
    cardNumber: localStorage.getItem("cardNumber"),
    nameOnCard: localStorage.getItem("nameOnCard"),
    expirationDate: localStorage.getItem("expirationDate"),
    securityCode: localStorage.getItem("securityCode"),
    openPurchaseConfirmationDialog: false,
    inputErrors: {}
}

export const CHECKOUT_REDUCER_TIPES = {
    SET_EMAIL: "SET_EMAIL",
    SET_FIRSTNAME: "SET_FIRSTNAME",
    SET_LASTNAME: "SET_LASTNAME",
    SET_ADDRESS: "SET_ADDRESS",
    SET_APT: "SET_APT",
    SET_ZIPCODE: "SET_ZIPCODE",
    SET_CITY: "SET_CITY",
    SET_STATE: "SET_STATE",
    SET_COUNTRY: "SET_COUNTRY",
    SET_PHONE: "SET_PHONE",
    SET_CASH_PAYMENT: "SET_CASH_PAYMENT",
    SET_CARD_PAYMENT: "SET_CARD_PAYMENT",
    SET_CARD_NUMBER: "SET_CARD_NUMBER",
    SET_NAME_ON_CARD: "SET_NAME_ON_CARD",
    SET_EXPIRATION_DATE: "SET_EXPIRATION_DATE",
    SET_SECURITY_CODE: "SET_SECURITY_CODE",
    SET_INPUT_ERROR: "SET_INPUT_ERROR",
    SET_OPEN_PURCHASE_CONFIRMATION_DIALOG: "SET_OPEN_PURCHASE_CONFIRMATION_DIALOG"
}

export const checkoutReducer = (state = CHECKOUT_INITIAL_STATE, action: IReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case CHECKOUT_REDUCER_TIPES.SET_EMAIL:
            localStorage.setItem("email", payload);
            return {
                ...state,
                email: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_FIRSTNAME:
            localStorage.setItem("firstName", payload)
            return {
                ...state,
                firstName: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_LASTNAME:
            localStorage.setItem("lastName", payload)
            return {
                ...state,
                lastName: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_ADDRESS:
            localStorage.setItem("address", payload)
            return {
                ...state,
                address: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_APT:
            localStorage.setItem("apt", payload)
            return {
                ...state,
                apt: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_ZIPCODE:
            localStorage.setItem("zipcode", payload)
            return {
                ...state,
                zipcode: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_CITY:
            localStorage.setItem("city", payload)
            return {
                ...state,
                city: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_STATE:
            localStorage.setItem("state", payload)
            return {
                ...state,
                state: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_COUNTRY:
            localStorage.setItem("country", payload)
            return {
                ...state,
                country: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_PHONE:
            localStorage.setItem("phone", payload)
            return {
                ...state,
                phone: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_CASH_PAYMENT:
            localStorage.setItem("cardNumber", "")
            localStorage.setItem("nameOnCard", "")
            localStorage.setItem("expirationDate", "")
            localStorage.setItem("securityCode", "")

            return {
                ...state,
                cashPayment: !state.cashPayment,
                cardPayment: false,
                cardNumber: "",
                nameOnCard: "",
                expirationDate: "",
                securityCode: ""
            }

        case CHECKOUT_REDUCER_TIPES.SET_CARD_PAYMENT:
            return {
                ...state,
                cardPayment: !state.cardPayment,
                cashPayment: false,
            }

        case CHECKOUT_REDUCER_TIPES.SET_CARD_NUMBER:
            localStorage.setItem("cardNumber", payload)
            return {
                ...state,
                cardNumber: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_NAME_ON_CARD:
            localStorage.setItem("nameOnCard", payload)
            return {
                ...state,
                nameOnCard: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_EXPIRATION_DATE:
            localStorage.setItem("expirationDate", payload)
            return {
                ...state,
                expirationDate: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_SECURITY_CODE:
            localStorage.setItem("securityCode", payload)
            return {
                ...state,
                securityCode: payload
            }

        case CHECKOUT_REDUCER_TIPES.SET_INPUT_ERROR:
            return {
                ...state,
                inputErrors: {
                    ...state.inputErrors,
                    ...payload
                }
            }

        case CHECKOUT_REDUCER_TIPES.SET_OPEN_PURCHASE_CONFIRMATION_DIALOG:
            return {
                ...state,
                openPurchaseConfirmationDialog: payload
            }

        default:
            return state;
    }

};

const setInputError = (errorObject: {}) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CHECKOUT_REDUCER_TIPES.SET_INPUT_ERROR, payload: errorObject })
        } catch (error) {
            console.log(error)
        }
    }
};

const setOpenConfirmationDialog = () => {
    return async (dispatch: any) => {
        try {
            dispatch(GlobalReducerActions.showPageLoader());
            const approvedPayment = await CheckoutApi.checkPaymentApproval();
            dispatch(GlobalReducerActions.hidePageLoader());
            if (approvedPayment) {
                dispatch({ type: CHECKOUT_REDUCER_TIPES.SET_OPEN_PURCHASE_CONFIRMATION_DIALOG, payload: true })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const setCloseConfirmationDialog = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: CHECKOUT_REDUCER_TIPES.SET_OPEN_PURCHASE_CONFIRMATION_DIALOG, payload: false })
        } catch (error) {
            console.log(error)
        }
    }
}

export const CheckoutReducerActions = {
    setInputError,
    setOpenConfirmationDialog,
    setCloseConfirmationDialog
}