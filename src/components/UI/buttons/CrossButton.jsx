import React from 'react';
import cn from "classnames";

const CrossButton = ({light, onClick, className}) => {
    return (
        <button className={cn("cross-button", className, light && 'cross-button_light')} onClick={onClick}/>
    );
};

export default CrossButton;
