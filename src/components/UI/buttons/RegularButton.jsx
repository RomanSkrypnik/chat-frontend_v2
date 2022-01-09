import React from 'react';

const RegularButton = ({text, type, onClick}) => {
    return (
        <button type={type} className="regular-button regular-text" onClick={onClick}>{text}</button>
    );
};

export default RegularButton;
