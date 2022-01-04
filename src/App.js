import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';
import { useSelector } from "react-redux";
import DefaultLayout from "./layouts/default";
import UnauthorizedLayout from "./layouts/unauthorized";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {mainRoutes, authRoutes} from './Routes';

function App() {

    const { loggedIn } = useSelector()

    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    {mainRoutes.map((route, index) => <Route path={route.path} element={route.element} key={index}/>)}
                </Routes>
            </DefaultLayout>
            <UnauthorizedLayout>
                <Routes>
                    {authRoutes.map((route, index) => <Route path={route.path} element={route.element} key={index}/>)}
                </Routes>
            </UnauthorizedLayout>
        </BrowserRouter>
    );
}

export default App;
