import React from 'react';
import {Link} from "react-router-dom";

const SidebarMenuButton = ({children}) => {

    return (
        <Link to="/" className="sidebar-menu-button">{children}</Link>
    );

};

export default SidebarMenuButton;
