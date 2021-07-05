import IReducerAction from '../commons/interfaces/IReducerAction';

const GLOBAL_INITIAL_STATE = {
    isPageLoading: false,
    isSidebarOpen: false,
    displayMenuIcon: true
}

export const GLOBAL_REDUCER_TYPES = {
    SET_LOADER: "SET_LOADER",
    SET_SIDEBAR: "SET_SIDEBAR",
    SET_DISPLAY_MENU_ICON: "SET_DISPLAY_MENU_ICON"
}

export const globalReducer = (state = GLOBAL_INITIAL_STATE, action: IReducerAction) => {
    const { type, payload } = action;
    switch (type) {
        case GLOBAL_REDUCER_TYPES.SET_LOADER:
            return {
                ...state,
                isPageLoading: payload
            }

        case GLOBAL_REDUCER_TYPES.SET_SIDEBAR:
            return {
                ...state,
                isSidebarOpen: payload
            }

        case GLOBAL_REDUCER_TYPES.SET_DISPLAY_MENU_ICON:
            return {
                ...state,
                displayMenuIcon: payload
            }

        default:
            return state;
    }

};

const showPageLoader = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GLOBAL_REDUCER_TYPES.SET_LOADER, payload: true })
        } catch (error) {
            console.log(error)
        }
    }
};

const hidePageLoader = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GLOBAL_REDUCER_TYPES.SET_LOADER, payload: false })
        } catch (error) {
            console.log(error)
        }
    }
};

const showResponsiveSidebar = (instruction: boolean) => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GLOBAL_REDUCER_TYPES.SET_SIDEBAR, payload: instruction })
        } catch (error) {
            console.log(error)
        }
    }
};

const showMenuIcon = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GLOBAL_REDUCER_TYPES.SET_DISPLAY_MENU_ICON, payload: true })
        } catch (error) {
            console.log(error)
        }
    }
};

const hideMenuIcon = () => {
    return async (dispatch: any) => {
        try {
            dispatch({ type: GLOBAL_REDUCER_TYPES.SET_DISPLAY_MENU_ICON, payload: false })
        } catch (error) {
            console.log(error)
        }
    }
};


export const GlobalReducerActions = {
    showPageLoader,
    hidePageLoader,
    showResponsiveSidebar,
    showMenuIcon,
    hideMenuIcon
}