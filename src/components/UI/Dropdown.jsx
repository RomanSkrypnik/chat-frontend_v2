import React, {useEffect, useRef, useState} from 'react';
import Overlay from "./Overlay";

const Dropdown = ({items, onClose}) => {

    const ref = useRef(null);

    const [top, setTop] = useState(-1000);
    const [left, setLeft] = useState(-1000);

    useEffect(() => {
        if (ref) {
            const parent = ref.current.parentNode;

            const rect = parent.getBoundingClientRect();

            setTop(rect.bottom + 10);
            setLeft(rect.left - 100);
        }
    }, [ref]);

    return (
        <>
            <div className="dropdown" style={{top, left}} ref={ref}>
                {items.map((item, index) => <button className="dropdown__item regular-text text-white" onClick={item.onClick} key={index}>{item.text}</button>)}
            </div>
            <Overlay onClick={onClose}/>
        </>
    );
};

export default Dropdown;
