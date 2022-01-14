import React, {useEffect, useState} from 'react';
import AvatarButton from "./UI/buttons/AvatarButton";
import SettingButton from "./UI/buttons/SettingButton";
import StatusSelect from "./inputs/StatusSelect";
import SidebarUserTab from "./partials/SidebarUserTab";
import SidebarMenu from "./partials/SidebarMenu";
import StatusService from "../services/StatusService";
import {useSelector} from "react-redux";

const Sidebar = () => {
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const user = useSelector(state => state.auth.user);

    const fetchStatuses = async () => {
        try {
            const {data} = await StatusService.fetchStatuses();
            setStatuses(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchStatuses();
        setSelectedStatus(user.status);
    }, []);

    return (
        <aside className="sidebar d-flex flex-column">
            <div className="sidebar__head d-flex">
                <AvatarButton/>
                <div className="flex-grow-1 ms-3">
                    <div className="sidebar__name bold-text">{user.username}</div>
                    { statuses.length > 0 && <StatusSelect statuses={statuses} selectedStatus={selectedStatus}/>}
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
