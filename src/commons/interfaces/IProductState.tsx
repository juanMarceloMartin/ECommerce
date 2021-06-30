import IProduct from "./IProduct";
export default interface IProductsState {

    list: IProduct[],
    categories: {}[],
    selectedCategory: null | string

};
