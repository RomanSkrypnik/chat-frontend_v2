import React, {useContext} from 'react';
import {ChatMessageInstance} from "../UI/ChatMessage";

const QuintupleMessagePicture = ({files, url}) => {

    const handlePhotoModalOpen = useContext(ChatMessageInstance);

    return (
        <>
            {files.map((file, index) => (
                    <img onClick={() => handlePhotoModalOpen(url + file.uniqueName)}
                         className="chat-message__image chat-message__image_quintuple"
                         src={url + file.uniqueName}
                         alt={file.alt ?? ''}
                         key={index}
                    />
                )
            )
            }
        </>
    );
};

export default QuintupleMessagePicture;
