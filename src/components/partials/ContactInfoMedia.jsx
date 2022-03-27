import React, {useContext, useEffect, useRef, useState} from 'react';
import {API_URL, MESSAGE_URL} from "../../http";
import PhotoModal from "../modals/PhotoModal";
import {ChatMessageInstance} from "../UI/ChatMessage";
import {HomeContext} from "../../pages/Home";

const ContactInfoMedia = ({mediaFiles}) => {
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [photoModalSrc, setPhotoModalSrc] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const clientHeight = (window.innerHeight - 60) * 0.3;
        const columnsCount = Math.ceil(clientHeight / 82);

        setPhotos(mediaFiles.slice(0, columnsCount * 3));
    }, []);

    const handleSwitch = useContext(HomeContext);

    const handleOnClick = src => {
        setShowPhotoModal(true);
        setPhotoModalSrc(src);
    };

    return (
        <div className="contact-info__media">
            <h2 className="last-text last-text_contact text-purple mb-3 mt-3 text-center">Media</h2>
            <div className="d-flex flex-wrap">
                {
                    photos.length > 0 &&
                    photos.map((photo, index) => (
                            photos.length - 1 !== index ?
                                <div className="contact-info__media-wrapper" key={index}
                                     onClick={() => handleOnClick(`${MESSAGE_URL}${photo.uniqueName}`)}>
                                    <img
                                        src={`${MESSAGE_URL}${photo.uniqueName}`}
                                        alt=""
                                        className="contact-info__media-image"
                                    />
                                </div>
                                :
                                <div
                                    onClick={handleSwitch}
                                    className="contact-info__media-wrapper contact-info__media-wrapper_more last-text last-text_alt text-purple"
                                    key={index}>
                                    {mediaFiles.length - photos.length} more >
                                </div>
                        )
                    )
                }
            </div>
            {
                showPhotoModal &&
                <PhotoModal onClose={() => setShowPhotoModal(false)} src={photoModalSrc}/>
            }
        </div>
    );
};

export default ContactInfoMedia;
