import React, {useEffect} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';
import {Routes, Route} from "react-router-dom";
import routes from './Routes';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "./store/slices/auth";

function App() {
    const dispatch = useDispatch();
    const {isLoaded} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    return (

        isLoaded ?
        <Routes>
            {
                routes.map((route, index) => <Route path={route.path} element={route.element} key={index}/>)
            }
        </Routes> : <div>Loading</div>
    );
}

export default App;
