import React, {useCallback, useEffect, useRef} from 'react';
import ChatMessages from "./ChatMessages";
import {useDispatch, useSelector} from "react-redux";
import {fetchFriend, fetchOlderMessages} from "../../store/slices/friend";
import {useParams} from "react-router";

const HomeMessages = () => {

    const dispatch = useDispatch();

    const container = useRef(null);

    const {friend, offset} = useSelector(state => state.friend);
    const {user} = useSelector(state => state.auth);

    const {hash} = useParams();

    useEffect(() => {
        dispatch(fetchFriend(hash));
    }, []);

    useEffect(() => {
        if (friend.messages && friend.messages.length > 0) {
            const {length} = friend.messages;
            const {sender} = friend.messages[length - 1];

            if (offset < 40 || sender.hash === user.hash) {
                scrollToBottom();
            }
        }
    }, [friend.messages]);

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
        <>
            <div className="home__chat-wrapper d-flex flex-column flex-grow-1"
                 ref={container}
                 onScroll={handleScroll}>

                {friend.friend && <ChatMessages messages={friend.messages}/>}

            </div>
        </>
    );
};

export default HomeMessages;
