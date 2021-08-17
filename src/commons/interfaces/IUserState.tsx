import { IOrder } from './IOrder';

export default interface IUserState {
    id: string,
    orderHistory: IOrder[]
}