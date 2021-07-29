import { makeStyles, Checkbox, Collapse, Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FC, useState } from 'react';
import FormInput from '../form-input/form-input';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

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
    const [creditCardChecked, setCredirCardChecked] = useState(false);
    const [cashChecked, setCashChecked] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCreditCardCheckChange = (event: any) => {
        setCredirCardChecked(event.target.checked);
        setCashChecked(false);
    };

    const handleClick = (event: any) => {
        setOpen(!open);
        handleCreditCardCheckChange(event);
    };

    const handleCashCheckChange = (event: any) => {
        setCashChecked(event.target.checked);
        setCredirCardChecked(false);
        setOpen(false);
    };

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
                                        <FormInput label="Expiration Date" required={true} />
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
}

export default PaymentForm;