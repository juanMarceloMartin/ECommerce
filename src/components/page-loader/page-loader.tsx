import { FC } from 'react';
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import IStore from "../../commons/interfaces/IStore";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 101,
        color: "#fff",
    },
}));

const PageLoader: FC = () => {
    const classes = useStyles();
    const isPageLoading = useSelector((state: IStore) => state.global.isPageLoading);
    return (
        <Backdrop className={classes.backdrop} open={isPageLoading}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};

export default PageLoader;
