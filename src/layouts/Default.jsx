import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import AuthProvider from "../components/AuthProvider";
import io from "socket.io-client";
import {useDispatch} from "react-redux";
import {addFriend, addNewMessages, changeFriendStatus, setMessageIsRead} from "../store/slices/friend";
import {addNewMessage} from "../store/slices/friend";

export const SocketInstance = React.createContext(null);

const DefaultLayout = ({children}) => {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!socket) {
            setSocket(io('http://localhost:5000/', {auth: {token: `Bearer ${token}`}}));
        }
    }, []);

    useEffect(() => {
        return () => socket && socket.close();
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('new-text-message', (messageData) => {
                dispatch(addFriend(messageData));
                dispatch(addNewMessage(messageData));
            });

            socket.on('new-media-message', (messageData) => {
                dispatch(addFriend(messageData));
                dispatch(addNewMessages(messageData));
            });

            socket.on('new-status', ({status, hash}) => {
                dispatch(changeFriendStatus({status, hash}));
            });

            socket.on('message-is-read', ({id, hash}) => {
                dispatch(setMessageIsRead({id, hash}));
            });

        }
    }, [socket]);

    return (
        <SocketInstance.Provider value={socket}>
            <div className='d-flex min-vh-100'>
                <Sidebar/>
                <main className="flex-grow-1">
                    {children}
                </main>
            </div>
        </SocketInstance.Provider>
    );
};

const withDefaultLayout = (Component) => {
    return (
        <AuthProvider>
            <DefaultLayout>
                <Component/>
            </DefaultLayout>
        </AuthProvider>
    );
};

export default withDefaultLayout;
