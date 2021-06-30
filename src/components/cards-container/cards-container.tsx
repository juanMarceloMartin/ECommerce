import { FC, useEffect } from 'react';
import { ProductsReducerActions } from '../../reducers/products-reducer';
import { useSelector, useDispatch } from 'react-redux';
import IProduct from '../../commons/interfaces/IProduct';
import ProductCard from '../product-card/product-card';
import Sidebar from '../sidebar/sidebar';
import { Grid } from '@material-ui/core';
import IStore from '../../commons/interfaces/IStore';

const CardsContainer: FC = () => {
    const dispatch = useDispatch();
    const productsList = useSelector((state: IStore) => state.products.list);
    const categories = useSelector((state: IStore) => state.products.categories);

    useEffect(() => {
        const currentCategory = localStorage.getItem("selected_category");
        if (!currentCategory || currentCategory === "all") {
            dispatch(ProductsReducerActions.getList());
        } else {
            dispatch(ProductsReducerActions.getListByCategory(currentCategory));
        }
        dispatch(ProductsReducerActions.getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container>
            <Grid item md={2}>
                <Sidebar title="Categories" items={categories} />
            </Grid>
            <Grid item md={10}>
                <Grid container>
                    {
                        productsList?.map((product: IProduct) => <ProductCard key={product.id} product={product} />)
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CardsContainer;