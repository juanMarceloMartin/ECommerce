import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IStore from '../../commons/interfaces/IStore';
import Order from '../order/order';
import { IOrder } from '../../commons/interfaces/IOrder';
import { UserReducerActions } from '../../reducers/user-reducer';

const OrderHistoryScreen: FC = () => {
    const dispatch = useDispatch();
    const orderHistory: IOrder[] = useSelector((state: IStore) => state.user.orderHistory);
    const userId = useSelector((state: IStore) => state.user.id);

    useEffect(() => {
        if (userId) {
            dispatch(UserReducerActions.setOrderHistory(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ marginLeft: "24px", marginTop: "30px" }}>
            <h1>Order History</h1>
            <h2>Total Orders: {orderHistory.length}</h2>
            <h3>{!orderHistory.length && "well, this is awkward..."}</h3>
            <div>
                {
                    orderHistory?.map((order: IOrder) => <Order order={order} />)
                }
            </div>
        </div>
    )
}

export default OrderHistoryScreen;