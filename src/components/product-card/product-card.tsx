import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import { CART_REDUCER_TYPES } from '../../reducers/cart-reducer';
import ICartItem from '../../commons/interfaces/ICartItem';
import IStore from '../../commons/interfaces/IStore';

const useStyles = makeStyles({
  root: {
    maxWidth: 284,
    margin: '20px'
  },
});

const ProductCard: FC<any> = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartList = useSelector((state: IStore) => state.cart.list);
  const cartTotal = useSelector((state: IStore) => state.cart.total);
  const [buttonStyle, setButtonStyle] = useState({
    background: "black"
  });
  const [buttonText, setButtonText] = useState("ADD TO CART")
  const [disabledButton, setDisabledButton] = useState(false)
  const [isItemInCart, setIsItemInCart] = useState(false);

  const addToCart = () => {
    if (!isItemInCart) {
      const cartItem: ICartItem = { ...product, quantity: 1 };
      dispatch({ type: CART_REDUCER_TYPES.ADD_PRODUCT, payload: cartItem })
      setIsItemInCart(true);
      setButtonStyle({
        background: "#00c853"
      });
      setButtonText("ADDED");
      setDisabledButton(true)
    }
  }

  useEffect(() => {
    const itemInCart = cartList.filter(item => item.id === product.id);
    if (!itemInCart.length) {
      setIsItemInCart(false);
      setButtonStyle({
        background: "black"
      });
      setButtonText("ADD TO CART");
      setDisabledButton(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartTotal])

  return (
    <>
      <Grid item xs={12} sm={6} lg={3}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.title}
              height="284"
              image={product.image}
              title={product.title}
            />
            <CardContent>
              <Typography noWrap component="h2">
                {product.title}
              </Typography>
              <Typography variant="h5" component="h2">
                $ {product.price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">

              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button disabled={disabledButton} onClick={addToCart} size="small" style={{ ...buttonStyle, width: "100%", color: "white", fontWeight: "bold" }}>
              {buttonText}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default ProductCard;