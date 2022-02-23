import React from 'react';
import {NavLink} from "react-router-dom";

const SidebarMenuButton = ({children, path}) => {

    return (
        <NavLink to={path} className="sidebar-menu-button">{children}</NavLink>
    );

};

export default SidebarMenuButton;
