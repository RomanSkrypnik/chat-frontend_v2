import React, {useContext, useEffect, useState} from 'react';
import AvatarButton from "./UI/buttons/AvatarButton";
import SettingButton from "./UI/buttons/SettingButton";
import StatusSelect from "./inputs/StatusSelect";
import SidebarUserTab from "./partials/SidebarUserTab";
import SidebarMenu from "./partials/SidebarMenu";
import {fetchFriends, fetchUsersBySearch} from "../store/slices/friend";
import {changeStatus, logout} from "../store/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import {SocketInstance} from "../layouts/Default";
import RegularInput from "./inputs/RegularInput";
import Dropdown from "./UI/Dropdown";
import Portal from "./Portal";
import ContactInfo from "./partials/ContactInfo";
import LockIcon from "./UI/icons/Lock";
import LogOutIcon from "./UI/icons/LogOut";

const Sidebar = () => {
    const dispatch = useDispatch();
    const socket = useContext(SocketInstance);

    const [accountDropdown, setAccountDropdown] = useState(false);
    const [contactInfo, setContactInfo] = useState(false);

    const user = useSelector(state => state.auth.user);
    const friends = useSelector(state => state.friend.friends);

    useEffect(() => {
        dispatch(fetchFriends());
    }, []);


    const changeUserStatus = (status) => {
        socket.emit('change-status', {status});
        dispatch(changeStatus({status}));
    };

    const searchFriends = (username) => {
        dispatch(fetchUsersBySearch(username));
    };

    const handleLogout = () => dispatch(logout());

    const handleContactInfo = () => {
        setContactInfo(!contactInfo);
        setAccountDropdown(false);
    };

    const dropDownItems = [
        {text: 'Settings', onClick: handleContactInfo},
        {text: 'Log out', onClick: handleLogout},
    ];

    const contactFormButtons = [
        {
            text: 'Privacy and security', onClick: () => {
            }, icon: <LockIcon/>
        },
        {text: 'Log out', onClick: handleLogout, icon: <LogOutIcon/>},
    ];

    return (
        <>
            <aside className="sidebar d-flex flex-column">
                <div className="sidebar__head d-flex">
                    <AvatarButton status={user.status.className}/>
                    <div className="flex-grow-1 ms-3">
                        <div className="sidebar__name bold-text">{user.username}</div>
                        <StatusSelect
                            selectedStatus={user.status}
                            onStatusChange={changeUserStatus}
                        />
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
                        onChange={searchFriends}
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
            {
                contactInfo &&
                <Portal>
                    <ContactInfo
                        disabledAvatar={false}
                        alignToCenter
                        buttons={contactFormButtons}
                        user={user}
                        onStatusChange={changeUserStatus}
                        onClose={handleContactInfo}
                    />
                </Portal>
            }
        </>
    );
};

export default Sidebar;
