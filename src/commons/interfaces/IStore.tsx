import IProductsState from "./IProductState";
import ICartState from "./ICartState";
import IGlobalState from "./IGlobalState";
import ISingleProductState from "./ISingleProductState";
import ICheckoutState from "./ICheckoutState";
import IUserState from "./IUserState";
export default interface IStore {
    global: IGlobalState
    products: IProductsState
    cart: ICartState,
    singleProduct: ISingleProductState
    checkout: ICheckoutState,
    user: IUserState
} 