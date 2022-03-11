import React, {useContext, useEffect, useState} from 'react';
import ReadMessageIcon from "../UI/ReadMessageIcon";
import {format} from "date-fns";
import cn from "classnames";
import {ChatMessageInstance} from "../UI/ChatMessage";
import {API_URL} from "../../http";

const ChatMessageInner = ({message}) => {

    const [className, setClassName] = useState('');

    const handlePhotoModalOpen = useContext(ChatMessageInstance);

    const date = new Date(message.createdAt);
    const time = format(date, 'hh:mm');
    const url = `${API_URL}/img/messages/`;

    useEffect(() => {
        if (message.files) {
            assignClassName();
        }
    }, []);

    const assignClassName = () => {
        switch (message.files.length) {
            case 2:
                setClassName('chat-message__message_double');
                break;
            case 3:
                setClassName('chat-message__message_triple');
                break;
            case 4:
                setClassName('chat-message__message_quadruple');
                break;
            case 5:
                setClassName('chat-message__message_quintuple');
                break;
        }
    };

    return (
        <div className={cn("chat-message__message regular-text", className)}>

            <div className="chat-message__image-row">
                {
                    message.files && message.files.map(file =>
                        <div className="chat-message__image-wrapper" key={file.id}>
                            <img onClick={() => handlePhotoModalOpen(url + file.uniqueName)}
                                 className="chat-message__image"
                                 src={url + file.uniqueName}
                                 alt={file.alt ?? ''}
                            />
                        </div>
                    )
                }
            </div>

            <span className="chat-message__message-text mt-2">{message.text ?? ''}</span>

            <div className="chat-message__time-holder">
                <span className="chat-message__time">{time}</span>
                {!message.isRead && <ReadMessageIcon/>}
            </div>
        </div>
    );
};

export default ChatMessageInner;
