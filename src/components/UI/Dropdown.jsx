import React from 'react';
import Overlay from "./Overlay";
import cn from "classnames";

const Dropdown = ({items, onClose, className = ''}) => {

    return (
        <>
            <div className={cn("dropdown", className)}>
                {items.map((item, index) => <button className="dropdown__item regular-text text-white" onClick={item.onClick} key={index}>{item.text}</button>)}
            </div>
            <Overlay onClick={onClose}/>
        </>
    );
};

export default Dropdown;
