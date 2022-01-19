import React, {useContext, useEffect, useRef} from 'react';
import SwitchButton from "../components/UI/buttons/SwitchButton";
import ChatTextInput from "../components/inputs/ChatTextInput";
import SettingButton from "../components/UI/buttons/SettingButton";
import withDefaultLayout, {SocketInstance} from "../layouts/Default";
import {useParams} from "react-router-dom";
import {fetchMessages, fetchOlderMessages, sendMessage} from "../store/slices/message";
import ChatMessage from "../components/UI/ChatMessage";
import {useDispatch, useSelector} from "react-redux";


const Home = () => {
    const dispatch = useDispatch();
    const {hash} = useParams();
    const container = useRef(null);
    const socket = useContext(SocketInstance);

    const {messages} = useSelector(state => state.message);
    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchMessages(hash));
    }, []);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        const scroll =
            container.current.scrollHeight -
            container.current.clientHeight;
        container.current.scrollTo(0, scroll);
    }

    const handleScroll = (e) => {
        if (e.currentTarget.scrollTop === 0) {
            dispatch(fetchOlderMessages(hash));
        }
    }

    const onSubmit = (data) => {
        dispatch(sendMessage({hash, message: {text: data.message}}));
        socket.emit('send-message', {hash, message: {text: data.message}});
    }

    return (
        <section className="home position-relative w-100 d-flex flex-column justify-content-end h-100">
            <SwitchButton/>
            <div className="home__chat-wrapper d-flex flex-column" ref={container} onScroll={handleScroll}>
                {
                    messages.map((message, index) => {
                        let circle = true;
                        if (index > 0) circle = messages[index - 1].sender.hash !== message.sender.hash;
                        const alignToRight = message.sender.hash === user.hash;
                        return <ChatMessage message={message} alignToRight={alignToRight} key={index} circle={circle}/>
                    })
                }
            </div>
            <div className="d-flex align-items-center ps-4 pe-5 mt-5 mb-4">
                <SettingButton/>
                <ChatTextInput onSubmit={onSubmit}/>
            </div>
        </section>
    );
};

export default withDefaultLayout(Home);
