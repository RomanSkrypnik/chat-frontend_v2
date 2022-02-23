import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GroupsEmpty from "./pages/GroupsEmpty";
import HomeEmpty from "./pages/HomeEmpty";

const routes = [
    {path: '/', element: HomeEmpty},
    {path: '/:hash', element: Home},
    {path: 'login', element: Login},
    {path: 'register', element: Register},
    {path: 'groups', element: GroupsEmpty}
];

export default routes;
