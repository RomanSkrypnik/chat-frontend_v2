import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Register from "./pages/Register";

const routes = [
    {path: '/', element: Home},
    {path: 'about', element: About},
    {path: 'help', element: Help},
    {path: 'login', element: Login},
    {path: 'register', element: Register}
];

export default routes;
