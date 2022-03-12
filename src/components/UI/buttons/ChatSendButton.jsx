import React from 'react';
import MessageArrow from "../icons/MessageArrow";

const ChatSendButton = ({onClick, disabled = false}) => {
    return (
        <button type="submit" className="chat-send-button bold-text bold-text_alt" onClick={onClick} disabled={disabled}>
            <span>Send</span>
            <MessageArrow/>
        </button>
    );
};

export default ChatSendButton;
