import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHECKOUT_REDUCER_TIPES } from '../../reducers/checkout-reducer';
import { makeStyles, Checkbox, Collapse, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FormInput from '../form-input/form-input';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import IStore from '../../commons/interfaces/IStore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

const PaymentForm: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const creditCardSelected = useSelector((state: IStore) => state.checkout.cardPayment);
    const cashSelected = useSelector((state: IStore) => state.checkout.cashPayment);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCreditCardCheck = () => {
        dispatch({ type: CHECKOUT_REDUCER_TIPES.SET_CARD_PAYMENT })
    }

    const handleCashCheck = () => {
        dispatch({ type: CHECKOUT_REDUCER_TIPES.SET_CASH_PAYMENT })
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <h3>Payment Information</h3>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <CreditCardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Credit Card" />
                        <Checkbox
                            checked={creditCardSelected}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onChange={handleCreditCardCheck}
                        />
                    </ListItem>
                    <Collapse in={creditCardSelected} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <FormInput label="Card Number" required={true} stateKey="cardNumber" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInput label="Name on Card" required={true} stateKey="nameOnCard" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormInput label="Expiration Date" required={true} stateKey="expirationDate" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormInput label="Security Code" required={true} stateKey="securityCode" />
                                    </Grid>
                                </Grid>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cash" />
                        <Checkbox
                            checked={cashSelected}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onChange={handleCashCheck}
                        />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}

export default PaymentForm;