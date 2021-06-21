import React, {FC} from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';
import { CART_REDUCER_TYPES } from '../../reducers/cart-reducer';
import ICartItem from '../../commons/interfaces/ICartItem';

const useStyles = makeStyles({
    root: {
      maxWidth: 284,
      margin: '20px'
    },
  });

const ProductCard: FC<any> = ({ product }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const addToCart = () => {
      const cartItem: ICartItem = {...product, quantity: 1};
      dispatch({type: CART_REDUCER_TYPES.ADD_PRODUCT, payload: cartItem})
    }

    return (
      <>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="284"
                  image={product.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography noWrap component="h2">
                  {product.name}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    $ {product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary"   component="p">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={addToCart} size="small" color="primary">
                  AGREGAR AL CARRITO
                </Button>
              </CardActions>
          </Card>
        </Grid>
      </>
    )
}

export default ProductCard;