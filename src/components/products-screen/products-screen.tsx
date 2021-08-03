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
    const currentCategory = useSelector((state: IStore) => state.products.selectedCategory);
    const isPageLoading = useSelector((state: IStore) => state.global.isPageLoading);

    useEffect(() => {
        if (currentCategory === "ALL") {
            dispatch(ProductsReducerActions.getList());
        } else {
            if (currentCategory) {
                dispatch(ProductsReducerActions.getListByCategory(currentCategory))
            }
        }
        dispatch(ProductsReducerActions.getCategories());
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container>
            <Grid item sm={2}>
                <Sidebar title="Categories" items={categories} />
            </Grid>
            {!isPageLoading &&
                <Grid item xs={12} sm={12} md={10}>
                    <ProductsWrapper productsList={productsList} />
                </Grid>
            }
        </Grid>
    )
}

export default ProductsScreen;