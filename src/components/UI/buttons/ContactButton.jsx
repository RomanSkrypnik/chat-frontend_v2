import React from 'react';

const ContactButton = ({onClick, icon, children}) => {
    return (
        <button onClick={onClick} className="contact-button last-text last-text_alt text-start">{icon}{children}</button>
    );
};

export default ContactButton;
