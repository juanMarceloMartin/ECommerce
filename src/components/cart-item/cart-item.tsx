import { FC } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ICartItem from '../../commons/interfaces/ICartItem';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { CartReducerActions } from '../../reducers/cart-reducer';

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
    infoContainer: {
        float: "left",
        width: "320px"
    },
    information: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "2px"
    },
    imgContainer: {
        float: "left",
        width: "130px",
        height: "100px",
    },
    img: {
        maxWidth: "60px",
        maxHeight: "85px",
        objectFit: "cover",
        marginLeft: "40px",
        marginTop: "5px",
        verticalAlign: "middle"
    },
    button: {
        margin: theme.spacing(1),
        width: "95%"
    },
}));



const CartItem: FC<Props> = ({ item }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div>
            <div className={classes.container}>
                <h3
                    className={classes.title}>{item.title}
                    <span onClick={() => dispatch(CartReducerActions.removeItem(item.id))}>
                        <DeleteOutlineIcon style={{ float: "right", cursor: "pointer" }} />
                    </span>
                </h3>
                <div className={classes.infoContainer}>
                    <div className={classes.information}>
                        <p>Price: ${item.price}</p>
                        <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                    <div style={{ paddingBottom: "20px" }} className={classes.information}>
                        <Button
                            size='small'
                            disableElevation
                            variant='contained'
                            onClick={() => dispatch(CartReducerActions.substractOneUnit(item.id))}
                        >
                            -
                        </Button>
                        <p>{item.quantity}</p>
                        <Button
                            size='small'
                            disableElevation
                            variant='contained'
                            onClick={() => dispatch(CartReducerActions.addOneUnit(item.id))}
                        >
                            +
                        </Button>
                    </div>
                </div>

                <div className={classes.imgContainer}>
                    <img className={classes.img} src={item.image} alt={item.title} />
                </div>
            </div>
        </div>
    )
};

export default CartItem;
