import React, {useEffect, useState} from 'react';
import {API_URL} from "../../http";
import SingleMessagePicture from "./SingleMessagePicture";
import DoubleMessagePicture from "./DoubleMessagePicture";
import TripleMessagePicture from "./TripleMessagePicture";
import QuadrupleMessagePicture from "./QuadrupleMessagePicture";
import QuintupleMessagePicture from "./QuintupleMessagePicture";

const PictureSwitch = ({files}) => {

    const [filesLength, setFilesLength] = useState(null);

    const url = `${API_URL}/img/messages/`;

    useEffect(() => {
        setFilesLength(files.length);
    }, []);

    const renderComponent = () => {
        switch (filesLength) {
            case 1:
                return <SingleMessagePicture name={files[0].uniqueName} url={url}/>;
            case 2:
                return <DoubleMessagePicture files={files} url={url}/>;
            case 3:
                return <TripleMessagePicture files={files} url={url}/>;
            case 4:
                return <QuadrupleMessagePicture files={files} url={url}/>;
            case 5:
                return <QuintupleMessagePicture files={files} url={url}/>;
        }
    };

    return (
        <>
            {renderComponent()}
        </>
    );
};

export default PictureSwitch;
