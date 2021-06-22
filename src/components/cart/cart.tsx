import { FC } from 'react';
import { useSelector } from 'react-redux';
import IStore from '../../commons/interfaces/IStore';
import { Box, makeStyles } from '@material-ui/core';
import CartItem from '../cart-item/cart-item';

const useStyles = makeStyles({
  root: {
    width: "450px"
  },
});

const Cart: FC = () => {
  const classes = useStyles();
  const itemsList = useSelector((state: IStore) => state.cart.list);

  return (
    <Box className={classes.root}>
      <h1>Mi Pedido</h1>
      {
        itemsList?.map(item => <CartItem item={item} />)
      }
    </Box>
  )
}

export default Cart;