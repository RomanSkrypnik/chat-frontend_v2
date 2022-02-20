import React, {useContext, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import StatusSelect from "../inputs/StatusSelect";
import {useDispatch, useSelector} from "react-redux";
import {SocketInstance} from "../../layouts/Default";
import {changeStatus, logout} from "../../store/slices/auth";
import LockIcon from "../UI/icons/Lock";
import LogOutIcon from "../UI/icons/LogOut";
import ContactButton from "../UI/buttons/ContactButton";
import PrivacySettingsForm from "./PrivacySettingsForm";
import ContactInfo from "../modals/ContactInfo";

const CurrentUserInfo = () => {
    const dispatch = useDispatch();

    const socket = useContext(SocketInstance);

    const {user} = useSelector(state => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [modalChildren, setModalChildren] = useState(null);

    const handleStatusChange = (status) => {
        socket.emit('change-status', {status});
        dispatch(changeStatus({status}));
    };

    const handleShowModal = (component) => {
        setShowModal(true);
        setModalChildren(component);
    };

    const handleLogout = () => dispatch(logout());

    const buttons = [
        {text: 'Privacy and security', icon: <LockIcon/>, component: <PrivacySettingsForm/>},
        {text: 'Log out', onClick: handleLogout, icon: <LogOutIcon/>},
    ];

    return (
        <>

            <h2 className="last-text last-text_contact text-purple mb-3">Contact Info</h2>
            <AvatarButton user={user} large disabled/>
            <div className="last-text last-text_contact-alt text-purple mt-2">{user.name}</div>
            <div className="regular-text my-2">Sr. Visual Designer</div>
            <StatusSelect selectedStatus={user.status} onStatusChange={handleStatusChange}/>

            {
                <div className="contact-info__buttons mt-3">
                    {buttons.map((button, key) =>

                        <ContactButton
                            {...button}
                            onClick={button.onClick ?? (() => handleShowModal(button.component))}
                            key={key}
                        >{button.text}
                        </ContactButton>
                    )}
                </div>
            }

            {
                showModal &&
                <ContactInfo isModal onClose={() => setShowModal(false)}>
                    {modalChildren}
                </ContactInfo>
            }
        </>
    );
};

export default CurrentUserInfo;
