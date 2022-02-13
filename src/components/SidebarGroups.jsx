import React, {useContext, useEffect, useState} from 'react';
import AvatarButton from "./UI/buttons/AvatarButton";
import StatusSelect from "./inputs/StatusSelect";
import SettingButton from "./UI/buttons/SettingButton";
import Dropdown from "./UI/Dropdown";
import RegularInput from "./inputs/RegularInput";
import SidebarUserTab from "./partials/SidebarUserTab";
import SidebarMenu from "./partials/SidebarMenu";
import {useDispatch} from "react-redux";
import {SocketInstance} from "../layouts/Default";
import StatusService from "../services/StatusService";
import {fetchFriends, fetchUsersBySearch} from "../store/slices/friend";
import {logout} from "../store/slices/auth";

const SidebarGroups = () => {
    const dispatch = useDispatch();
    const socket = useContext(SocketInstance);

    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [accountDropdown, setAccountDropdown] = useState(false);

    useEffect(() => {
        fetchStatuses();
        dispatch(fetchFriends());
        setSelectedStatus(user.status);
    }, []);

    const fetchStatuses = async () => {
        try {
            const {data} = await StatusService.fetchStatuses();
            setStatuses(data);
        } catch (e) {
            console.log(e);
        }
    };

    const changeStatus = (status) => {
        socket.emit('change-status', {status});
        setSelectedStatus(status);
    };

    const searchGroups = (username) => {
        dispatch(fetchUsersBySearch(username));
    };

    const handleLogout = () => dispatch(logout());

    const dropDownItems = [
        {text: 'Settings', onClick: () => console.log('Settings')},
        {text: 'Log out', onClick: handleLogout},
    ];

    return (
        <aside className="sidebar d-flex flex-column">
            <div className="sidebar__head d-flex">
                <AvatarButton status={selectedStatus.className}/>
                <div className="flex-grow-1 ms-3">
                    <div className="sidebar__name bold-text">{user.username}</div>
                    {statuses.length > 0 &&
                    <StatusSelect
                        statuses={statuses}
                        selectedStatus={selectedStatus}
                        onStatusChange={changeStatus}
                    />
                    }
                </div>
                <SettingButton onClick={() => setAccountDropdown(!accountDropdown)}/>
                {accountDropdown &&
                <>
                    <div className="position-relative">
                        <Dropdown items={dropDownItems} onClose={() => setAccountDropdown(!accountDropdown)}/>
                    </div>
                </>
                }
            </div>
            <div className="sidebar__body flex-grow-1">
                <RegularInput
                    placeholder='Search'
                    onChange={searchGroups}
                />
                {friends.length > 0 && friends.map((friend, index) => (
                        <SidebarUserTab user={friend.friend}
                                        lastMessage={friend.lastMessage}
                                        key={index}/>
                    )
                )
                }
            </div>
            <SidebarMenu/>
        </aside>
    );
};

export default SidebarGroups;
