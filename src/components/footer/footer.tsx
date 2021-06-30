import { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "65px",
        background: "black",
        color: "white",
        marginTop: "30px"
    }
}));

const Footer: FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                FOOTER
        </div>
    )
}

export default Footer;