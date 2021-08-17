export interface IOrderItem {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    new: boolean,
    quantity: number
}

export interface IOrder {
    id: string;
    userId: string;
    items: IOrderItem[],
    subtotal: number,
    shippingCost: number,
    orderNumber: string
}
