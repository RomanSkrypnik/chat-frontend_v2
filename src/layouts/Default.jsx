import React, {useEffect} from 'react';
import Sidebar from "../components/Sidebar";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const DefaultLayout = ({children}) => {
    const {loggedIn} = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) return navigate('/login');
    }, [loggedIn]);

    return (
        <div className='d-flex'>
            <Sidebar/>
            <main className="flex-grow-1">
                {children}
            </main>
        </div>
    );
};

const withDefaultLayout = (Component) => {
    return (
        <DefaultLayout>
            <Component/>
        </DefaultLayout>
    );
};

export default withDefaultLayout;
