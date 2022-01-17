import React, {useEffect, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import ReadMessageIcon from "../UI/ReadMessageIcon";
import { format } from 'date-fns';
import {Link} from "react-router-dom";

const SidebarUserTab = ({user, lastMessage}) => {
    const [date, setDate] = useState(null);
    const [message, setMessage] = useState(null);

    const formatedData = lastMessage && format(new Date(lastMessage.createdAt), 'dd/MM/yyyy');
    const text = lastMessage && lastMessage.text;

    const initState = () => {
        setDate(formatedData);
        setMessage(text);
    }

    useEffect(() => {
        initState();
    }, []);

    return (
        <Link to={`/${user.hash}`}>
            <div className="sidebar-tab d-flex align-items-center">
                <AvatarButton status={user.status.className}/>
                <div className="ms-3">
                    <div className="sidebar-tab__name bold-text">{user.username}</div>
                    <div className="sidebar-tab__message last-text">{message}</div>
                </div>
                <div className="ms-auto d-flex flex-column align-items-end">
                    <div className="sidebar-tab__time last-text">{date}</div>
                    <ReadMessageIcon/>
                </div>
            </div>
        </Link>
    );
};

export default SidebarUserTab;
