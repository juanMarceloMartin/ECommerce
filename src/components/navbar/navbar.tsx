import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Drawer, Badge } from '@material-ui/core';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import IStore from '../../commons/interfaces/IStore';
import Cart from '../cart/cart';

const Navbar: FC = () => {
    const { Header } = Layout;
    const cartContent = useSelector((state: IStore) => state.cart.list.length)
    const [cartOpen, setCartOpen] = useState(false)

    return (
        <Header>
            Header
            <div onClick={() => setCartOpen(true)} style={{float: 'right'}}>
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