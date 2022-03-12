import React from 'react';

const FlatButton = ({onClick, icon, children}) => {
    return (
        <button className="flat-button last-text last-text_alt text-purple" onClick={onClick}>{children}{icon}</button>
    );
};

export default FlatButton;
