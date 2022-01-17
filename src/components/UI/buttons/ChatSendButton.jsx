import React from 'react';
import MessageArrow from "../icons/MessageArrow";

const ChatSendButton = ({onClick}) => {
    return (
        <button type="submit" className="chat-send-button bold-text bold-text_alt d-flex justify-content-between" onClick={onClick}>
            <span>Send</span>
            <MessageArrow/>
        </button>
    );
};

export default ChatSendButton;