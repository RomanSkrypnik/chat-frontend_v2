import React, {createContext, useEffect, useState} from 'react';
import Snackbar from "../UI/Snackbar";
import useDebounce from "../../hooks/useDebounce";

export const SnackBarContext = createContext(null);

const SnackbarProvider = ({children}) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('');
    const [show, setShow] = useState(false);
    const [currTimeout, setCurrTimeout] = useState(0);

    const defineTimeout = () => {
        setShow(false);
    };

    const debouncedTimeout = useDebounce(defineTimeout, currTimeout);

    const handleSnackbar = ({title, message, color, timeout = 1000}) => {
        setTitle(title);
        setMessage(message);
        setColor(color);
        setShow(true);
        setCurrTimeout(timeout);
    };


    return (
        <SnackBarContext.Provider value={handleSnackbar}>
            {children}
            {show && <Snackbar
                title={title}
                message={message}
                color={color}
                onClose={() => setShow(false)}
                onMouseOver={debouncedTimeout}
            />}
        </SnackBarContext.Provider>
    );
};

export default SnackbarProvider;
