import React from 'react';

const RegularButton = ({onClick, type, children}) => {
    return (
        <button type={type} className="regular-button regular-text" onClick={onClick}>{children}</button>
    );
};

export default RegularButton;
