import React from 'react';
import AvatarButton from "./buttons/AvatarButton";

const ChatMessage = () => {
    return (
        <div className="chat-message d-flex flex-column">
            <div className="chat-message__name last-text last-text_alt fw-bold mb-1">Phillip Torff</div>
            <div className="chat-message__wrapper d-flex">
                <AvatarButton/>
                <div className="d-flex flex-column align-items-start ms-1">
                    <div className="chat-message__message regular-text position-relative">
                        <span>Hello m8!</span>
                        <span className="chat-message__time">15:02</span>
                    </div>
                    <div className="chat-message__message regular-text position-relative">
                        <span>I have send the files back to ya it only took me about 60 mins this time was with testing too.</span>
                        <span className="chat-message__time">15:03</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
