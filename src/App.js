import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.scss';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import routes from './Routes';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => <Route path={route.path} element={route.element} key={index}/>)}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
