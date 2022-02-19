import React, {useContext} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import StatusSelect from "../inputs/StatusSelect";
import {useDispatch, useSelector} from "react-redux";
import {SocketInstance} from "../../layouts/Default";
import {changeStatus, logout} from "../../store/slices/auth";
import LockIcon from "../UI/icons/Lock";
import LogOutIcon from "../UI/icons/LogOut";
import ContactButton from "../UI/buttons/ContactButton";

const CurrentUserInfo = () => {
    const dispatch = useDispatch();

    const socket = useContext(SocketInstance);

    const {user} = useSelector(state => state.auth);

    const handleStatusChange = (status) => {
        socket.emit('change-status', {status});
        dispatch(changeStatus({status}));
    };

    const handleLogout = () => dispatch(logout());

    const buttons = [
        {text: 'Privacy and security', onClick: () => {}, icon: <LockIcon/>},
        {text: 'Log out', onClick: handleLogout, icon: <LogOutIcon/>},
    ];

    return (
        <>
            <div className="contact-info__content mt-4">
                <h2 className="last-text last-text_contact text-purple mb-3">Contact Info</h2>
                <AvatarButton user={user} large disabled/>
                <div className="last-text last-text_contact-alt text-purple mt-3">{user.name}</div>
                <div className="regular-text my-2">Sr. Visual Designer</div>
                <StatusSelect selectedStatus={user.status} onStatusChange={handleStatusChange}/>

            </div>
            {
                <div className="contact-info__buttons">
                    {buttons.map((button, key) => <ContactButton {...button} key={key}>{button.text}</ContactButton>)}
                </div>
            }
        </>
    );
};

export default CurrentUserInfo;
