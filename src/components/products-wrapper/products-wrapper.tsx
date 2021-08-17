import { FC } from 'react';
import IProduct from '../../commons/interfaces/IProduct';
import ProductCard from '../product-card/product-card';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        paddingTop: "30px",
        paddingLeft: '5%',
        '@media(max-width: 405px)': {
            paddingLeft: '0',
        }
    },
});

interface IProps {
    productsList: IProduct[]
}

const ProductsWrapper: FC<IProps> = (props) => {
    const { productsList } = props;
    const classes = useStyles();

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className={classes.root}
        >
            {
                productsList?.map((product: IProduct) => <ProductCard key={product.id} product={product} />)
            }
        </Grid>
    )
}

export default ProductsWrapper;