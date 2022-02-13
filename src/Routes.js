import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeEmpty from "./pages/HomeEmpty";
import GroupsEmpty from "./pages/GroupsEmpty";

const routes = [
    {path: '/', element: HomeEmpty},
    {path: '/:hash', element: Home},
    {path: 'login', element: Login},
    {path: 'register', element: Register},
    {path: 'groups', element: GroupsEmpty}
];

export default routes;
