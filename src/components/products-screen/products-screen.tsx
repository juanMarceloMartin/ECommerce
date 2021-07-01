import { FC, useEffect } from 'react';
import { ProductsReducerActions } from '../../reducers/products-reducer';
import { useSelector, useDispatch } from 'react-redux';
import ProductsWrapper from '../products-wrapper/products-wrapper';
import Sidebar from '../sidebar/sidebar';
import { Grid } from '@material-ui/core';
import IStore from '../../commons/interfaces/IStore';

const ProductsScreen: FC = () => {
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
            <Grid item sm={2}>
                <Sidebar title="Categories" items={categories} />
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                <ProductsWrapper productsList={productsList} />
            </Grid>
        </Grid>
    )
}

export default ProductsScreen;