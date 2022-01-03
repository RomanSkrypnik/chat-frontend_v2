import React from 'react';
import ChatButton from "../UI/buttons/ChatButton";
import ClipIcon from "../UI/icons/Clip";
import MicrophoneIcon from "../UI/icons/Microphone";

const ChatTextInput = () => {

    return (
        <div className="chat-text-input d-flex">
            <ChatButton>
                <ClipIcon/>
            </ChatButton>
            <ChatButton>
                <MicrophoneIcon/>
            </ChatButton>
            <input type="text"/>
        </div>
    );
};

export default ChatTextInput;
