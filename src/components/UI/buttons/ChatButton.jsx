import React from 'react';

const ChatButton = ({onMouseUp, onMouseDown, onClick, children}) => {
    return (
        <button
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>{children}</button>
    );
};

export default ChatButton;
