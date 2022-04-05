import React, {useState} from 'react';
import {blockFriend, clearChat, muteFriend, unblockFriend, unmuteFriend} from "../../store/slices/friend";
import Circle from "../UI/icons/Circle";
import PurpleArrow from "../UI/icons/PurpleArrow";
import ProhibitionSign from "../UI/icons/ProhibitionSign";
import Urn from "../UI/icons/Urn";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import FlatButton from "../UI/buttons/FlatButton";
import ContactButton from "../UI/buttons/ContactButton";
import Unlocked from "../UI/icons/Unlocked";
import ContactInfo from "../modals/ContactInfo";
import Prompt from "./Prompt";

const UserInfoButtons = () => {

    const [showPrompt, setShowPrompt] = useState(false);

    const dispatch = useDispatch();

    const {hash} = useParams();

    const {friend} = useSelector(state => state.friend);

    const handleMute = () => {
        friend.friend.isMuted ? dispatch(unmuteFriend(hash)) : dispatch(muteFriend(hash))
    };

    const handleChatDelete = answer => {
        answer && dispatch(clearChat(hash));
        setShowPrompt(false);
    };

    const flatButtons = [
        {
            text: 'Mute notifications', onClick: handleMute,
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
        !friend.friend.isBlockedByMe ?
            {text: 'Block Contact', onClick: () => dispatch(blockFriend(hash)), icon: <ProhibitionSign/>}
            :
            {text: 'Unblock Contact', onClick: () => dispatch(unblockFriend(hash)), icon: <Unlocked/>},
        {text: 'Delete Chat', onClick: () => setShowPrompt(true), icon: <Urn/>},
    ];

    return (
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

            {
                showPrompt && <ContactInfo isModal title="Confirm action" onClose={() => setShowPrompt(false)}>
                    <Prompt question="Do you want to delete all chat messages" onClick={handleChatDelete}/>
                </ContactInfo>
            }
        </div>
    );
};

export default UserInfoButtons;
