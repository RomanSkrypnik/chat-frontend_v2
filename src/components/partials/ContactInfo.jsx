import React from 'react';
import CrossButton from "../UI/buttons/CrossButton";
import AvatarButton from "../UI/buttons/AvatarButton";
import StatusSelect from "../inputs/StatusSelect";
import cn from "classnames";
import {useSelector} from "react-redux";
import ContactButton from "../UI/buttons/ContactButton";

const ContactInfo = ({user, alignToCenter = false, onStatusChange, onClose, buttons, disabledAvatar = true}) => {
    const auth = useSelector(state => state.auth);

    return (
        <div className={cn("contact-info flex-grow-1", alignToCenter ? 'contact-info_center' : 'mb-4')}>
            <div className="contact-info__top-line">
                <CrossButton onClick={onClose}/>
            </div>
            <div className="contact-info__content d-flex flex-column align-items-center mt-4">
                <h2 className="last-text last-text_contact text-purple mb-3">Contact Info</h2>
                <AvatarButton user={user} large disabled={disabledAvatar}/>
                <div className="last-text last-text_contact-alt text-purple mt-3">{user.name}</div>
                <div className="regular-text my-2">Sr. Visual Designer</div>
                <StatusSelect selectedStatus={user.status}
                              onStatusChange={onStatusChange}
                              disabled={auth.user.name !== user.name}
                />
            </div>
            {
                buttons &&
                <div className="contact-info__buttons">
                    {buttons.map((button, key) => <ContactButton {...button} key={key}>{button.text}</ContactButton>)}
                </div>
            }
        </div>
    );
};

export default ContactInfo;
