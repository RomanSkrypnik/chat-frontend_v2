import React, {useContext, useEffect, useState} from 'react';
import ChatButton from "../UI/buttons/ChatButton";
import ClipIcon from "../UI/icons/Clip";
import MicrophoneIcon from "../UI/icons/Microphone";
import ChatSendButton from "../UI/buttons/ChatSendButton";
import {useForm} from "react-hook-form";
import DropZone from "../UI/DropZone";
import {Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import validation from "../../validation";
import {useSelector} from "react-redux";
import StopButton from "../UI/icons/StopButton";
import useRecorder from "../../hooks/useRecorder";
import {useParams} from "react-router-dom";
import MessageService from "../../services/MessageService";
import {SocketInstance} from "../../layouts/Default";

const ChatTextInput = ({onSubmit}) => {

    const {friend} = useSelector(state => state.friend);

    const {handleSubmit, reset, resetField, control, formState} = useForm({
        mode: 'onChange',
        resolver: yupResolver(validation.home)
    });

    const {hash} = useParams();

    const socket = useContext(SocketInstance);

    const [audioFile, isRecording, startRecording, stopRecording] = useRecorder();

    const [showDropZone, setShowDropZone] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [disabledText, setDisabledText] = useState(null);

    useEffect(() => {
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

    useEffect(async () => {
        if (audioFile) {
            const fd = new FormData();

            fd.append('voice', audioFile);
            fd.append('hash', hash);

            const {data} = await MessageService.sendVoiceMessage(fd);

            socket.emit('send-text-message', {friend: friend.friend, message: data});
        }
    }, [audioFile]);

    const handleOnSubmit = (data) => {
        onSubmit({...data, media: mediaFiles});

        setShowDropZone(false);
        setMediaFiles([]);

        reset();
    };

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
                {
                    !isRecording ?
                        <ChatButton isDisabled={friend.friend && friend.friend.isBlocked} onClick={startRecording}>
                            <MicrophoneIcon/>
                        </ChatButton>
                        :
                        <ChatButton onClick={stopRecording}>
                            <StopButton/>
                        </ChatButton>
                }
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
