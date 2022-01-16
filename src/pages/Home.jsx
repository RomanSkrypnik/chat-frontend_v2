import React from 'react';
import SwitchButton from "../components/UI/buttons/SwitchButton";
import ChatScroll from "../components/partials/ChatScroll";
import ChatTextInput from "../components/inputs/ChatTextInput";
import SettingButton from "../components/UI/buttons/SettingButton";
import withDefaultLayout from "../layouts/Default";

const Home = () => {

    return (
        <section className="home position-relative w-100 d-flex flex-column justify-content-end h-100">
            <SwitchButton/>
            <ChatScroll/>
            <div className="d-flex align-items-center ps-4 pe-5 mt-5 mb-4">
                <SettingButton/>
                <ChatTextInput/>
            </div>
        </section>
    );
};

export default withDefaultLayout(Home);
