import React, {createContext, useState} from 'react';
import withDefaultLayout from "../layouts/Default";
import HomeMedia from "../components/partials/HomeMedia";
import HomeMessages from "../components/partials/HomeMessages";
import SwitchButton from "../components/UI/buttons/SwitchButton";
import {useSelector} from "react-redux";

export const HomeContext = createContext(null);

const Home = () => {

    const [homeMedia, setHomeMedia] = useState(false);

    const {friend} = useSelector(state => state.friend);

    const handleSwitch = () => {
        setHomeMedia(!homeMedia);
    };

    return (
        <HomeContext.Provider value={handleSwitch}>
            <div className="home">
                <div className="d-flex mx-4">
                    <div className="flex-grow-1">
                        <SwitchButton onClick={handleSwitch} value={homeMedia}/>
                        {homeMedia ? <HomeMedia messages={friend.messages}/> : <HomeMessages/>}
                    </div>
                </div>
            </div>
        </HomeContext.Provider>
    );
};

export default withDefaultLayout(Home);
