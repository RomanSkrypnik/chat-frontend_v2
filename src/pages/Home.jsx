import React, {useState} from 'react';
import withDefaultLayout from "../layouts/Default";
import HomeMedia from "../components/partials/HomeMedia";
import HomeMessages from "../components/partials/HomeMessages";
import SwitchButton from "../components/UI/buttons/SwitchButton";
import {useSelector} from "react-redux";


const Home = () => {

    const [homeMedia, setHomeMedia] = useState(false);

    const {friend} = useSelector(state => state.friend);

    return (
        <>
            <div className="home">
                <div className="d-flex mx-4">
                    <div className="flex-grow-1">
                        <SwitchButton onClick={() => setHomeMedia(!homeMedia)}/>
                        {homeMedia ? <HomeMedia messages={friend.messages}/> : <HomeMessages/>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default withDefaultLayout(Home);
