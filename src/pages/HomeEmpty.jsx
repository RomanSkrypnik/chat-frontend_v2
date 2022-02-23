import React from 'react';
import withDefaultLayout from "../layouts/Default";

const HomeEmpty = () => {
    return (
        <section className="home position-relative w-100 d-flex flex-column justify-content-end h-100">
            <div className="home__placeholder regular-text text-white">Select a chat to start messaging</div>
        </section>
    );
};

export default withDefaultLayout(HomeEmpty);
