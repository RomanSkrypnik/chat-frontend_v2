import React from 'react';

const Overlay = ({children, onClick}) => {
    return (
        <div className="overlay" onClick={onClick}>{children}</div>
    );
};

export default Overlay;
