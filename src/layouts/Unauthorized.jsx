import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const Unauthorized = ({children}) => {
    const {loggedIn} = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) return navigate('/');
    }, [loggedIn]);

    return (
        <div>
            {children}
        </div>
    );
};

const withUnauthorizedLayout = (Component) => {
    return (
        <Unauthorized>
            <Component/>
        </Unauthorized>
    );
};

export default withUnauthorizedLayout;
