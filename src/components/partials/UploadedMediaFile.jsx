import React, {useEffect, useState} from 'react';

const UploadedMediaFile = ({file, onClick}) => {
    const [url, setUrl] = useState();

    useEffect(() => {
        const url = URL.createObjectURL(file);
        setUrl(url);
    }, []);

    return (
        <div className="uploaded-media-file me-3" onClick={() => onClick(file.name)}>
            <img src={url} alt=""/>
        </div>
    );
};

export default UploadedMediaFile;
