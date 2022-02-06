import React from 'react';

const Dropdown = ({items}) => {

    return (
            <div className="dropdown">
                {items.map((item, index) => <button className="dropdown__item regular-text text-white" onClick={item.onClick} key={index}>{item.text}</button>)}
            </div>
    );
};

export default Dropdown;
