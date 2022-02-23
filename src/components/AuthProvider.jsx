import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const AuthProvider = ({children}) => {
    const navigate = useNavigate();

    const {loggedIn} = useSelector(state => state.auth);

    useEffect(() => {
        if(!loggedIn) return navigate('/login');
    }, [loggedIn]);

    return (loggedIn && <>{children}</>);
};

export default AuthProvider;
