import React from 'react';
import CrossButton from "../UI/buttons/CrossButton";
import cn from "classnames";

const ContactInfo = ({onClose, isModal = false, children}) => {

    return (
        <div className={cn("contact-info flex-grow-1", isModal && 'contact-info_modal')}>
            <div className="contact-info__top-line">
                <CrossButton onClick={onClose}/>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default ContactInfo;
