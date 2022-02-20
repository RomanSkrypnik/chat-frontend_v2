import React from 'react';
import CrossButton from "../UI/buttons/CrossButton";
import cn from "classnames";
import Portal from "../Portal";

const ContactInfo = ({onClose, isModal = false, children}) => {

    return (
        isModal ?
            <Portal>
                <div className="contact-info contact-info_modal flex-grow-1">
                    <div className="contact-info__top-line">
                        <CrossButton onClick={onClose}/>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </Portal>
            :
            <div className={cn("contact-info flex-grow-1")}>
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
