import React, {useEffect, useState} from 'react';
import CrossButton from "./buttons/CrossButton";
import cn from "classnames";

const Snackbar = ({title, message, color = 'default', onClose, onMouseOver}) => {
    const [isCursorPointed, setIsCursorPointed] = useState(true);

    useEffect(() => {
        !isCursorPointed && onMouseOver();
    }, [isCursorPointed]);

    const handleOnMouseOver = () => setIsCursorPointed(true);
    const handleOnMouseLeave = () => setIsCursorPointed(false);

    return (
        <div className={cn("snackbar regular-text", `snackbar_${color}`)}
             onMouseOver={handleOnMouseOver}
             onMouseLeave={handleOnMouseLeave}
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
