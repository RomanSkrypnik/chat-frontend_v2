import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';
import DefaultLayout from "./layouts/default";
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import routes from './Routes';

function App() {
    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    {routes.map((route, index) => <Route path={route.path} element={route.element} key={index}/>)}
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
