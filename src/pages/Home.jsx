import React, {useContext, useEffect, useRef, useState} from 'react';
import SwitchButton from "../components/UI/buttons/SwitchButton";
import ChatTextInput from "../components/inputs/ChatTextInput";
import SettingButton from "../components/UI/buttons/SettingButton";
import withDefaultLayout, {SocketInstance} from "../layouts/Default";
import {useParams} from "react-router-dom";
import {
    fetchMessages,
    fetchOlderMessages,
    resetState,
    setMessages
} from "../store/slices/message";
import ChatMessage from "../components/UI/ChatMessage";
import {useDispatch, useSelector} from "react-redux";
import ContactInfo from "../components/partials/ContactInfo";
import {fetchFriend} from "../store/slices/friend";

const Home = () => {
    const dispatch = useDispatch();
    const {hash} = useParams();
    const container = useRef(null);
    const socket = useContext(SocketInstance);

    const {messages, offset} = useSelector(state => state.message);
    const {friend} = useSelector(state => state.friend);
    const {user} = useSelector(state => state.auth);

    const [contactInfo, setContactInfo] = useState(false);

    useEffect(() => {
        dispatch(fetchMessages(hash));
        dispatch(fetchFriend(hash));
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setMessages([]));
            dispatch(resetState());
        }
    }, []);

    useEffect(() => {
        dispatch(resetState());
        dispatch(fetchMessages(hash));
        dispatch(fetchFriend(hash));
    }, [hash]);

    useEffect(() => {
        if (offset <= 40) scrollToBottom();
    }, [messages]);


    const scrollToBottom = () => {
        const scroll =
            container.current.scrollHeight -
            container.current.clientHeight;
        container.current.scrollTo(0, scroll);
    };

    const handleScroll = (e) => {
        if (e.currentTarget.scrollTop === 0) {
            dispatch(fetchOlderMessages(hash));
        }
    };

    const onSendMessage = (data) => {
        socket.emit('send-message', {hash, message: {text: data.message}});
    };

    return (
        <section className="home position-relative w-100 d-flex flex-column justify-content-end h-100">
            <div className="d-flex mx-4">
                <div className="flex-grow-1">
                    <SwitchButton/>
                    <div className="home__chat-wrapper d-flex flex-column flex-grow-1"
                         ref={container}
                         onScroll={handleScroll}>
                        {
                            messages.length > 0 && messages.map((message, index) => {
                                let circle = true;
                                let isDateDifferent = false;
                                if (index > 0) {
                                    circle = messages[index - 1].sender.hash !== message.sender.hash;
                                    const prevDate = new Date(messages[index - 1].createdAt).getDate();
                                    const currentDate = new Date(message.createdAt).getDate();
                                    isDateDifferent = prevDate !== currentDate;
                                }
                                const alignToRight = message.sender.hash === user.hash;
                                return <ChatMessage message={message} alignToRight={alignToRight} circle={circle}
                                                    timestamp={isDateDifferent} key={index}/>
                            })
                        }
                    </div>
                    <div className="d-flex align-items-center ps-4 pe-5 mt-5 mb-4">
                        <SettingButton onClick={() => setContactInfo(!contactInfo)}/>
                        <ChatTextInput onSubmit={onSendMessage}/>
                    </div>
                </div>
                {contactInfo && <ContactInfo user={friend} onClose={() => setContactInfo(!contactInfo)}/>}
            </div>
        </section>
    );
};

export default withDefaultLayout(Home);
