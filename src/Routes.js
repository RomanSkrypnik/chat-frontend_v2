import React from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Help from "./pages/help";
import Login from "./pages/login";
import Register from "./pages/register";

const authRoutes = [
    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>},
];

const mainRoutes = [
    {path: '/', element: <Home/>},
    {path: '/about', element: <About/>},
    {path: '/help', element: <Help/>},
];

export {mainRoutes, authRoutes};
