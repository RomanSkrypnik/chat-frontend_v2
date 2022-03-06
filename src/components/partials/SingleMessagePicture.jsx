import React, {useContext} from 'react';
import {ChatMessageInstance} from "../UI/ChatMessage";

const SingleMessagePicture = ({name, url, alt}) => {

    const handlePhotoModalOpen = useContext(ChatMessageInstance);

    return (
        <img onClick={() => handlePhotoModalOpen(url + name)}
             className="chat-message__image"
             src={url + name}
             alt={alt ?? ''}
        />
    );
};

export default SingleMessagePicture;
