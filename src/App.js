import React, {useEffect} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';
import {Routes, Route, useNavigate} from "react-router-dom";
import routes from './Routes';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "./store/slices/auth";

function App() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    useEffect(() => {
        if (loggedIn) navigate('/');
    }, [loggedIn]);

    return (
            <Routes>
                {routes.map((route, index) => <Route path={route.path} element={route.element} key={index}/>)}
            </Routes>
    );
}

export default App;
