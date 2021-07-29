import { Grid } from '@material-ui/core';
import { FC } from 'react';
import FormInput from '../form-input/form-input';

const ContactAndShippingForm: FC = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <h3>Contact Information</h3>
                <FormInput label="Email" required={true} />
            </Grid>
            <Grid item xs={12}>
                <h3>Shipping Information</h3>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormInput label="First Name" required={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormInput label="Last Name" required={true} />
            </Grid>
            <Grid item xs={12} sm={10}>
                <FormInput label="Address" required={true} />
            </Grid>
            <Grid item xs={12} sm={2}>
                <FormInput label="Apt" />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormInput label="Zip Code" required={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormInput label="City" required={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormInput label="State / Province" required={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormInput label="Country" required={true} />
            </Grid>
            <Grid item xs={12}>
                <FormInput label="Phone" required={true} />
            </Grid>
        </Grid>
    )
}

export default ContactAndShippingForm;