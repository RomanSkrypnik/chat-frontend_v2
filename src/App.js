import React, {useEffect} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';
import {Routes, Route} from "react-router-dom";
import routes from './Routes';
import {checkAuth} from "./store/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import SnackbarProvider from "./components/providers/SnackbarProvider";

function App() {
    const dispatch = useDispatch();

    const {isLoaded} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    return (
        isLoaded &&
        <SnackbarProvider>
            <Routes>
                {
                    routes.map((route, index) => <Route path={route.path} element={route.element} key={index}/>)
                }
            </Routes>
        </SnackbarProvider>
    );
}

export default App;
