import React from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import ReadMessageIcon from "../UI/ReadMessageIcon";

const SidebarUserTab = ({user, lastMessage}) => {
    return (
        <div className="sidebar-tab d-flex align-items-center">
            <AvatarButton status={user.status.className}/>
            <div className="ms-3">
                <div className="sidebar-tab__name bold-text">{user.username}</div>
                <div className="sidebar-tab__message last-text">{lastMessage && ''}</div>
            </div>
            <div className="ms-auto d-flex flex-column align-items-end">
                <div className="sidebar-tab__time last-text">17/06/2020</div>
                <ReadMessageIcon/>
            </div>
        </div>
    );
};

export default SidebarUserTab;
