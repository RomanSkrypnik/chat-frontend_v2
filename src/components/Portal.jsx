import React, {useEffect, useState} from 'react';
import * as ReactDOM from "react-dom";

const Portal = ({children}) => {
    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        const activeOverlay = document.getElementsByClassName("overlay_black");

        document.body.appendChild(container);

        container.classList.add('overlay', activeOverlay.length === 0 && 'overlay_black', 'position-absolute');

        return () => {
            document.body.removeChild(container);
        }

    }, []);

    return ReactDOM.createPortal(children, container);
};

export default Portal;
