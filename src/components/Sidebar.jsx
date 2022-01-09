import React from 'react';
import AvatarButton from "./UI/buttons/AvatarButton";
import SettingButton from "./UI/buttons/SettingButton";
import StatusSelect from "./inputs/StatusSelect";
import SidebarUserTab from "./partials/SidebarUserTab";
import SidebarMenu from "./partials/SidebarMenu";
import StatusService from "../services/StatusService";

const Sidebar = () => {
    return (
        <aside className="sidebar d-flex flex-column">
            <div className="sidebar__head d-flex">
                <AvatarButton/>
                <div className="flex-grow-1 ms-3">
                    <div className="sidebar__name bold-text">Mehmet Revnaki</div>
                    <StatusSelect/>
                </div>
                <SettingButton/>
            </div>
            <div className="sidebar__body flex-grow-1">
                <SidebarUserTab/>
            </div>
            <SidebarMenu/>
        </aside>
    );
};

export default Sidebar;
