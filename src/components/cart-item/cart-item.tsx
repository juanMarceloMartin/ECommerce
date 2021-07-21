import { FC } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ICartItem from '../../commons/interfaces/ICartItem';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { CartReducerActions } from '../../reducers/cart-reducer';
import ItemQuantityButtons from '../itemQuantityButtons/itemQuantityButtons';

type Props = {
    item: ICartItem;
};

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
    },
    title: {
        paddingTop: "15px",
    },
    img: {
        width: "70%",
        objectFit: "cover",
        paddingTop: "5px",
        verticalAlign: "middle"
    }
}));

const CartItem: FC<Props> = ({ item }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    function setImage() {
        let response;
        if (Array.isArray(item.image)) {
            response = item.image[0];
        } else {
            response = item.image;
        }
        return response;
    }

    function handleDecrement() {
        dispatch(CartReducerActions.substractOneUnit(item.id))
    };

    function handleIncrement() {
        dispatch(CartReducerActions.addOneUnit(item.id))
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={11}>
                    <h3>{item.title}
                    </h3>
                </Grid>
                <Grid item xs={1}>
                    <div onClick={() => dispatch(CartReducerActions.removeItem(item.id))}>
                        <DeleteOutlineIcon style={{ marginTop: "19px", cursor: "pointer" }} />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <img className={classes.img} src={setImage()} alt={item.title} />
                </Grid>
                <Grid item xs={6}>
                    <div style={{ paddingTop: "15%", paddingLeft: "10px" }}>
                        <ItemQuantityButtons quantity={item.quantity} handleDecrement={handleDecrement} handleIncrement={handleIncrement} />
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <p>Price: ${item.price}</p>
                </Grid>
                <Grid item xs={4}>
                    <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                </Grid>
            </Grid>
        </div>
    )
};

export default CartItem;
