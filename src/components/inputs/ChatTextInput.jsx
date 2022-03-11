import React, {useEffect, useRef, useState} from 'react';
import ChatButton from "../UI/buttons/ChatButton";
import ClipIcon from "../UI/icons/Clip";
import MicrophoneIcon from "../UI/icons/Microphone";
import ChatSendButton from "../UI/buttons/ChatSendButton";
import {useForm} from "react-hook-form";
import DropZone from "../UI/DropZone";
import {Controller} from "react-hook-form";
import useRecorder from "../../hooks/useRecorder";
import MessageService from '../../services/MessageService';

const ChatTextInput = ({onSubmit}) => {

    const {handleSubmit, reset, control} = useForm();

    const [showDropZone, setShowDropZone] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);

    let [audioFile, isRecording, startRecording, stopRecording] = useRecorder();

    const handleOnSubmit = (data) => {
        setShowDropZone(false);
        onSubmit({...data, media: mediaFiles});
        reset();
    };

    const handleVoiceMessage = async () => {
        const fd = new FormData();

        fd.append('voice', audioFile);

        const {data} = await MessageService.sendVoiceMessage(fd);
    };

    const processVoiceMessage = () => {
        isRecording ? stopRecording() : startRecording();
    };

    useEffect(async () => {
        if (audioFile) {
            await handleVoiceMessage();
        }
    }, [audioFile]);

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
                <ChatButton onClick={processVoiceMessage}>
                    <MicrophoneIcon/>
                </ChatButton>
            </div>

            <form className="chat-text-input__form w-100" onSubmit={handleSubmit(handleOnSubmit)}>
                <Controller
                    control={control}
                    name="text"
                    defaultValue=""
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
