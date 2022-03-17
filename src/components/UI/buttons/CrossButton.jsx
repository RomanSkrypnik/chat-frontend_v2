import React from 'react';
import cn from "classnames";

const CrossButton = ({light, onClick, className}) => {
    return (
        <button className={cn("cross-button", light && 'cross-button_light', className)} onClick={onClick}/>
    );
};

export default CrossButton;
