import React from 'react';
import CrossButton from "./buttons/CrossButton";
import cn from "classnames";

const Snackbar = ({title, message, color = 'default', onClose, onMouseOver}) => {

    return (
        <div className={cn("snackbar regular-text", `snackbar_${color}`)}
             onMouseOverCapture={onMouseOver}
             onMouseLeave={onMouseOver}
        >
            <div className="snackbar__inner">
                <div className="snackbar__title bold-text">{title}</div>
                <div className="snackbar__message regular-text">{message}</div>
                <CrossButton onClick={onClose} light className="cross-button_cross"/>
            </div>
        </div>
    );
};

export default Snackbar;
