import React, {useEffect, useState} from 'react';
import {MESSAGE_URL} from "../../http";
import Masonry from "react-masonry-css";
import PhotoModal from "../modals/PhotoModal";

const HomeMedia = ({messages}) => {

    const [mediaFiles, setMediaFiles] = useState([]);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [photoSrc, setPhotoSrc] = useState(null);

    useEffect(() => {
        assignMediaFiles();
    }, []);

    useEffect(() => {
        assignMediaFiles();
    }, [messages]);

    const assignMediaFiles = () => {
        const mediaFiles = messages.flatMap(message => message.files);
        setMediaFiles(mediaFiles);
    };

    const handleModalOpen = src => {
        setShowPhotoModal(true);
        setPhotoSrc(src);
    };

    return (
        <>

            <Masonry
                className="home-media"
                breakpointCols={3}
                columnClassName="d-flex flex-column"
            >
                {mediaFiles.length > 0 && mediaFiles.map((mediaFile, index) => (
                    <img
                        onClick={() => handleModalOpen(MESSAGE_URL + mediaFile.uniqueName)}
                        className="home-media__image"
                        src={MESSAGE_URL + mediaFile.uniqueName}
                        alt={mediaFile.alt ?? ''}
                        key={index}
                    />
                ))}
            </Masonry>
            {showPhotoModal && <PhotoModal onClose={() => setShowPhotoModal(false)} src={photoSrc}/>}
        </>
    );
};

export default HomeMedia;
