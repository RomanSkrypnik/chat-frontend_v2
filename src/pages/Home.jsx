import React, {useContext, useEffect, useRef, useState} from 'react';
import SwitchButton from "../components/UI/buttons/SwitchButton";
import ChatTextInput from "../components/inputs/ChatTextInput";
import SettingButton from "../components/UI/buttons/SettingButton";
import withDefaultLayout, {SocketInstance} from "../layouts/Default";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ContactInfo from "../components/modals/ContactInfo";
import {fetchOlderMessages, setFriend} from "../store/slices/friend";
import UserInfo from "../components/partials/UserInfo";
import ChatMessages from "../components/partials/ChatMessages";

const Home = () => {
    const dispatch = useDispatch();

    const {hash} = useParams();

    const container = useRef(null);

    const socket = useContext(SocketInstance);

    const {friend, isLoaded} = useSelector(state => state.friend);

    const [contactInfo, setContactInfo] = useState(false);

    useEffect(() => {
        init();
    }, [isLoaded]);

    useEffect(() => {
        hash && init();
    }, [hash]);

    useEffect(() => {
        if (friend && friend.messages) {
            friend.messages.length <= 40 && scrollToBottom();
        }
    }, [friend]);

    const init = () => dispatch(setFriend(hash));

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

    const handleContactInfo = () => setContactInfo(!contactInfo);

    const onSendMessage = (data) => {
        socket.emit('send-message', {hash, message: {text: data.message}});
    };

    return (
        <section className="home">
            <div className="d-flex mx-4">
                <div className="flex-grow-1">
                    <SwitchButton/>
                    <div className="home__chat-wrapper d-flex flex-column flex-grow-1"
                         ref={container}
                         onScroll={handleScroll}>
                        {friend && <ChatMessages messages={friend.messages}/>}
                    </div>
                    <div className="d-flex align-items-center ps-4 pe-5 mt-5 mb-4">
                        <SettingButton onClick={handleContactInfo}/>
                        <ChatTextInput onSubmit={onSendMessage}/>
                    </div>
                </div>
                {
                    contactInfo &&
                    <ContactInfo onClose={handleContactInfo}>
                        {<UserInfo user={friend.friend}/>}
                    </ContactInfo>
                }
            </div>
        </section>
    );
};

export default withDefaultLayout(Home);
