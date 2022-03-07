import React, {useContext} from 'react';
import {ChatMessageInstance} from "../UI/ChatMessage";

const SingleMessagePicture = ({name, url, alt}) => {

    const handlePhotoModalOpen = useContext(ChatMessageInstance);

    return (
        <div className="chat-message__message regular-text position-relative">
            <img onClick={() => handlePhotoModalOpen(url + name)}
                 className="chat-message__image"
                 src={url + name}
                 alt={alt ?? ''}
            />
        </div>
    );
};

export default SingleMessagePicture;
