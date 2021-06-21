import { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      width: "400px"
    },
  });

const Cart: FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            holaaaaa
        </Box>
    )
}

export default Cart;