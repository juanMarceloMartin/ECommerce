import IProduct from "./IProduct";
import ISingleProduct from "./ISingleProduct";

export default interface ISingleProductState {
    product: ISingleProduct,
    relatedProducts: IProduct[],
}