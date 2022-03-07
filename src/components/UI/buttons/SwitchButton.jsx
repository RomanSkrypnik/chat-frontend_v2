import React, {useState} from 'react';
import cn from "classnames";

const SwitchButton = ({onClick}) => {

    const [activeBtn, setActiveBtn] = useState(false);

    const handleOnClick = () => {
        setActiveBtn(!activeBtn);
        onClick();
    };

    return (
        <div className="switch-button d-flex last-text last-text_alt">
            <button className={cn("switch-button__button w-50", !activeBtn && 'switch-button__button_active')} onClick={handleOnClick}>Chat</button>
            <button className={cn("switch-button__button w-50", activeBtn && 'switch-button__button_active')} onClick={handleOnClick}>Media</button>
        </div>
    );
};

export default SwitchButton;
