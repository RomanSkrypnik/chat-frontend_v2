import React from 'react';
import Sidebar from "../components/Sidebar";

const DefaultLayout = ({children}) => {
    return (
        <div className='d-flex'>
            <Sidebar/>
            <main>
                {children}
            </main>
        </div>
    );
};

export default DefaultLayout;
