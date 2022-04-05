import React, {useContext, useEffect, useState} from 'react';
import AvatarButton from "./UI/buttons/AvatarButton";
import SettingButton from "./UI/buttons/SettingButton";
import StatusSelect from "./inputs/StatusSelect";
import SidebarUserTab from "./partials/SidebarUserTab";
import SidebarMenu from "./partials/SidebarMenu";
import {fetchFriends, fetchUsersBySearch} from "../store/slices/friend";
import {changeStatus, logout} from "../store/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import Dropdown from "./UI/Dropdown";
import ContactInfo from "./modals/ContactInfo";
import CurrentUserInfo from "./partials/CurrentUserInfo";
import {SocketInstance} from "../layouts/Default";
import TextInput from "./inputs/TextInput";
import {Controller, useForm} from "react-hook-form";

const Sidebar = () => {
    const dispatch = useDispatch();
    const socket = useContext(SocketInstance);
    const {control, handleSubmit} = useForm();

    const [accountDropdown, setAccountDropdown] = useState(false);
    const [contactInfo, setContactInfo] = useState(false);

    const {user} = useSelector(state => state.auth);
    const {friends} = useSelector(state => state.friend);

    useEffect(() => {
        dispatch(fetchFriends());
    }, []);

    const handleFriendsSearch = ({username}) => {
        dispatch(fetchUsersBySearch(username));
    };

    const handleLogout = () => dispatch(logout());

    const handleContactInfo = () => {
        setContactInfo(!contactInfo);
        setAccountDropdown(false);
    };

    const handleStatusChange = (status) => {
        socket.emit('change-status', {status});
        dispatch(changeStatus({status}));
    };

    const dropDownItems = [
        {text: 'Settings', onClick: handleContactInfo},
        {text: 'Log out', onClick: handleLogout},
    ];

    return (
        <>
            <aside className="sidebar d-flex flex-column">
                <div className="sidebar__head d-flex">
                    <AvatarButton onClick={handleContactInfo} user={user}/>
                    <div className="flex-grow-1 ms-3">
                        <div className="sidebar__name bold-text">{user.username}</div>
                        <StatusSelect
                            selectedStatus={user.status}
                            onStatusChange={handleStatusChange}
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
                    <form onChange={handleSubmit(handleFriendsSearch)}>
                        <Controller
                            control={control}
                            name="username"
                            render={({field: {onChange}}) => (
                                <TextInput
                                    placeholder='Search friends'
                                    onChange={onChange}
                                />
                            )}
                        />
                    </form>
                    {
                        friends.length > 0 && friends.map((friend, index) => (
                                <SidebarUserTab user={friend} key={index}/>
                            )
                        )
                    }
                </div>
            </aside>

            {
                contactInfo &&
                <ContactInfo
                    title="Contact Info"
                    user={user}
                    onClose={handleContactInfo}
                    isModal
                >
                    <CurrentUserInfo/>
                </ContactInfo>
            }
        </>
    );
};

export default Sidebar;
