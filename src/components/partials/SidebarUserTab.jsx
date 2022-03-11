import React, {useEffect, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import ReadMessageIcon from "../UI/ReadMessageIcon";
import {format} from 'date-fns';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import UnreadMessageLabel from "../UI/UnreadMessageLabel";

const SidebarUserTab = ({user}) => {
    const [date, setDate] = useState(null);
    const [message, setMessage] = useState(null);
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

    const currentUser = useSelector(state => state.auth.user);

    const init = () => {
        const {messages} = user;

        if (messages && messages.length > 0) {
            const lastMessage = {...messages[messages.length - 1]};
            const date = format(new Date(lastMessage.createdAt), 'dd/MM/yyyy');
            const {length} = messages.filter(message => !message.isRead && message.sender.hash !== user.hash);

            if (lastMessage.text === '' && lastMessage.files.length > 1) {
                lastMessage.text = 'Photos'
            } else if (lastMessage.text === '' && lastMessage.files.length === 1) {
                lastMessage.text = 'Photo';
            }

            setDate(date);
            setMessage(lastMessage);
            setUnreadMessagesCount(length);
        }
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
            <div className="sidebar-tab__body ms-3">
                <div className="sidebar-tab__name bold-text">{user.friend.username}</div>
                <div className="sidebar-tab__message last-text">{message ? message.text : ''}</div>
            </div>
            <div className="ms-auto d-flex flex-column align-items-end">

                {date && <div className="sidebar-tab__time last-text">{date}</div>}

                {
                    (message && !message.isRead && message.sender.hash === currentUser.hash) && <ReadMessageIcon/>
                }

                {
                    (message && !message.isRead && message.sender.hash !== currentUser.hash && unreadMessagesCount > 0) &&
                    <UnreadMessageLabel>{unreadMessagesCount}</UnreadMessageLabel>
                }
            </div>
        </NavLink>
    );
};

export default SidebarUserTab;
