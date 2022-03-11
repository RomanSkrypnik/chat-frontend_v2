import React, {useContext, useState} from 'react';
import withDefaultLayout, {SocketInstance} from "../layouts/Default";
import HomeMedia from "../components/partials/HomeMedia";
import HomeMessages from "../components/partials/HomeMessages";
import SwitchButton from "../components/UI/buttons/SwitchButton";
import SettingButton from "../components/UI/buttons/SettingButton";
import ChatTextInput from "../components/inputs/ChatTextInput";
import MessageService from "../services/MessageService";
import ContactInfo from "../components/modals/ContactInfo";
import UserInfo from "../components/partials/UserInfo";
import {useSelector} from "react-redux";
import {useParams} from "react-router";


const Home = () => {

    const [homeMedia, setHomeMedia] = useState(false);

    const socket = useContext(SocketInstance);

    const [contactInfo, setContactInfo] = useState(false);

    const {friend} = useSelector(state => state.friend);

    const {hash} = useParams();

    const onSendMessage = async ({text, media}) => {

        if (!media || media.length < 1) {
            const {data} = await MessageService.sendTextMessage(text, hash);
            socket.emit('send-text-message', {message: data, friendHash: hash});
        } else {
            const fd = new FormData();

            media.forEach(mediaFile => fd.append('media', mediaFile));

            fd.append('text', text);
            fd.append('hash', hash);

            const {data} = await MessageService.sendMediaMessage(fd);
            socket.emit('send-media-message', {messages: data, friendHash: hash});
        }
    };

    const handleContactInfo = () => setContactInfo(!contactInfo);


    return (
        <>
            <div className="home">
                <div className="d-flex mx-4">
                    <div className="flex-grow-1">

                        <SwitchButton onClick={() => setHomeMedia(!homeMedia)}/>

                        {homeMedia ? <HomeMedia messages={friend.messages}/> : <HomeMessages/>}

                        {
                            !homeMedia &&
                            <div className="d-flex align-items-center ps-4 pe-5 mt-5 mb-4">
                                <SettingButton onClick={handleContactInfo}/>
                                <ChatTextInput onSubmit={onSendMessage}/>
                            </div>
                        }

                    </div>

                    {
                        contactInfo &&
                        <ContactInfo onClose={handleContactInfo}>
                            <UserInfo user={friend}/>
                        </ContactInfo>
                    }

                </div>
            </div>
        </>
    );
};

export default withDefaultLayout(Home);
