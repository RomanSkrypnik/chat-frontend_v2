import React, {useContext} from 'react';
import {ChatMessageInstance} from "../UI/ChatMessage";

const QuadrupleMessagePicture = ({files, url}) => {

    const handlePhotoModalOpen = useContext(ChatMessageInstance);

    return (
        <>
            {files.map((file, index) => (
                <div className="chat-message__message regular-text position-relative">
                    <img onClick={() => handlePhotoModalOpen(url + file.uniqueName)}
                         className="chat-message__image chat-message__image_quadruple"
                         src={url + file.uniqueName}
                         alt={file.alt ?? ''}
                         key={index}
                    />
                </div>
            ))}
        </>
    );
};

export default QuadrupleMessagePicture;
