import React, {useContext, useEffect} from 'react';
import AvatarButton from "./buttons/AvatarButton";
import {format} from 'date-fns';
import cn from "classnames";
import Timestamp from "./Timestamp";
import {useInView} from 'react-intersection-observer';
import {SocketInstance} from "../../layouts/Default";
import {useSelector} from "react-redux";
import ReadMessageIcon from "./ReadMessageIcon";
import {API_URL} from "../../http";

const ChatMessage = ({message, alignToRight = false, circle = false, timestamp = false}) => {

    const {ref, inView} = useInView({
        threshold: 0.9,
    });

    const socket = useContext(SocketInstance);

    const {user} = useSelector(state => state.auth);

    const currentDate = new Date();
    const date = new Date(message.createdAt);
    const time = format(date, 'hh:mm');
    const formattedDate = currentDate.getDate() === date.getDate() ? 'TODAY' : format(date, 'dd/MM/yyyy');

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

    return (
        <>
            {timestamp && <Timestamp date={formattedDate}/>}

            <div className={cn("chat-message", alignToRight && 'chat-message_yellow')} ref={ref}>

                {circle && <div
                    className="chat-message__name last-text last-text_alt fw-bold mb-1">{message.sender.username}</div>}

                <div className="chat-message__wrapper">
                    {
                        circle && <div className="chat-message__avatar">
                            <AvatarButton user={message.sender}/>
                        </div>
                    }
                    <div className="chat-message__inner d-flex flex-column align-items-start">
                        <div className="chat-message__message regular-text position-relative">
                            {
                                message.files &&
                                <div className="d-flex flex-wrap gap-3">
                                    {message.files.map(file => <img className="chat-message__image" src={`${API_URL}/img/messages/${file.uniqueName}`} alt='' />)}
                                </div>
                            }
                            <span className="chat-message__message-text mt-2">{message.text}</span>
                            <div className="chat-message__time-holder">
                                <span className="chat-message__time">{time}</span>
                                {!message.isRead && <ReadMessageIcon/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatMessage;
