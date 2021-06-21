import IProduct from "./IProduct";

export default interface ICartItem extends IProduct {
    quantity: number
}