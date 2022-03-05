import React, {useState} from 'react';
import ChatButton from "../UI/buttons/ChatButton";
import ClipIcon from "../UI/icons/Clip";
import MicrophoneIcon from "../UI/icons/Microphone";
import ChatSendButton from "../UI/buttons/ChatSendButton";
import {useForm} from "react-hook-form";
import DropZone from "../UI/DropZone";
import {Controller} from "react-hook-form";

const ChatTextInput = ({onSubmit}) => {
    const {handleSubmit, reset, control} = useForm();

    const [showDropZone, setShowDropZone] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);

    const handleOnSubmit = (data) => {
        onSubmit({...data, media: mediaFiles});
        
        setShowDropZone(false);
        reset({text: '', media: null});
    };

    return (
        <div className="chat-text-input d-flex position-relative">

            {
                showDropZone &&
                <DropZone
                    control={control}
                    onFileChange={(mediaFiles) => setMediaFiles(mediaFiles)}
                    onClose={() => setShowDropZone(false)}
                />
            }

            <div className="chat-text-input__buttons d-flex">
                <ChatButton onClick={() => setShowDropZone(!showDropZone)}>
                    <ClipIcon/>
                </ChatButton>
                <ChatButton>
                    <MicrophoneIcon/>
                </ChatButton>
            </div>

            <form className="chat-text-input__form w-100" onSubmit={handleSubmit(handleOnSubmit)}>
                <Controller
                    control={control}
                    name="text"
                    render={({field: {onChange, value}}) => (
                        <input type="text"
                               onChange={onChange}
                               value={value}
                               className="chat-text-input__input last-text last-text_alt"
                               placeholder="Type a new message..."
                        />
                    )
                    }
                />
                <ChatSendButton/>
            </form>

        </div>
    );
};

export default ChatTextInput;
