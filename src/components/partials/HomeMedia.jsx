import React, {useEffect, useState} from 'react';
import {MESSAGE_URL} from "../../http";
import Masonry from "react-masonry-css";

const HomeMedia = ({messages}) => {

    const [mediaFiles, setMediaFiles] = useState([]);

    useEffect(() => {
        assignMediaFiles();
    }, []);

    useEffect(() => {
        assignMediaFiles();
    }, [messages]);

    const assignMediaFiles = () => {
        const mediaFiles = messages.map(message => message.files).flat();
        setMediaFiles(mediaFiles);
    };

    return (
        <Masonry
            className="home-media"
            breakpointCols={3}
            columnClassName="my-masonry-grid_column"
        >
            {mediaFiles.length > 0 && mediaFiles.map(mediaFile => (
                <img
                    className="home-media__image"
                    src={MESSAGE_URL + mediaFile.uniqueName}
                    alt={mediaFile.alt ?? ''}
                />
            ))}
        </Masonry>
    );
};

export default HomeMedia;
