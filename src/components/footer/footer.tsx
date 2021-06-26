import { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: "65px",
        background: "black",
        color: "white"
    }
}));

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                kfwkf
        </div>
    )
}

export default Footer;