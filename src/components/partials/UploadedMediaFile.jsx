import React from 'react';
import {API_URL} from "../../http";

const UploadedMediaFile = ({uniqueName, onClick}) => {

    const handleOnClick = () => onClick(uniqueName);

    return (
        <div className="uploaded-media-file me-3" onClick={handleOnClick}>
            <img src={`${API_URL}/img/messages/${uniqueName}`} alt=""/>
        </div>
    );
};

export default UploadedMediaFile;
