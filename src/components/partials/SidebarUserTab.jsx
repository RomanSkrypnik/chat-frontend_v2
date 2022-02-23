import React, {useEffect, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import ReadMessageIcon from "../UI/ReadMessageIcon";
import {format} from 'date-fns';
import {NavLink} from "react-router-dom";

const SidebarUserTab = ({user}) => {
    const [date, setDate] = useState(null);
    const [message, setMessage] = useState(null);

    const initState = () => {
        const lastMessage = user.messages[user.messages.length - 1];

        const formatedData = lastMessage ? format(new Date(lastMessage.createdAt), 'dd/MM/yyyy') : '';
        const text = lastMessage ? lastMessage.text : '';

        setDate(formatedData);
        setMessage(text);
    };

    useEffect(() => {
        initState();
    }, []);

    useEffect(() => {
        initState();
    }, [user.messages]);

    return (
        <NavLink to={`/${user.friend.hash}`} className="sidebar-tab d-flex align-items-center">
            <AvatarButton user={user.friend}/>
            <div className="ms-3">
                <div className="sidebar-tab__name bold-text">{user.friend.username}</div>
                <div className="sidebar-tab__message last-text">{message}</div>
            </div>
            <div className="ms-auto d-flex flex-column align-items-end">
                <div className="sidebar-tab__time last-text">{date}</div>
                <ReadMessageIcon/>
            </div>
        </NavLink>
    );
};

export default SidebarUserTab;
