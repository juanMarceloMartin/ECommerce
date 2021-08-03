interface inputErrors {
    firstName: boolean
    email: boolean
    lastName: boolean
    address: boolean
    zipcode: boolean
    city: boolean
    state: boolean
    country: boolean
    phone: boolean
    cardNumber: boolean
    nameOnCard: boolean
    expirationDate: boolean
    securityCode: boolean
}

export default interface ICheckoutState {
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    apt?: string,
    zipcode: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    cashPayment: boolean,
    cardPayment: boolean,
    cardNumber: string,
    nameOnCard: string,
    expirationDate: string,
    securityCode: string,
    openPurchaseConfirmationDialog: boolean,
    inputErrors: inputErrors
}