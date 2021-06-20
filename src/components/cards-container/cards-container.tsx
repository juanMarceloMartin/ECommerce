import React, { FC, useEffect } from 'react';
import { ProductsReducerActions } from '../../reducers/products-reducer';
import { useSelector, useDispatch } from 'react-redux';
import IProduct from '../../commons/interfaces/IProduct';
import { Layout } from 'antd';
import ProductCard from '../product-card/product-card';
import { Grid } from '@material-ui/core';

const CardsContainer: FC = () => {
    const { Content } = Layout;
    const dispatch = useDispatch();
    const productsList = useSelector((state: any) => state.productsState.list);

    useEffect(() => {
        dispatch(ProductsReducerActions.getList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Content>
            <Grid container>
                {
                    productsList.map((product: IProduct) => <ProductCard image={product.image} name={product.name} price={product.price}/>)
                }
            </Grid>
        </Content>
    )
}

export default CardsContainer;