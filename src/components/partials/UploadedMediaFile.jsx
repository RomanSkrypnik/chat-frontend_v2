import React from 'react';
import {API_URL} from "../../http";

const UploadedMediaFile = ({pictureUrl, onClick}) => {

    return (
        <div className="uploaded-media-file me-3">
            <img src={`${API_URL}/img/messages/${pictureUrl}`} alt="" />
        </div>
    );
};

export default UploadedMediaFile;
