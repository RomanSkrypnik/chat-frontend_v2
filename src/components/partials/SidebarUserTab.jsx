import React from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import ReadMessageIcon from "../UI/ReadMessageIcon";
import { format } from 'date-fns'

const SidebarUserTab = ({user, lastMessage}) => {
    const date = format(new Date(lastMessage.createdAt), 'dd/MM/yyyy');
    const text = lastMessage.text;

    return (
        <div className="sidebar-tab d-flex align-items-center">
            <AvatarButton status={user.status.className}/>
            <div className="ms-3">
                <div className="sidebar-tab__name bold-text">{user.username}</div>
                <div className="sidebar-tab__message last-text">{text ?? ''}</div>
            </div>
            <div className="ms-auto d-flex flex-column align-items-end">
                <div className="sidebar-tab__time last-text">{date ?? ''}</div>
                <ReadMessageIcon/>
            </div>
        </div>
    );
};

export default SidebarUserTab;
