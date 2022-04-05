import React, {useContext, useEffect, useState} from 'react';
import ReadMessageIcon from "../UI/ReadMessageIcon";
import {format} from "date-fns";
import cn from "classnames";
import {ChatMessageInstance} from "../UI/ChatMessage";
import {MESSAGE_URL, VOICE_URL} from "../../http";
import Dropdown from "../UI/Dropdown";

const ChatMessageInner = ({message}) => {

    const [className, setClassName] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);

    const handlePhotoModalOpen = useContext(ChatMessageInstance);

    const date = new Date(message.createdAt);
    const time = format(date, 'hh:mm');

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

    const handleOnContextMenu = e => {
        e.preventDefault();
        setShowDropDown(true);
    };

    const dropDownItems = [
        {
            text: 'Stare message', onClick: () => {
                console.log('test')
            }
        }
    ];

    return (
        <div className={cn("chat-message__message regular-text", className)} onContextMenu={handleOnContextMenu}>

            <div className="chat-message__image-row">
                {
                    message.files && message.files.map(file => {
                        const {uniqueName, alt} = file;

                        const ext = uniqueName.substring(uniqueName.lastIndexOf('.'), uniqueName.length);

                        if (ext === '.ogg') {
                            return <audio src={VOICE_URL + uniqueName} controls key={file.id}/>
                        }

                        return <div className="chat-message__image-wrapper" key={file.id}>
                                <img onClick={() => handlePhotoModalOpen(MESSAGE_URL + uniqueName)}
                                     className="chat-message__image"
                                     src={MESSAGE_URL + uniqueName}
                                     alt={alt ?? ''}
                                />
                            </div>
                        }
                    )
                }
            </div>

            <span className="chat-message__message-text mt-2">{message.text ?? ''}</span>

            <div className="chat-message__time-holder">
                <span className="chat-message__time">{time}</span>
                {!message.isRead && <ReadMessageIcon/>}
            </div>

            {
                showDropDown && <Dropdown
                    className="end align-self-start"
                    items={dropDownItems}
                    onClose={() => setShowDropDown(false)}
                />
            }

        </div>
    );
};

export default ChatMessageInner;
