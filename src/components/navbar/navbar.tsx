import React, {FC} from 'react';
import { Layout } from 'antd';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    navBackground: {
        background: "red"
    }
});

const Navbar: FC = () => {
    const classes = useStyle();
    const { Header } = Layout;

    return (
        <Header className={classes.navBackground}>Header</Header>
    )
}

export default Navbar;