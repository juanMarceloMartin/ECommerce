import { FC, useState, useEffect } from 'react';
import { makeStyles, Grid, FormControl, InputLabel, Input, FormHelperText, OutlinedInput, Stepper, Step, Typography, StepLabel, Button, StepContent, Paper, ListItem, ListItemIcon, List, ListSubheader, ListItemText, Collapse, Checkbox } from '@material-ui/core';
import CartItem from '../cart-item/cart-item';
import { useSelector } from 'react-redux';
import IStore from '../../commons/interfaces/IStore';
import FormInput from '../form-input/form-input';
import { ExpandMore, ExpandLess, StarBorder } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    summaryBox: {
        width: "95%",
        margin: "0 auto",
        borderRadius: "10px",
        border: "2px solid black",
        padding: "0 10px",
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
}));

const CheckoutScreen: FC = () => {
    const classes = useStyles();
    const itemsList = useSelector((state: IStore) => state.cart.list);
    const totalQtyInCart = useSelector((state: IStore) => state.cart.total);
    const [activeStep, setActiveStep] = useState(0);
    const [creditCardChecked, setCredirCardChecked] = useState(false);
    const [cashChecked, setCashChecked] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const steps = getSteps();
    const [open, setOpen] = useState(false);

    const handleCreditCardCheckChange = (event: any) => {
        setCredirCardChecked(event.target.checked);
        setCashChecked(false);
    };

    const handleCashCheckChange = (event: any) => {
        setCashChecked(event.target.checked);
        setCredirCardChecked(false);
        setOpen(false);
    };


    const handleClick = (event: any) => {
        setOpen(!open);
        handleCreditCardCheckChange(event);
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
                    <Grid container>
                        <Grid item xs={12}>
                            <h3>Contact Information</h3>
                            <FormInput label="Email" required={true} />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Shipping Information</h3>
                        </Grid>
                        <Grid item md={6}>
                            <FormInput label="First Name" required={true} />
                        </Grid>
                        <Grid item md={6}>
                            <FormInput label="Last Name" required={true} />
                        </Grid>
                        <Grid item md={10}>
                            <FormInput label="Address" required={true} />
                        </Grid>
                        <Grid item md={2}>
                            <FormInput label="Appartment" />
                        </Grid>
                        <Grid item md={6}>
                            <FormInput label="Zip Code" required={true} />
                        </Grid>
                        <Grid item md={6}>
                            <FormInput label="City" required={true} />
                        </Grid>
                        <Grid item md={6}>
                            <FormInput label="State / Province" required={true} />
                        </Grid>
                        <Grid item md={6}>
                            <FormInput label="Country" required={true} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInput label="Phone" required={true} />
                        </Grid>
                    </Grid>
                )
            case 1:
                return (
                    <Grid container>
                        <Grid item xs={12}>
                            <h3>Payment Information</h3>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                className={classes.root}
                            >
                                <ListItem button onClick={handleClick}>
                                    <ListItemIcon>
                                        <CreditCardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Credit Card" />
                                    <Checkbox
                                        checked={creditCardChecked}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        onChange={handleClick}
                                    />
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <FormInput label="Card Number" required={true} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormInput label="Name on Card" required={true} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormInput label="Expiration Date (MM / YY)" required={true} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FormInput label="Security Code" required={true} />
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
                                        checked={cashChecked}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        onChange={(e: any) => handleCashCheckChange(e)}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                )
            case 2:
                return (
                    <div>confirm</div>
                )
        }
    }

    useEffect(() => {
        const amount = itemsList?.reduce((initialAmount, item) => {
            return initialAmount + (item.price * item.quantity)
        }, 0)
        setSubtotal(amount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalQtyInCart]);

    return (
        <Grid container>
            <Grid item sm={8}>
                <div style={{ paddingTop: "32px", width: "90%", margin: "0 auto" }}>
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
            <Grid item sm={4}>
                <div style={{ paddingTop: "50px", width: "100%", height: "110vh" }}>
                    <div className={classes.summaryBox}>
                        <h3 style={{ textAlign: "center" }}>Order Summary</h3>
                        {
                            itemsList?.map(item => <CartItem key={item.id} item={item} checkout={true} />)
                        }
                        <p>Subtotal <span style={{ float: "right" }}>$ {subtotal.toFixed(2)}</span></p>
                        <p>Shipping <span style={{ float: "right" }}>from $ 10.00</span> </p>
                        <h2><strong>Total <span style={{ float: "right" }}>$ {(subtotal + 10).toFixed(2)}</span></strong></h2>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default CheckoutScreen;