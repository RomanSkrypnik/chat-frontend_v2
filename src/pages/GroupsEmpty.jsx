import React from 'react';
import withDefaultLayout from "../layouts/Default";

const GroupsEmpty = () => {
    return (
        <section className="home position-relative w-100 d-flex flex-column justify-content-end h-100">
            <div className="home__placeholder regular-text text-white">Select a group to start messaging</div>
        </section>
    );
};

export default withDefaultLayout(GroupsEmpty);
