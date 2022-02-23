import React, {useContext} from 'react';
import ChatButton from "../UI/buttons/ChatButton";
import ClipIcon from "../UI/icons/Clip";
import MicrophoneIcon from "../UI/icons/Microphone";
import ChatSendButton from "../UI/buttons/ChatSendButton";
import {useForm} from "react-hook-form";

const ChatTextInput = ({onSubmit}) => {
    const { register, handleSubmit, reset } = useForm();

    const handleOnSubmit = (data) => {
        onSubmit(data);
        reset();
    }

    return (
        <div className="chat-text-input d-flex position-relative">
            <div className="chat-text-input__buttons d-flex">
                <ChatButton>
                    <ClipIcon/>
                </ChatButton>
                <ChatButton>
                    <MicrophoneIcon/>
                </ChatButton>
            </div>
            <form className="chat-text-input__form w-100" onSubmit={handleSubmit(handleOnSubmit)}>
                <input {...register("message")} type="text" className="chat-text-input__input last-text last-text_alt" placeholder="Type a new message..."/>
                <ChatSendButton/>
            </form>
        </div>
    );
};

export default ChatTextInput;
