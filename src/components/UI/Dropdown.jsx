import React from 'react';
import Overlay from "./Overlay";

const Dropdown = ({items, onClose}) => {

    return (
        <>
            <div className="dropdown">
                {items.map((item, index) => <button className="dropdown__item regular-text text-white" onClick={item.onClick} key={index}>{item.text}</button>)}
            </div>
            <Overlay onClick={onClose}/>
        </>
    );
};

export default Dropdown;
