import React from 'react';
import HumanIcon from "../UI/icons/Human";
import MagnifierIcon from "../UI/icons/Magnifier";
import PeopleIcon from "../UI/icons/People";
import StarIcon from "../UI/icons/Star";
import SidebarMenuButton from "../UI/buttons/SidebarMenuButton";

const SidebarMenu = () => {

    const icons = [
      <HumanIcon/>,
      <MagnifierIcon/>,
      <PeopleIcon/>,
      <StarIcon/>
    ];

    const routes = [
        {path: '/', icon: <HumanIcon/>},
        {path: '/subscribers', icon: <PeopleIcon/>},
        {path: '/search', icon: <MagnifierIcon/>},
        {path: '/favourite', icon: <StarIcon/>},
    ];

    return (
        <div className="sidebar-menu d-flex justify-content-between">
            {routes.map(({path, icon}, index) => <SidebarMenuButton className='w-25' path={path} key={index}>{icon}</SidebarMenuButton>)}
        </div>
    );
};

export default SidebarMenu;
