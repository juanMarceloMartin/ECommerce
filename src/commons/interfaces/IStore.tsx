import IProductsState from "./IProductState";
import ICartState from "./ICartState";
import IGlobalState from "./IGlobalState";
import ISingleProductState from "./ISingleProductState";

export default interface IStore {
    global: IGlobalState
    products: IProductsState
    cart: ICartState,
    singleProduct: ISingleProductState
} 