import React, {useEffect, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import StatusSelect from "../inputs/StatusSelect";
import ContactInfoMedia from "./ContactInfoMedia";
import FlatButton from "../UI/buttons/FlatButton";
import Circle from "../UI/icons/Circle";
import PurpleArrow from "../UI/icons/PurpleArrow";
import ContactButton from "../UI/buttons/ContactButton";
import ProhibitionSign from "../UI/icons/ProhibitionSign";
import Urn from "../UI/icons/Urn";
import {useDispatch, useSelector} from "react-redux";
import {muteFriend, unmuteFriend} from "../../store/slices/friend";
import {useParams} from "react-router-dom";

const UserInfo = ({user}) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [overallLength, setOverallLength] = useState(null);

    const {friend} = useSelector(state => state.friend);

    const {hash} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        init();
    }, [user.messages]);

    const init = () => {
        let {messages} = user;

        const copyMessages = [...messages].reverse();

        const mediaFiles = copyMessages.flatMap(message => message.files);

        setMediaFiles(mediaFiles);
    };

    const handleMuteFriend = () => {
        friend.friend.isMuted ? dispatch(unmuteFriend(hash)) : dispatch(muteFriend(hash))
    };

    const flatButtons = [
        {
            text: 'Mute notifications', onClick: handleMuteFriend,
            icon: <Circle isActive={friend.friend.isMuted}/>
        },
        {
            text: 'Starred Messages', onClick: () => {
                console.log('clicked')
            },
            icon: <PurpleArrow/>
        },
    ];

    const buttons = [
        {text: 'Block Contact', onClick: () => console.log('clicked'), icon: <ProhibitionSign/>},
        {text: 'Delete Chat', onClick: () => console.log('clicked'), icon: <Urn/>},
    ];


    return (
        <div className="user-info mt-4">

            <div className="user-info__upper">
                <h2 className="last-text last-text_contact text-purple mb-3">Contact Info</h2>
                <AvatarButton user={user.friend} large disabled/>
                <div className="last-text last-text_contact-alt text-purple mt-3">{user.friend.name}</div>
                <div className="regular-text my-2">Sr. Visual Designer</div>
                <StatusSelect selectedStatus={user.friend.status} disabled/>

                {mediaFiles.length > 0 && <ContactInfoMedia mediaFiles={mediaFiles} overallLength={overallLength}/>}
            </div>

            <div className="user-info__bottom">
                <div className="mt-4 w-100">
                    {
                        flatButtons.map((button, index) => (
                            <FlatButton
                                onClick={button.onClick}
                                key={index}
                                icon={button.icon}
                            >{button.text}</FlatButton>)
                        )
                    }
                </div>

                <div className="mt-4 w-100">
                    {
                        buttons.map((button, index) => (
                            <ContactButton onClick={button.onClick}
                                           icon={button.icon}
                                           type="button"
                                           key={index}>
                                {button.text}</ContactButton>))
                    }
                </div>
            </div>

        </div>
    );
};

export default UserInfo;
