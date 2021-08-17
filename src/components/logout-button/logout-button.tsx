import { FC } from "react";
import { makeStyles } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles(() => ({
    root: {
        color: "white",
        cursor: "pointer",
        border: "none",
        fontWeight: "bold",
        width: "100px",
        height: "100%"
    }
}))

const LogoutButton: FC = () => {
    const classes = useStyles();
    const { logout } = useAuth0();

    return (
        <button className={classes.root} onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
        </button>
    );
};

export default LogoutButton;