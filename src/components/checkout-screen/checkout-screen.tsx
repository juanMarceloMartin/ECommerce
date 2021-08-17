import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Grid, Stepper, Step, Typography, StepLabel, Button, ListItem, ListItemIcon, List, ListItemText, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import OrderSummary from '../orderSummary/order-summary';
import ContactAndShippingForm from '../contact-and-shipping-form/contact-and-shipping-form';
import PaymentForm from '../paymentForm/payment-form';
import PurchaseConfirmationForm from '../purchase-confirmation-form/purchase-confirmation-form';
import './checkout-screen.css'
import { useHistory } from 'react-router';
import { CartReducerActions, CART_REDUCER_TYPES } from '../../reducers/cart-reducer';
import { CheckoutReducerActions } from '../../reducers/checkout-reducer';
import IStore from '../../commons/interfaces/IStore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    orderSummary: {
        paddingTop: "50px",
        width: "100%",
        height: "110vh",
        '@media(max-width: 960px)': {
            display: "none"
        },
    },
    collapedSummary: {
        width: "100%",
        display: "none",
        '@media(max-width: 960px)': {
            display: "block"
        },
    }
}));

const CheckoutScreen: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const formFields: any = useSelector((state: IStore) => state.checkout);
    const inputErrors: any = useSelector((state: IStore) => state.checkout.inputErrors);
    const openPurchaseConfirmationDialog = useSelector((state: IStore) => state.checkout.openPurchaseConfirmationDialog);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [openOrderSummary, setOpenOrderSummary] = useState(false);
    const history = useHistory();

    const handleOrderSummaryClick = () => {
        setOpenOrderSummary(!openOrderSummary);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClose = () => {
        dispatch(CheckoutReducerActions.setCloseConfirmationDialog());
        dispatch({ type: CART_REDUCER_TYPES.RESET_CART })
        history.push("/");
    };

    function getSteps() {
        return ['Contact & Shipping Information', 'Payment Information', 'Confirm Purchase'];
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return (
                    <ContactAndShippingForm />
                )
            case 1:
                return (
                    <PaymentForm />
                )
            case 2:
                return (
                    <PurchaseConfirmationForm />
                )
        }
    }

    const firstStepRequiredFields = ["firstName", "email", "lastName", "address", "zipcode", "city", "state", "country", "phone"];

    const SecondStepRequiredFields = ["cardNumber", "nameOnCard", "expirationDate", "securityCode"]

    function enableNextButton() {
        let response = false

        if (activeStep === 0) {

            for (let i of firstStepRequiredFields) {
                if (!formFields[i]) {
                    response = true;
                }
            }

            for (let i of firstStepRequiredFields) {
                if (inputErrors[i]) {
                    response = true;
                }
            }
        }

        if (activeStep === 1) {

            if (!formFields.cashPayment && !formFields.cardPayment) {
                response = true;
            }

            if (formFields.cardPayment) {

                for (let i of SecondStepRequiredFields) {
                    if (!formFields[i]) {
                        response = true;
                    }
                }

                for (let i of SecondStepRequiredFields) {
                    if (inputErrors[i]) {
                        response = true;
                    }
                }
            }
        }

        return response;
    }

    useEffect(() => {
        dispatch(CartReducerActions.hideCartIcon());

        return () => {
            dispatch(CartReducerActions.displayCartIcon());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (activeStep === steps.length) {
            dispatch(CheckoutReducerActions.setOpenConfirmationDialog());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeStep])

    return (
        <>
            <Grid container>
                <Grid item sm={12} md={8}>
                    <div style={{ paddingTop: "32px", width: "90%", margin: "0 auto" }}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            className={classes.collapedSummary}
                        >
                            <ListItem button onClick={handleOrderSummaryClick}>
                                <ListItemIcon>
                                    <ShoppingBasketIcon />
                                </ListItemIcon>
                                <ListItemText primary="Order Summary" />
                                {openOrderSummary ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openOrderSummary} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested}>
                                        <div style={{ width: "100%" }}>
                                            <OrderSummary collapsed={true} />
                                        </div>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            <div>
                                <div>
                                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                            disabled={enableNextButton()}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div className={classes.orderSummary} >
                        <OrderSummary />
                    </div>
                </Grid>
            </Grid>
            <div>
                <Dialog
                    open={openPurchaseConfirmationDialog}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <h3>Payment has been Successful!</h3>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <svg
                                className="checkmark"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 52 52"
                            >
                                <circle
                                    className="checkmark__circle"
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                />
                                <path
                                    className="checkmark__check"
                                    fill="none"
                                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                />
                            </svg>
                        </DialogContentText>
                    </DialogContent>
                    <h3 style={{ textAlign: "center" }}>Thank you for your Purchase!</h3>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Back to Site
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default CheckoutScreen;