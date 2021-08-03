import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IStore from '../../commons/interfaces/IStore';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        lineHeight: '2',
    },
}))

const PurchaseConfirmationForm: FC = () => {
    const classes = useStyles();
    const checkout = useSelector((state: IStore) => state.checkout);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function setCreditCardFormat() {
        const lastFourNumbers = checkout.cardNumber.substr(checkout.cardNumber.length - 4);
        return `XXXX XXXX XXXX ${lastFourNumbers}`;
    }

    return (
        <div>
            <h3>Recipient</h3>
            <div className={classes.root}>{checkout.firstName} {checkout.lastName}</div>
            <h3>Contacto Information</h3>
            <div className={classes.root}>Email: {checkout.email}</div>
            <div className={classes.root}>Phone: {checkout.phone}</div>
            <h3>Ship to:</h3>
            <div className={classes.root}>{checkout.address} {checkout.apt && `Apt: ${checkout.apt}`}</div>
            <div className={classes.root}>{checkout.city}, {checkout.zipcode}</div>
            <div className={classes.root}>{checkout.state}, {checkout.country}</div>
            <h3>Payment Method:</h3>
            {checkout.cashPayment &&
                <div className={classes.root}>Cash</div>
            }
            {checkout.cardPayment &&
                <div className={classes.root}>Card: {setCreditCardFormat()}</div>
            }
        </div>
    )
}

export default PurchaseConfirmationForm;