import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import IStore from '../../commons/interfaces/IStore';
import { ProductsReducerActions, PRODUCTS_REDUCER_TYPES } from '../../reducers/products-reducer';
import { GlobalReducerActions } from '../../reducers/global-reducer';
import { makeStyles, Button } from '@material-ui/core';
import ProductsWrapper from '../products-wrapper/products-wrapper';
import { Link } from "react-router-dom";


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
    },
    banner: {
        background: "#ccc",

        color: "white",
        fontSize: "20px",
        textAlign: "center",
        padding: "25px",
        marginTop: "50px",
        fontWeight: 900
    },
    buttonContainer: {
        textAlign: "center",
        margin: "30px 0"
    }
}));


const Landing: FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: IStore) => state.products.categories);
    const newProductsList = useSelector((state: IStore) => state.products.list)?.filter((product: any) => product.new);
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

    function handleSelectCategory(category: string) {
        if (category === "all") {
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_SELECTED_CATEGORY, payload: "all" })
        } else {
            dispatch({ type: PRODUCTS_REDUCER_TYPES.SET_SELECTED_CATEGORY, payload: category })
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(ProductsReducerActions.getCategories());
        dispatch(ProductsReducerActions.getLisOfNewItems());
        dispatch(GlobalReducerActions.hideMenuIcon());

        return () => {
            dispatch(GlobalReducerActions.showMenuIcon());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Slider {...settings}>
                {categories?.map((category: any) => {
                    let response = null;
                    if (category.name !== "all") {
                        response =
                            <div key={category.name}>
                                <img className={classes.image} src={category.image} alt="" />
                                <Link to="/products">
                                    <div onClick={() => handleSelectCategory(category.name)} className={classes.category}> {category.name}</div>
                                </Link>
                            </div>
                    };
                    return response;
                })}
            </Slider>
            <h2 style={{ paddingLeft: "24px" }}>New Arrivals</h2>
            <ProductsWrapper productsList={newProductsList} />
            <div className={classes.banner}>10% OFF SHIPPING</div>
            <div className={classes.buttonContainer}>
                <Link to="/products">
                    <Button onClick={() => handleSelectCategory("all")} size="large" variant="contained" color="primary">
                        SEE ALL PRODUCTS
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;