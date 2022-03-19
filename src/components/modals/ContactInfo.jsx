import React from 'react';
import CrossButton from "../UI/buttons/CrossButton";
import Portal from "../Portal";
import cn from "classnames";

const ContactInfo = ({onClose, isModal = false, extended = false, title, children}) => {

    return (
        isModal ?
            <Portal>
                <div className={cn("contact-info contact-info_modal", extended && 'contact-info_extended')}>
                    <div className="contact-info__top-line">
                        <CrossButton onClick={onClose}/>
                    </div>
                    <h2 className="last-text last-text_contact text-purple text-center mb-3 mt-2">{title}</h2>
                    <div className="contact-info__content mt-2">
                        {children}
                    </div>
                </div>
            </Portal>
            :
            <div className="contact-info my-4">
                <div className="contact-info__top-line">
                    <CrossButton onClick={onClose}/>
                </div>
                <div className="contact-info__content mt-2">
                    {children}
                </div>
            </div>
    );
};

export default ContactInfo;
