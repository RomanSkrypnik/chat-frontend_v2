import React, {useEffect, useState} from 'react';
import AvatarButton from "./UI/buttons/AvatarButton";
import SettingButton from "./UI/buttons/SettingButton";
import StatusSelect from "./inputs/StatusSelect";
import SidebarUserTab from "./partials/SidebarUserTab";
import SidebarMenu from "./partials/SidebarMenu";
import StatusService from "../services/StatusService";
import {fetchFriends} from "../store/slices/friend";
import {useDispatch, useSelector} from "react-redux";

const Sidebar = () => {
    const dispatch = useDispatch();

    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    const user = useSelector(state => state.auth.user);
    const friends = useSelector(state => state.friend.friends);

    const fetchStatuses = async () => {
        try {
            const {data} = await StatusService.fetchStatuses();
            setStatuses(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect( () => {
        fetchStatuses();
        dispatch(fetchFriends());
        setSelectedStatus(user.status);
    }, []);


    return (
        <aside className="sidebar d-flex flex-column">
            <div className="sidebar__head d-flex">
                <AvatarButton status={selectedStatus.className}/>
                <div className="flex-grow-1 ms-3">
                    <div className="sidebar__name bold-text">{user.username}</div>
                    { statuses.length > 0 && <StatusSelect statuses={statuses} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />}
                </div>
                <SettingButton/>
            </div>
            <div className="sidebar__body flex-grow-1">
                { friends.length > 0 && friends.map((friend, index) => <SidebarUserTab user={friend.friend} lastMessage={friend.lastMessage[0]} key={index}/>) }
            </div>
            <SidebarMenu/>
        </aside>
    );
};

export default Sidebar;
