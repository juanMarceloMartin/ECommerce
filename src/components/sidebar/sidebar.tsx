import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { makeStyles, Drawer } from '@material-ui/core';
import IStore from '../../commons/interfaces/IStore';
import { GlobalReducerActions } from '../../reducers/global-reducer';
import { ProductsReducerActions } from '../../reducers/products-reducer';
import IProductState from '../../commons/interfaces/IProductState';

interface IProps {
    title: string
    items: any[]
}

const useStyles = makeStyles({
    sider: {
        width: "200px",
        '@media(max-width: 800px)': {
            display: 'none',
            background: "red"
        }
    },
    container: {
        paddingTop: "20px",
        width: "200px",
    },
    title: {
        paddingLeft: "20px",
        fontSize: "20px"
    },
    item: {
        paddingLeft: "20px",
        lineHeight: "50px",
        cursor: "pointer",
        "&:hover": {
            borderLeft: "5px solid black"
        }
    }
})

const Sidebar: FC<IProps> = ({ title, items }) => {
    const classes = useStyles();
    const { Sider } = Layout;
    const isSidebarOpen = useSelector((state: IStore) => state.global.isSidebarOpen);
    const selectedCategory = useSelector((state: IProductState) => state.products.selectedCategory);
    const dispatch = useDispatch();

    function handleSelectCategory(category: string) {
        if (category === "all") {
            dispatch(ProductsReducerActions.getList());
        } else {
            dispatch(ProductsReducerActions.getListByCategory(category));
        }
    }

    function setBorderStyle(category: string) {
        if (selectedCategory === category) {
            return { borderLeft: "5px solid black", fontWeight: 900 }
        }
    };

    function renderContent() {
        return (
            <div className={classes.container}>
                <h1 className={classes.title}>{title}</h1>
                {items &&
                    items.map((item: any) => <div key={item} style={setBorderStyle(item)} onClick={() => handleSelectCategory(item)} className={classes.item}>{item}</div>)
                }
            </div>
        )
    };

    return (
        <>
            <Sider className={classes.sider}>
                {renderContent()}
            </Sider>
            <Drawer anchor='left' open={isSidebarOpen} onClose={() => dispatch(GlobalReducerActions.showResponsiveSidebar(false))}>
                {renderContent()}
            </Drawer>
        </>
    )
}

export default Sidebar;