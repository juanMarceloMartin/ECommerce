import React, {FC} from 'react';
import { makeStyles } from '@material-ui/core';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

interface IProps {
  image: string
  name: string
  price: number
}

const useStyles = makeStyles({
    root: {
      maxWidth: 284,
      margin: '20px'
    },
  });

const ProductCard: FC<IProps> = ({image, name, price}) => {
    const classes = useStyles();

    return (
      <>
        <Grid item xs={12} sm={6} lg={3}>
          <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="284"
                  image={image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography noWrap component="h2">
                  {name}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    $ {price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary"   component="p">
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  AGREGAR AL CARRITO
                </Button>
              </CardActions>
          </Card>
        </Grid>
      </>
    )
}

export default ProductCard;