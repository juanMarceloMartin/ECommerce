import ICartItem from "./ICartItem";

export default interface ICartState {
    list: ICartItem[],
    total: number,
    openCart: boolean,
    displayCartIcon: boolean
}