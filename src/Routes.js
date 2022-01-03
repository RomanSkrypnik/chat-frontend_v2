import React from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Help from "./pages/help";

const routes = [
    {path: '/', element: <Home/>},
    {path: '/about', element: <About/>},
    {path: '/help', element: <Help/>},
];

export default routes;
