import IProductsState from "./IProductState";
import ICartState from "./ICartState";

export default interface IStore {
    productsState: IProductsState
    cart: ICartState
} 