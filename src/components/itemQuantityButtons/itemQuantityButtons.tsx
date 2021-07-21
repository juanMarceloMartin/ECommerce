import { FC } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

interface IProps {
    quantity: number,
    handleDecrement: Function,
    handleIncrement: Function
}

const ItemQuantityButtons: FC<IProps> = ({ quantity, handleDecrement, handleIncrement }) => {
    return (
        <ButtonGroup size="medium" color="primary" aria-label="large outlined primary button group">
            <Button onClick={() => handleDecrement()}>-</Button>
            <Button>{quantity}</Button>
            <Button onClick={() => handleIncrement()}>+</Button>
        </ButtonGroup>
    )
}

export default ItemQuantityButtons;