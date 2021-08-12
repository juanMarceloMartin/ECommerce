import { FC, useState } from 'react';
import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import LogoutButton from '../logout-button/logout-button';

const useStyles = makeStyles(() => ({
    button: {
        color: "white",
        cursor: "pointer",
        border: "none",
        fontWeight: "bold",
        width: "100px"
    }
}))

interface IProps {
    name?: string
}

const LoggedInButton: FC<IProps> = ({ name }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
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
            >
                <MenuItem style={{ background: "black" }} onClick={handleClose}><LogoutButton /></MenuItem>
            </Menu>
        </div>
    );
}

export default LoggedInButton;