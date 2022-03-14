import React, {useEffect, useRef} from 'react';
import ChatMessage from "../UI/ChatMessage";
import {useDispatch, useSelector} from "react-redux";
import {fetchOlderMessages} from "../../store/slices/friend";
import {useParams} from "react-router";

const ChatMessages = ({messages}) => {

    const {user} = useSelector(state => state.auth);
    const {friend, offset} = useSelector(state => state.friend);

    const dispatch = useDispatch();

    const {hash} = useParams();

    const container = useRef(null);

    useEffect(() => {
        if (messages && messages.length > 0) {
            const {length} = friend.messages;
            const {sender} = friend.messages[length - 1];

            if (offset <= 40 || sender.hash === user.hash) {
                scrollToBottom();
            }
        }
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

    return (
        <div className="chat-messages"
             ref={container}
             onScroll={handleScroll}>
            {
                messages && messages.map((message, index) => {
                    let circle = true;
                    let isDateDifferent = false;

                    if (index > 0) {
                        const prevDate = new Date(messages[index - 1].createdAt).getDate();
                        const currentDate = new Date(message.createdAt).getDate();

                        isDateDifferent = prevDate !== currentDate;
                        circle = messages[index - 1].sender.hash !== message.sender.hash;
                    }

                    const alignToRight = message.sender.hash === user.hash;

                    return <ChatMessage
                        message={message}
                        alignToRight={alignToRight}
                        circle={circle}
                        timestamp={isDateDifferent}
                        key={message.id}
                    />
                })
            }
        </div>
    );
};

export default ChatMessages;
