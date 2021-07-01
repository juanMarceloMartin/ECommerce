import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IStore from '../../commons/interfaces/IStore';
import { ProductsReducerActions } from '../../reducers/products-reducer';
import { makeStyles } from '@material-ui/core';
import ProductsWrapper from '../products-wrapper/products-wrapper';

const useStyles = makeStyles((theme) => ({
    image: {
        width: "100%",
        height: "600px"
    },
    category: {
        background: "black",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        width: "90%",
        margin: "0 auto",
        borderRadius: "10px",
        position: "relative",
        bottom: "35px"
    }
}));


const Landing: FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: IStore) => state.products.categories);
    const productsList = useSelector((state: IStore) => state.products.list);
    const classes = useStyles();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: true,
        accessibility: true
    };

    useEffect(() => {
        dispatch(ProductsReducerActions.getCategories());
        dispatch(ProductsReducerActions.getList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Slider {...settings}>
                {categories?.map((category: any) => {
                    if (category.name !== "all") {
                        return (
                            <div>
                                <img className={classes.image} src={category.image} alt="" />
                                <div className={classes.category}> {category.name}</div>
                            </div>
                        )
                    }
                })}
            </Slider>
            <h2>New Arrivals</h2>
            <ProductsWrapper productsList={productsList} />
        </div>
    )
}

export default Landing;