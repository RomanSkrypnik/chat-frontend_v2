import React from 'react';

const UnreadMessageLabel = ({children}) => {
    return (
        <div className="unread-message-label bold-text bold-text_alt text-white">
            {children}
        </div>
    );
};

export default UnreadMessageLabel;
