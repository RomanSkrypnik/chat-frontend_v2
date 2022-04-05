import React from 'react';

const ChatButton = ({onClick, isDisabled = false, children}) => {

    return (
        <>
            <button
                className="chat-button"
                disabled={isDisabled}
                onClick={onClick}
            >{children}</button>
        </>
    );
};

export default ChatButton;
