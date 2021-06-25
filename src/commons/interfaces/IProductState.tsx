import IProduct from "./IProduct";
export default interface IProductsState {
    products: {
        list: IProduct[],
        categories: string[],
        selectedCategory: null | string
    }
};
