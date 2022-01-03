import React from 'react';

const SwitchButton = () => {
    return (
        <div className="switch-button d-flex last-text last-text_alt">
            <button className="switch-button__button switch-button__button_active w-50">Chat</button>
            <button className="switch-button__button w-50">Media</button>
        </div>
    );
};

export default SwitchButton;
