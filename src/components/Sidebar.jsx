import React from 'react';
import AvatarButton from "./UI/buttons/AvatarButton";
import SettingButton from "./UI/buttons/SettingButton";
import StatusSelect from "./inputs/StatusSelect";
import SidebarUserTab from "./partials/SidebarUserTab";
import SidebarMenu from "./partials/SidebarMenu";

const Sidebar = () => {

    return (
        <aside className="sidebar">
            <div className="sidebar__head d-flex">
                <AvatarButton/>
                <div className="flex-grow-1 ms-3">
                    <div className="sidebar__name bold-text">Mehmet Revnaki</div>
                    <StatusSelect/>
                </div>
                <SettingButton/>
            </div>
            <div className="sidebar__body">
                <SidebarUserTab/>
            </div>
            <SidebarMenu/>
        </aside>
    );
};

export default Sidebar;
