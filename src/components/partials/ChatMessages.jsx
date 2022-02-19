import React from 'react';
import ChatMessage from "../UI/ChatMessage";
import {useSelector} from "react-redux";

const ChatMessages = ({messages}) => {

    const {user} = useSelector(state => state.auth);

    return (
        <>
            {
                messages.length > 0 && messages.map((message, index) => {
                    let circle = true;
                    let isDateDifferent = false;

                    if (index > 0) {
                        circle = messages[index - 1].sender.hash !== message.sender.hash;
                        const prevDate = new Date(messages[index - 1].createdAt).getDate();
                        const currentDate = new Date(message.createdAt).getDate();
                        isDateDifferent = prevDate !== currentDate;
                    }

                    const alignToRight = message.sender.hash === user.hash;

                    return <ChatMessage message={message} alignToRight={alignToRight} circle={circle}
                                        timestamp={isDateDifferent} key={index}/>
                })
            }
        </>
    );
};

export default ChatMessages;
