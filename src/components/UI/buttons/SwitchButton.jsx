import React, {useState} from 'react';
import cn from "classnames";

const SwitchButton = ({onClick, value}) => {

    return (
        <div className="switch-button d-flex last-text last-text_alt">
            <button className={cn("switch-button__button", !value && 'switch-button__button_active')} onClick={onClick}>Chat</button>
            <button className={cn("switch-button__button", value && 'switch-button__button_active')} onClick={onClick}>Media</button>
        </div>
    );
};

export default SwitchButton;
