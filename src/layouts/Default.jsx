import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import AuthProvider from "../components/AuthProvider";
import io from "socket.io-client";
import {addMessage} from "../store/slices/message";
import {useDispatch} from "react-redux";
import {changeFriendStatus} from "../store/slices/friend";
import {changeFriendLastMessage} from "../store/slices/friend";

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
            socket.on('new-message', (message) => {
                const {lastMessage} = message;

                dispatch(addMessage(lastMessage));
                dispatch(changeFriendLastMessage(message));
            });

            socket.on('new-status', ({status, hash}) => {
                dispatch(changeFriendStatus({status, hash}));
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
