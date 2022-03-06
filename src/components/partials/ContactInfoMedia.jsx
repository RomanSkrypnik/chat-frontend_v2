import React from 'react';
import {API_URL} from "../../http";

const ContactInfoMedia = ({mediaFiles, overallLength}) => {
    return (
        <div className="contact-info__media">
            <h2 className="last-text last-text_contact text-purple mb-3 mt-3 text-center">Media</h2>
            <div className="d-flex flex-wrap">
                {
                    mediaFiles.length > 0 &&
                    mediaFiles.map((mediaFile, index) => (
                            index !== 8 ?
                                <div className="contact-info__media-wrapper" key={index}>
                                    <img
                                        src={`${API_URL}/img/messages/${mediaFile.uniqueName}`}
                                        alt=""
                                        className="contact-info__media-image"
                                    />
                                </div>
                                :
                                <div
                                    className="contact-info__media-wrapper contact-info__media-wrapper_more last-text last-text_alt text-purple"
                                    key={index}>
                                    {overallLength} more >
                                </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default ContactInfoMedia;
