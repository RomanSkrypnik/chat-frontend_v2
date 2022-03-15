import React from 'react';

const RegularButton = ({onClick, type, disabled, children}) => {
    return (
        <button
            type={type}
            className="regular-button regular-text"
            onClick={onClick}
            disabled={disabled}
        >{children}</button>
    );
};

export default RegularButton;
