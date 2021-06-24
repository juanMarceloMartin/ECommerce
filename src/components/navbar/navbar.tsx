import { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { Drawer, Badge, makeStyles } from '@material-ui/core';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import MenuIcon from '@material-ui/icons/Menu';
import IStore from '../../commons/interfaces/IStore';
import Cart from '../cart/cart';
import { GlobalReducerActions } from '../../reducers/global-reducer';

const useStyles = makeStyles({
    menuIcon: {
        float: "left",
        cursor: "pointer",
        display: "none",
        '@media(max-width: 800px)': {
            display: 'inline'
        }
    }
})

const Navbar: FC = () => {
    const { Header } = Layout;
    const cartContent = useSelector((state: IStore) => state.cart.list.length)
    const [cartOpen, setCartOpen] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Header style={{ paddingLeft: "15px" }}>
            <div className={classes.menuIcon} onClick={() => dispatch(GlobalReducerActions.showResponsiveSidebar(true))}>
                <MenuIcon />
            </div>
            <div onClick={() => setCartOpen(true)} style={{ float: 'right' }}>
                <Badge color="error" badgeContent={cartContent}>
                    <ShoppingCartRoundedIcon />
                </Badge>
            </div>
            <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart></Cart>
            </Drawer>
        </Header>
    )
}

export default Navbar;