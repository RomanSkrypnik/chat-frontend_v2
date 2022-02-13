import React from 'react';
import HumanIcon from "../UI/icons/Human";
import PeopleIcon from "../UI/icons/People";
import SidebarMenuButton from "../UI/buttons/SidebarMenuButton";

const SidebarMenu = () => {

    const routes = [
        {path: '/', icon: <HumanIcon/>},
        {path: '/groups', icon: <PeopleIcon/>},
    ];

    return (
        <div className="sidebar-menu d-flex justify-content-between">
            {routes.map(({path, icon}, index) => (
                    <SidebarMenuButton
                        className='w-25'
                        path={path}
                        key={index}>
                        {icon}
                    </SidebarMenuButton>
                )
            )
            }
        </div>
    );
};

export default SidebarMenu;
