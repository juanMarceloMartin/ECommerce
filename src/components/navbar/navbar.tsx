import React, {FC, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import IStore from '../../commons/interfaces/IStore';

const Navbar: FC = () => {
    const { Header } = Layout;
    const cart = useSelector((state: IStore) => state.cart.list.length)
    const [cartColor, setCartColor] = useState("white");

    useEffect(() => {
        if (cart) {
            setCartColor('red')
        }
    }, [cart])

    return (
        <Header>
            Header
            <div style={{float: 'right'}}>
                <ShoppingCartRoundedIcon style={{ color: cartColor }}/>
            </div>
        </Header>
    )
}

export default Navbar;