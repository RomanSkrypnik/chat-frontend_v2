import React from 'react';
import Timestamp from "../UI/Timestamp";
import ChatMessage from "../UI/ChatMessage";

const ChatScroll = () => {
    return (
        <div className="chat-scroll d-flex flex-column">
            <Timestamp/>
            <ChatMessage/>
        </div>
    );
};

export default ChatScroll;
