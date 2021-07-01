import { FC } from 'react';
import IProduct from '../../commons/interfaces/IProduct';
import ProductCard from '../product-card/product-card';
import { Grid } from '@material-ui/core';

interface IProps {
    productsList: IProduct[]
}

const ProductsWrapper: FC<IProps> = (props) => {
    const { productsList } = props;
    return (
        <Grid container>
            {
                productsList?.map((product: IProduct) => <ProductCard key={product.id} product={product} />)
            }
        </Grid>
    )
}

export default ProductsWrapper;