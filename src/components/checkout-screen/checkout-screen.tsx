import { FC, useState } from 'react';
import { makeStyles, Grid, Stepper, Step, Typography, StepLabel, Button, ListItem, ListItemIcon, List, ListItemText, Collapse } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import OrderSummary from '../orderSummary/order-summary';
import ContactAndShippingForm from '../contact-and-shipping-form/contact-and-shipping-form';
import PaymentForm from '../paymentForm/payment-form';

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
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [openOrderSummary, setOpenOrderSummary] = useState(false);

    const handleOrderSummaryClick = () => {
        setOpenOrderSummary(!openOrderSummary);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
                    <div>confirm</div>
                )
        }
    }

    return (
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
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography className={classes.instructions}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Button onClick={handleReset} className={classes.button}>
                                        Reset
                                    </Button>
                                </div>
                            ) : (
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
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
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
    )
}

export default CheckoutScreen