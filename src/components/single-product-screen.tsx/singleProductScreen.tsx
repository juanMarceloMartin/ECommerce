import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Grid, ButtonGroup, Button } from '@material-ui/core';
import IStore from '../../commons/interfaces/IStore';
import AddToCartButton from '../addToCartButton/add-to-cart-button';
import { SingleProductReducerActions } from '../../reducers/single-product-reducer';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ProductsWrapper from '../products-wrapper/products-wrapper';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    imagesContainer: {
        paddingLeft: "10%",
        height: "600px",
        '@media(max-width: 550px)': {
            height: "500px"
        },
        '@media(max-width: 400px)': {
            height: "400px"
        },
    },
    smallImageContainer: {
        float: "left",
        width: "15%",
        height: "100%",
        overflow: "hidden"
    },
    productSmallImg: {
        width: "100%",
        margin: "10px 0",
        cursor: "pointer",
        display: "block",
        opacity: ".6",
        "&:hover": {
            opacity: "1"
        }
    },
    bigImageContainer: {
        width: "80%",
        float: "right"

    },
    productBigImg: {
        width: "80%"
    },
    productTitle: {
        float: "left",
        width: "80%"
    },
    productPrice: {
        float: "right",
        textAlign: "right",
        width: "20%"
    },
    marginClass: {
        margin: "50px 0"
    }
}));

const SingleProductScreen: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedProductId = useSelector((state: IStore) => state.products.selectedProductId);
    const selectedProduct = useSelector((state: IStore) => state.singleProduct.product);
    const selectedProductImages = useSelector((state: IStore) => state.singleProduct.product.image);
    const relatedProducts = useSelector((state: IStore) => state.singleProduct.relatedProducts);
    const isPageLoading = useSelector((state: IStore) => state.global.isPageLoading);
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(SingleProductReducerActions.getSelectedProduct(selectedProductId));
        dispatch(SingleProductReducerActions.getRelatedProducts(selectedProductId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProductId])

    useEffect(() => {
        if (selectedProductImages) {
            setMainImage(selectedProductImages[0]);
        }
    }, [selectedProductImages])

    function renderSizeButton(size: string) {
        let response = <Button onClick={() => setSelectedSize(size)}>{size.toUpperCase()}</Button>;
        if (size === selectedSize) {
            response = <Button variant="contained" onClick={() => setSelectedSize("small")}>{size.toUpperCase()}</Button>;
        }
        return response;
    }

    function renderColorButton(color: string) {
        let response = <Button onClick={() => setSelectedColor(color)} style={{ width: "80px", height: "36px", background: color }}>
        </Button>
        if (color === selectedColor) {
            response = <Button onClick={() => setSelectedColor(color)} style={{ width: "80px", height: "36px", background: color }}>
                <CheckCircleIcon />
            </Button>
        }
        return response;
    }

    function handleIncrement() {
        setQty(qty + 1);
    }

    function handleDecrement() {
        if (qty > 1) {
            setQty(qty - 1);
        }
    }

    return (
        <div style={{ paddingTop: "50px" }}>
            {!isPageLoading &&
                <>
                    <Grid container>
                        <Grid item sm={12} md={6}>
                            <div className={classes.imagesContainer}>
                                <div className={classes.smallImageContainer}>
                                    {selectedProductImages?.map((img: string) => {
                                        return <img onClick={() => setMainImage(img)} alt="product_img" className={classes.productSmallImg} src={img}></img>
                                    })}
                                </div>
                                <div className={classes.bigImageContainer}>
                                    <img alt="product_img" className={classes.productBigImg} src={mainImage}></img>
                                </div>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={6} style={{ padding: "0 20px" }}>
                            <div>{selectedProduct?.category}</div>
                            <div style={{ display: "inline-block", width: "100%" }}>
                                <h1 className={classes.productTitle}>
                                    {selectedProduct?.title}
                                </h1>
                                <h1 className={classes.productPrice}>
                                    ${selectedProduct?.price}
                                </h1>
                            </div>
                            <div style={{ lineHeight: "2em" }}>{selectedProduct?.description}</div>
                            {selectedProduct?.category?.includes("clothing") &&
                                <>
                                    <div className={classes.marginClass}>
                                        <ButtonGroup size="medium" color="primary" aria-label="large outlined primary button group">
                                            {renderSizeButton("small")}
                                            {renderSizeButton("medium")}
                                            {renderSizeButton("large")}
                                        </ButtonGroup>
                                    </div>
                                    <div className={classes.marginClass}>
                                        <ButtonGroup size="medium" color="primary" aria-label="large outlined primary button group">
                                            {selectedProduct?.colors?.map((color: string) => {
                                                return renderColorButton(color);
                                            })}
                                        </ButtonGroup>
                                    </div>
                                </>
                            }
                            <div className={classes.marginClass}>
                                <ButtonGroup size="medium" color="primary" aria-label="large outlined primary button group">
                                    <Button onClick={handleDecrement}>-</Button>
                                    <Button>{qty}</Button>
                                    <Button onClick={handleIncrement}>+</Button>
                                </ButtonGroup>
                            </div>
                            <div>
                                <AddToCartButton product={selectedProduct} quantity={qty} />
                            </div>
                        </Grid>
                    </Grid>
                    <h2 style={{ paddingLeft: "24px" }}>Related Products</h2>
                    <ProductsWrapper productsList={relatedProducts} />
                </>
            }
        </div>
    )
}

export default SingleProductScreen;