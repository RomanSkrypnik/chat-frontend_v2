import React, {useContext, useEffect, useRef, useState} from 'react';
import SwitchButton from "../components/UI/buttons/SwitchButton";
import ChatTextInput from "../components/inputs/ChatTextInput";
import SettingButton from "../components/UI/buttons/SettingButton";
import withDefaultLayout, {SocketInstance} from "../layouts/Default";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ContactInfo from "../components/modals/ContactInfo";
import {fetchFriend, fetchOlderMessages} from "../store/slices/friend";
import UserInfo from "../components/partials/UserInfo";
import ChatMessages from "../components/partials/ChatMessages";
import MessageService from "../services/MessageService";


const Home = () => {
    const dispatch = useDispatch();

    const {hash} = useParams();

    const container = useRef(null);

    const socket = useContext(SocketInstance);

    const [contactInfo, setContactInfo] = useState(false);

    const {friend} = useSelector(state => state.friend);

    useEffect(() => {
        dispatch(fetchFriend(hash));
    }, []);

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

    const onSendMessage = async ({text, media}) => {
        const fd = new FormData();

        media.forEach(mediaFile => fd.append('media', mediaFile));

        fd.append('text', text);
        fd.append('hash', hash);

        const {data} = await MessageService.sendMessage(fd);

        socket.emit('send-message', {messageId: data.id, friendHash: hash});
    };

    return (
        <section className="home">
            <div className="d-flex mx-4">
                <div className="flex-grow-1">
                    <SwitchButton/>
                    <div className="home__chat-wrapper d-flex flex-column flex-grow-1"
                         ref={container}
                         onScroll={handleScroll}>
                        {friend.friend && <ChatMessages messages={friend.messages}/>}
                    </div>
                    <div className="d-flex align-items-center ps-4 pe-5 mt-5 mb-4">
                        <SettingButton onClick={handleContactInfo}/>
                        <ChatTextInput onSubmit={onSendMessage}/>
                    </div>
                </div>
                {
                    contactInfo &&
                    <ContactInfo onClose={handleContactInfo}>
                        {<UserInfo user={friend}/>}
                    </ContactInfo>
                }
            </div>
        </section>
    );
};

export default withDefaultLayout(Home);
