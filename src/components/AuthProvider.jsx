import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../store/slices/auth";

const AuthProvider = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loggedIn} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    useEffect(() => {
        if(!loggedIn) return navigate('/login');
    }, [loggedIn]);

    return (
        loggedIn && <>{children}</>
    );
};

export default AuthProvider;
