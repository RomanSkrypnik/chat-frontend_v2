import React, {useEffect, useState} from 'react';
import ChatButton from "../UI/buttons/ChatButton";
import ClipIcon from "../UI/icons/Clip";
import MicrophoneIcon from "../UI/icons/Microphone";
import ChatSendButton from "../UI/buttons/ChatSendButton";
import {useForm} from "react-hook-form";
import DropZone from "../UI/DropZone";
import {Controller} from "react-hook-form";
import useRecorder from "../../hooks/useRecorder";
import MessageService from '../../services/MessageService';
import {yupResolver} from "@hookform/resolvers/yup";
import validation from "../../validation";
import {useSelector} from "react-redux";

const ChatTextInput = ({onSubmit}) => {

    const [disabledText, setDisabledText] = useState(null);

    const {friend} = useSelector(state => state.friend);

    const {handleSubmit, reset, resetField, control, formState} = useForm({
        mode: 'onChange',
        resolver: yupResolver(validation.home)
    });

    const [showDropZone, setShowDropZone] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);

    let [audioFile, isRecording, startRecording, stopRecording] = useRecorder();

    useEffect(() => {
        console.log(friend);
        if (friend.friend) {
            if (friend.friend.isBlockedByMe) {
                setDisabledText('You have blocked this user');
            } else if (friend.friend.isBlocked) {
                setDisabledText('You have been blocked by this user');
            } else {
                setDisabledText(null);
            }
        }
    }, [friend.friend]);

    const handleOnSubmit = (data) => {
        onSubmit({...data, media: mediaFiles});

        setShowDropZone(false);
        setMediaFiles([]);

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
                    resetField={resetField}
                    control={control}
                    onFileChange={(mediaFiles) => setMediaFiles(mediaFiles)}
                    onClose={() => setShowDropZone(false)}
                />
            }

            <div className="chat-text-input__buttons d-flex">
                <ChatButton isDisabled={friend.friend && friend.friend.isBlocked}
                            onClick={() => setShowDropZone(!showDropZone)}>
                    <ClipIcon/>
                </ChatButton>
                <ChatButton isDisabled={friend.friend && friend.friend.isBlocked} onClick={processVoiceMessage}>
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
                               disabled={friend.friend && friend.friend.isBlocked}
                               onChange={onChange}
                               value={value}
                               className="chat-text-input__input last-text last-text_alt"
                               placeholder={disabledText ? disabledText : "Type a new message..."}
                        />
                    )}
                />

                <ChatSendButton disabled={!formState.isValid}/>
            </form>
        </div>
    );
};

export default ChatTextInput;
