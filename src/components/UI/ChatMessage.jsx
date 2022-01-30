import React from 'react';
import AvatarButton from "./buttons/AvatarButton";
import {format} from 'date-fns';
import cn from "classnames";
import Timestamp from "./Timestamp";

const ChatMessage = ({message, alignToRight = false, circle = false, timestamp = false}) => {

    const currentDate = new Date();
    const date = new Date(message.createdAt);
    const time = format(date, 'hh:mm');
    const formattedDate = currentDate.getDate() === date.getDate() ? 'TODAY' : format(date, 'dd/MM/yyyy');

    return (
        <>
            {timestamp && <Timestamp date={formattedDate}/>}
            <div
                className={cn("chat-message d-flex flex-column", alignToRight && 'chat-message_yellow align-self-end')}>
                {circle && <div
                    className="chat-message__name last-text last-text_alt fw-bold mb-1">{message.sender.username}</div>}
                <div className="chat-message__wrapper d-flex">
                    {circle ? <AvatarButton/> : <div className="chat-message__dummy"/>}
                    <div className="chat-message__inner d-flex flex-column align-items-start">
                        <div className={"chat-message__message regular-text position-relative"}>
                            <span>{message.text}</span>
                            <span className="chat-message__time">{time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatMessage;
