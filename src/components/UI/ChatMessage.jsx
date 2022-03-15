import React, {useContext, useEffect, useState} from 'react';
import AvatarButton from "./buttons/AvatarButton";
import {format} from 'date-fns';
import cn from "classnames";
import Timestamp from "./Timestamp";
import {useInView} from 'react-intersection-observer';
import {SocketInstance} from "../../layouts/Default";
import {useSelector} from "react-redux";
import PhotoModal from "../modals/PhotoModal";
import ChatMessageInner from "../partials/ChatMessageInner";

export const ChatMessageInstance = React.createContext(null);

const ChatMessage = ({message, alignToRight = false, circle = false}) => {

    const {ref, inView} = useInView({
        threshold: 0.9,
    });

    const socket = useContext(SocketInstance);

    const {user} = useSelector(state => state.auth);

    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [photoModalSrc, setPhotoModalSrc] = useState(null);

    useEffect(async () => {
        if (inView) {
            if (!message.isRead && message.sender.hash !== user.hash) {
                const body = {
                    id: message.id,
                    friendHash: message.sender.hash,
                    currentHash: user.hash
                };
                socket.emit('read-message', body);
            }
        }
    }, [inView]);

    const handlePhotoModalOpen = (src) => {
        setPhotoModalSrc(src);
        setShowPhotoModal(true);
    };

    return (
        <ChatMessageInstance.Provider value={handlePhotoModalOpen}>

            <div className={cn("chat-message", alignToRight && 'chat-message_yellow')} ref={ref}>

                {
                    circle &&
                    <div className="chat-message__name last-text last-text_alt mb-1">{message.sender.username}</div>
                }

                <div className="chat-message__wrapper">

                    {
                        circle &&
                        <div className={cn("d-flex", alignToRight && 'justify-content-end')}>
                            <AvatarButton user={message.sender}/>
                        </div>
                    }

                    <div className="chat-message__inner d-flex flex-column align-items-start">
                        {message && <ChatMessageInner message={message}/>}
                    </div>

                </div>
            </div>

            {
                showPhotoModal &&
                <PhotoModal onClose={() => setShowPhotoModal(false)} src={photoModalSrc}/>
            }

        </ChatMessageInstance.Provider>
    );
};

export default ChatMessage;
