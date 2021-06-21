import IProduct from "./IProduct";

interface IList {
    list: IProduct[]
}

export default interface IProductsState {
    productsState: IList
};
