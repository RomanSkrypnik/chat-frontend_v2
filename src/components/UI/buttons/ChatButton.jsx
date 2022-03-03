import React from 'react';

const ChatButton = ({onClick, children}) => {
    return (
        <button onClick={onClick}>{ children }</button>
    );
};

export default ChatButton;
