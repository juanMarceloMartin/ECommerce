import { FC } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0 20px",
        background: "black",
        color: "white",
        marginTop: "30px"
    },
    contactInfo: {
        fontSize: 23,
        marginBottom: "10px"
    }
}));

const Footer: FC = () => {
    const classes = useStyles();
    const paymentIcons = ["americanexpress", "dinersclub", "directdebit", "maestro", "mastercard", "paypal", "visa", "visaelectron", "westernunion"];
    const shipmentMethods = ["dhl", "fedex", "ups"]

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item sm={12} md={3}>
                    <div style={{ paddingLeft: "20px" }}>
                        <h2>Contact Us</h2>
                        <div className={classes.contactInfo}><CallIcon /> 555-555-5555</div>
                        <div className={classes.contactInfo}><MailIcon /> f-e-c@mail.com</div>
                        <div className={classes.contactInfo}><LocationOnIcon /> Planet Earth</div>
                    </div>
                </Grid>
                <Grid item sm={12} md={3}>
                    <div style={{ paddingLeft: "20px" }}>
                        <h2>Payment Methods</h2>
                        {paymentIcons.map((paymentMethod: string) => {
                            return <img style={{ margin: "0 5px" }} src={`/payment-method-icons/${paymentMethod}.png`} alt="payment_method" />
                        })}
                    </div>
                </Grid>
                <Grid item sm={12} md={3}>
                    <div style={{ paddingLeft: "20px" }}>
                        <h2>Shipment Methods</h2>
                        {shipmentMethods.map((shipmentMethod: string) => {
                            return <img style={{ margin: "0 5px" }} width={64} src={`/shipment-method-icons/${shipmentMethod}.png`} alt="shipment_method" />
                        })}
                    </div>
                </Grid>
                <Grid item  md={3}>
                    <div style={{ paddingLeft: "20px" }}>
                        <h2>Social Media</h2>
                        <InstagramIcon fontSize="large" style={{ marginRight: "15px" }} />
                        <FacebookIcon fontSize="large" style={{ marginRight: "15px" }} />
                        <PinterestIcon fontSize="large" style={{ marginRight: "15px" }} />
                        <TwitterIcon fontSize="large" style={{ marginRight: "15px" }} />
                    </div>
                </Grid>
            </Grid>
            <div style={{ height: "30px", marginTop: "10px", textAlign: "center", fontSize: "12px", fontWeight: "bold" }}>FAK-E-COMMERCE</div>
        </div>
    )
}

export default Footer;