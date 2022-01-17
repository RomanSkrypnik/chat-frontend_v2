import React, {useEffect} from 'react';
import Sidebar from "../components/Sidebar";
import AuthProvider from "../components/AuthProvider";

const DefaultLayout = ({children}) => {

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
        <AuthProvider>
            <DefaultLayout>
                <Component/>
            </DefaultLayout>
        </AuthProvider>
    );
};

export default withDefaultLayout;
