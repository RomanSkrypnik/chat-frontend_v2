import React, {useContext, useState} from 'react';
import ChatMessages from "./ChatMessages";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import ContactInfo from "../modals/ContactInfo";
import UserInfo from "./UserInfo";
import SettingButton from "../UI/buttons/SettingButton";
import ChatTextInput from "../inputs/ChatTextInput";
import MessageService from "../../services/MessageService";
import {SocketInstance} from "../../layouts/Default";

const HomeMessages = () => {

    const {friend} = useSelector(state => state.friend);

    const {hash} = useParams();

    const socket = useContext(SocketInstance);

    const [contactInfo, setContactInfo] = useState(false);

    const onSendMessage = async ({text, media}) => {

        if (!media || media.length < 1) {
            const {data} = await MessageService.sendTextMessage(text, hash);
            socket.emit('send-text-message', {message: data, friend: friend.friend});
        } else {
            const fd = new FormData();

            media.forEach(mediaFile => fd.append('media', mediaFile));

            fd.append('text', text);
            fd.append('hash', hash);

            const {data} = await MessageService.sendMediaMessage(fd);
            socket.emit('send-media-message', {messages: data, friend: friend.friend});
        }
    };

    const handleContactInfo = () => setContactInfo(!contactInfo);

    return (
        <div className="d-flex">
            <div className="home__chat-wrapper">

                {friend.friend && <ChatMessages messages={friend.messages}/>}
                <div className="d-flex align-items-center ps-4 pe-5 mt-5 mb-4">
                    <SettingButton onClick={handleContactInfo}/>
                    <ChatTextInput onSubmit={onSendMessage}/>
                </div>
            </div>

            {
                contactInfo &&
                <ContactInfo onClose={handleContactInfo}>
                    <UserInfo user={friend}/>
                </ContactInfo>
            }
        </div>
    );
};

export default HomeMessages;
