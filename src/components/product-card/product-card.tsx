import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Grid, makeStyles } from '@material-ui/core';
import { PRODUCTS_REDUCER_TYPES } from '../../reducers/products-reducer';
import AddToCartButton from '../addToCartButton/add-to-cart-button';

const useStyles = makeStyles({
  root: {
    maxWidth: 284,
    margin: '20px',
    '@media(max-width: 600px)': {
      marginLeft: "25%"
    },
    '@media(max-width: 500px)': {
      marginLeft: "15%"
    },
    '@media(max-width: 405px)': {
      marginLeft: "10%"
    }
  },
});

const ProductCard: FC<any> = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSelectProduct = (id: number, category: string) => {
    localStorage.setItem("selected_item_id", id.toString());
    localStorage.setItem("selected_category", category)
    dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_SELECTED_PRODUCT_ID, payload: id })
    history.push("/product");

  }

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.root}>
          <span onClick={() => handleSelectProduct(product.id, product.category)}>
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
          </span>
          <CardActions>
            <AddToCartButton product={product} />
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default ProductCard;