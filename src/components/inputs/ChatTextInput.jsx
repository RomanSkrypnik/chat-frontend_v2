import React from 'react';
import ChatButton from "../UI/buttons/ChatButton";
import ClipIcon from "../UI/icons/Clip";
import MicrophoneIcon from "../UI/icons/Microphone";
import ChatSendButton from "../UI/buttons/ChatSendButton";

const ChatTextInput = () => {

    return (
        <div className="chat-text-input d-flex position-relative">
            <div className="chat-text-input__buttons d-flex">
                <ChatButton>
                    <ClipIcon/>
                </ChatButton>
                <ChatButton>
                    <MicrophoneIcon/>
                </ChatButton>
            </div>
            <input type="text" className="chat-text-input__input last-text last-text_alt" placeholder="Type a new message..."/>
            <ChatSendButton/>
        </div>
    );
};

export default ChatTextInput;
