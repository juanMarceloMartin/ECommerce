import { Button } from '@material-ui/core';
import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ICartItem from '../../commons/interfaces/ICartItem';
import IStore from '../../commons/interfaces/IStore';
import { CART_REDUCER_TYPES } from '../../reducers/cart-reducer';

const AddToCartButton: FC<any> = ({ product, quantity = 1 }) => {
    const dispatch = useDispatch();
    const cartList = useSelector((state: IStore) => state.cart.list);
    const cartTotal = useSelector((state: IStore) => state.cart.total);
    const [buttonStyle, setButtonStyle] = useState({
        background: "black"
    });
    const [buttonText, setButtonText] = useState("ADD TO CART")
    const [disabledButton, setDisabledButton] = useState(false)
    const [isItemInCart, setIsItemInCart] = useState(false);

    const setButton = (instruction: string) => {
        if (instruction === "disable") {
            setIsItemInCart(true);
            setButtonStyle({
                background: "#00c853"
            });
            setButtonText("ADDED");
            setDisabledButton(true);
        }

        if (instruction === "enable") {
            setIsItemInCart(false);
            setButtonStyle({
                background: "black"
            });
            setButtonText("ADD TO CART");
            setDisabledButton(false);
        }
    }


    const addToCart = () => {
        if (!isItemInCart) {
            const cartItem: ICartItem = { ...product, quantity };
            dispatch({ type: CART_REDUCER_TYPES.ADD_PRODUCT, payload: cartItem });
            setButton("disable");
        }
    }

    useEffect(() => {
        const itemInCart = cartList?.filter(item => item.id === product.id);
        if (!itemInCart.length) {
            setButton("enable");
        } else {
            setButton("disable");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartTotal])

    return (
        <Button disabled={disabledButton} onClick={addToCart} size="small" style={{ ...buttonStyle, width: "100%", color: "white", fontWeight: "bold" }}>
            {buttonText}
        </Button>
    )
}

export default AddToCartButton;