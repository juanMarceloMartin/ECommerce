import { FC } from 'react';
import { makeStyles, Grid, Divider } from '@material-ui/core';
import { IOrder, IOrderItem } from '../../commons/interfaces/IOrder';

type Props = {
    order: IOrder
}

const useStyles = makeStyles(() => ({
    container: {
        width: "100%",
    },
    imgContainer: {
        height: "100px",
        paddingLeft: "20%",
        marginBottom: "20px",
        '@media(max-width: 655px)': {
            paddingLeft: "0"
          },
    },
    img: {
        height: "90%",
        objectFit: "cover",
        paddingTop: "5px",
        verticalAlign: "middle",
    }
}));

const Order: FC<Props> = ({ order }) => {
    const classes = useStyles();

    return (
        <div>
            <h3>Order number: {order.orderNumber}</h3>
            <Grid container>
                {order.items.map((item: IOrderItem) => {
                    return (
                        <>
                            <Grid item xs={6} sm={4} md={3}>
                                <div className={classes.imgContainer}>
                                    <img className={classes.img} src={item.image} alt={item.title} />
                                </div>
                            </Grid>
                            <Grid item xs={6} sm={8} md={9}>
                                <div>{item.title}</div>
                                <div>Price: $ {item.price}</div>
                                <div>Quantity: {item.quantity}</div>
                            </Grid>
                        </>
                    )
                })
                }

            </Grid>
            <div style={{ marginBottom: "10px" }}>Shipping Cost: $ {order.shippingCost}</div>
            <div style={{ marginBottom: "10px" }}>Total: $ {order.subtotal + order.shippingCost}</div>
            <Divider />
        </div>
    )
};

export default Order;
