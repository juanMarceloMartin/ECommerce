import { FC, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import LogoutButton from '../logout-button/logout-button';

const useStyles = makeStyles(() => ({
    button: {
        color: "white",
        cursor: "pointer",
        border: "none",
        fontWeight: "bold",
        width: "100px"
    },
    menu: {
        "& .MuiPaper-root": {
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold"
        }
    }
}))

interface IProps {
    name?: string
}

const LoggedInButton: FC<IProps> = ({ name }) => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRedirect = () => {
        setAnchorEl(null);
        history.push("/order-history")
    };

    const setStyle = () => {
        return window.location.pathname === "/checkout" ? { marginLeft: "auto", marginRight: "0" } : {};
    }

    return (
        <div style={setStyle()}>
            <button className={classes.button} onClick={handleClick}>
                {name}
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}
            >
                <MenuItem onClick={handleRedirect}>Order History</MenuItem>
                <MenuItem onClick={handleClose}><LogoutButton /></MenuItem>
            </Menu>
        </div>
    );
}

export default LoggedInButton;