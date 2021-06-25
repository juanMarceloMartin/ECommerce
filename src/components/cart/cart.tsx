import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IStore from '../../commons/interfaces/IStore';
import { Button, makeStyles } from '@material-ui/core';
import CartItem from '../cart-item/cart-item';

const useStyles = makeStyles({
  root: {
    paddingLeft: "10px",
    paddingRight: "15px",
    width: "450px"
  },
  checkOut: {
    width: "100%",
    marginTop: "30px"
  }
});

const Cart: FC = () => {
  const classes = useStyles();
  const itemsList = useSelector((state: IStore) => state.cart.list);
  const totalQtyInCart = useSelector((state: IStore) => state.cart.total);
  const [subtotal, setSubtotal] = useState(0);
  const [list, setList] = useState(itemsList);

  useEffect(() => {
    setList(itemsList);
    const amount = itemsList.reduce((initialAmount, item) => {
      return initialAmount + (item.price * item.quantity)
    }, 0)
    setSubtotal(amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalQtyInCart]);

  return (
    <div className={classes.root}>
      {list.length ?
        <div>
          <div>
            <h1>Your order</h1>
            {
              list?.map(item => <CartItem key={item.id} item={item} />)
            }
          </div>
          <div>
            <h1>Order Summary</h1>
            <p>Subtotal <span style={{ float: "right" }}>$ {subtotal.toFixed(2)}</span></p>
            <p>Estimated Shipping <span style={{ float: "right" }}>from $ 10.00</span> </p>
            <h2><strong>Estimated Total <span style={{ float: "right" }}>$ {(subtotal + 10).toFixed(2)}</span></strong></h2>
          </div>
          <Button className={classes.checkOut} variant="contained" color="primary">
            CHECK OUT HERE
          </Button>
        </div>
        :
        <>
          <h1>Your cart is empty...</h1>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img style={{ width: "90%", paddingTop: "20%" }} src="/empty-cart.png" alt="" />
          </div>
        </>
      }
    </div>
  )
}

export default Cart;