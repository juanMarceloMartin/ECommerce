import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, Badge, makeStyles } from '@material-ui/core';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import IStore from '../../commons/interfaces/IStore';
import Cart from '../cart/cart';
import { GlobalReducerActions } from '../../reducers/global-reducer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuIcon: {
        float: "left",
        cursor: "pointer",
        display: "none",
        '@media(max-width: 800px)': {
            display: 'inline'
        }
    }
}));

const Navbar: FC = () => {
    const cartContent = useSelector((state: IStore) => state.cart.list.length)
    const [cartOpen, setCartOpen] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <div className={classes.menuIcon} onClick={() => dispatch(GlobalReducerActions.showResponsiveSidebar(true))}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                        <IconButton color="inherit" edge="end" onClick={() => setCartOpen(true)} >
                            <Badge color="error" badgeContent={cartContent}>
                                <ShoppingCartRoundedIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                        <Cart></Cart>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;