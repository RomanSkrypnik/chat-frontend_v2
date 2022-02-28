import React, {useEffect, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import ReadMessageIcon from "../UI/ReadMessageIcon";
import {format} from 'date-fns';
import {NavLink} from "react-router-dom";

const SidebarUserTab = ({user}) => {
    const [date, setDate] = useState(null);
    const [message, setMessage] = useState(null);

    const init = () => {
        const lastMessage = user.messages ? user.messages[user.messages.length - 1] : null;
        const formatedData = lastMessage ? format(new Date(lastMessage.createdAt), 'dd/MM/yyyy') : '';

        setDate(formatedData);
        setMessage(lastMessage);
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        init();
    }, [user.messages]);

    return (
        <NavLink to={`/${user.friend.hash}`} className="sidebar-tab d-flex align-items-center">
            <AvatarButton user={user.friend}/>
            <div className="ms-3">
                <div className="sidebar-tab__name bold-text">{user.friend.username}</div>
                <div className="sidebar-tab__message last-text">{message ? message.text : ''}</div>
            </div>
            <div className="ms-auto d-flex flex-column align-items-end">
                <div className="sidebar-tab__time last-text">{date}</div>
                {(message && !message.isRead) && <ReadMessageIcon/>}
            </div>
        </NavLink>
    );
};

export default SidebarUserTab;
