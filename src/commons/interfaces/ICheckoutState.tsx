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
    cashPayment: false,
    cardPayment: false,
    cardNumber: string,
    nameOnCard: string,
    expirationDate: string,
    securityCode: string
}