import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import CartItem from '../cart-item/cart-item';
import IStore from '../../commons/interfaces/IStore';
import { useSelector } from 'react-redux';

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
    const [subtotal, setSubtotal] = useState(0);
    const totalQtyInCart = useSelector((state: IStore) => state.cart.total);
    const itemsList = useSelector((state: IStore) => state.cart.list);

    useEffect(() => {
        const amount = itemsList?.reduce((initialAmount, item) => {
            return initialAmount + (item.price * item.quantity)
        }, 0)
        setSubtotal(amount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalQtyInCart]);

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