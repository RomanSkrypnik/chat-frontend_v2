import React from 'react';


const Unauthorized = ({children}) => {
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
