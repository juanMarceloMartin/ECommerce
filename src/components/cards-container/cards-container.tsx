import { FC, useEffect } from 'react';
import { ProductsReducerActions } from '../../reducers/products-reducer';
import { useSelector, useDispatch } from 'react-redux';
import IProduct from '../../commons/interfaces/IProduct';
import IProductState from '../../commons/interfaces/IProductState';
import { Layout } from 'antd';
import ProductCard from '../product-card/product-card';
import Sidebar from '../sidebar/sidebar';
import { Grid } from '@material-ui/core';

const CardsContainer: FC = () => {
    const { Content } = Layout;
    const dispatch = useDispatch();
    const productsList = useSelector((state: IProductState) => state.products.list);
    const categories = useSelector((state: IProductState) => state.products.categories);

    useEffect(() => {
        dispatch(ProductsReducerActions.getList());
        dispatch(ProductsReducerActions.getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Sidebar title="Categories" items={categories} />
            <Content>
                <Grid container>
                    {
                        productsList?.map((product: IProduct) => <ProductCard key={product.id} product={product} />)
                    }
                </Grid>
            </Content>
        </>
    )
}

export default CardsContainer;