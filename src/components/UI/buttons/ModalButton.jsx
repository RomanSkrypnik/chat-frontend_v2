import React from 'react';
import cn from "classnames";

const ModalButton = ({onClick, className, children}) => {
    return (
        <div className={cn("modal-button", className)} onClick={onClick}>
            {children}
        </div>
    );
};

export default ModalButton;
