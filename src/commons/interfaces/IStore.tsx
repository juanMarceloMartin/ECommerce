import IProductsState from "./IProductState";
import ICartState from "./ICartState";
import IGlobalState from "./IGlobalState";

export default interface IStore {
    global: IGlobalState
    products: IProductsState
    cart: ICartState
} 