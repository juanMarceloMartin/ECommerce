import { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles(() => ({
    root: {
        color: "white",
        cursor: "pointer",
        border: "none",
        fontWeight: "bold",
        width: "100px"
    }
}))

export const LoginButton: FC = () => {
    const classes = useStyles();
    const { loginWithRedirect } = useAuth0();

    return <button className={classes.root} onClick={() => loginWithRedirect()}>Log In</button>;
}

export default LoginButton;