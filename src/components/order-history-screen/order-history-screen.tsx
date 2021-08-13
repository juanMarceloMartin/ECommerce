import { FC } from 'react';
import { useSelector } from 'react-redux';
import IStore from '../../commons/interfaces/IStore';
import Order from '../order/order';
import { IOrder } from '../../commons/interfaces/IOrder';

const OrderHistoryScreen: FC = () => {
    const orderHistory: IOrder[] = useSelector((state: IStore) => state.user.orderHistory);

    return (
        <div style={{ marginLeft: "24px", marginTop: "30px" }}>
            <h1>Order History</h1>
            <h2>Total Orders: {orderHistory.length}</h2>
            <h3>{!orderHistory.length && "well, this is ackward..."}</h3>
            <div>
                {
                    orderHistory?.map((order: IOrder) => <Order order={order} />)
                }
            </div>
        </div>
    )
}

export default OrderHistoryScreen;