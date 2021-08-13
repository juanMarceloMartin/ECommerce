import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import CartItem from '../cart-item/cart-item';
import IStore from '../../commons/interfaces/IStore';
import { useSelector, useDispatch } from 'react-redux';
import { USER_REDUCER_TYPES } from '../../reducers/user-reducer';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    summaryBox: {
        width: "95%",
        margin: "0 auto",
        borderRadius: "10px",
        border: "2px solid black",
        padding: "0 10px",
    }
}));

interface IProps {
    collapsed?: boolean
}

const OrderSummary: FC<IProps> = ({ collapsed }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [subtotal, setSubtotal] = useState(0);
    const totalQtyInCart = useSelector((state: IStore) => state.cart.total);
    const itemsList = useSelector((state: IStore) => state.cart.list);
    const confirmedPurchase = useSelector((state: IStore) => state.checkout.openPurchaseConfirmationDialog);
    const userId: string = useSelector((state: IStore) => state.user.id);

    useEffect(() => {
        const amount = itemsList?.reduce((initialAmount, item) => {
            return initialAmount + (item.price * item.quantity)
        }, 0)
        setSubtotal(amount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalQtyInCart]);

    useEffect(() => {
        if (confirmedPurchase) {
            const order = {
                id: uuidv4(),
                userId: userId,
                items: itemsList.slice(),
                subtotal: subtotal,
                shippingCost: 10,
                orderNumber: uuidv1()
            };
            dispatch({ type: USER_REDUCER_TYPES.SET_ORDER_HISTORY, payload: order })
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedPurchase])

    return (
        <div className={classes.summaryBox}>
            {!collapsed &&
                <h3 style={{ textAlign: "center" }}>Order Summary</h3>
            }
            {
                itemsList?.map(item => <CartItem key={item.id} item={item} checkout={true} />)
            }
            <p>Subtotal <span style={{ float: "right" }}>$ {subtotal.toFixed(2)}</span></p>
            <p>Shipping <span style={{ float: "right" }}>from $ 10.00</span> </p>
            <h2><strong>Total <span style={{ float: "right" }}>$ {(subtotal + 10).toFixed(2)}</span></strong></h2>
        </div>
    )
}

export default OrderSummary;