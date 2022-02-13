import React, {useEffect, useState} from 'react';
import * as ReactDOM from "react-dom";

const Portal = ({children}) => {
    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(container);
        container.classList.add('overlay', 'overlay_black', 'position-absolute');

        return () => {
            document.body.removeChild(container);
        }

    }, []);

    return ReactDOM.createPortal(children, container);
};

export default Portal;
