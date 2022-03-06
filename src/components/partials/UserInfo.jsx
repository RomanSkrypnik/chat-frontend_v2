import React, {useEffect, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import StatusSelect from "../inputs/StatusSelect";
import ContactInfoMedia from "./ContactInfoMedia";

const UserInfo = ({user}) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [overallLength, setOverallLength] = useState(null);

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        init();
    }, [user.messages]);

    const init = () => {
        let {messages} = user;

        const copyMessages = [...messages].reverse();

        const mediaFiles = copyMessages.flatMap(message => message.files);
        const overallLength = mediaFiles.length - 8;

        setMediaFiles(mediaFiles.slice(0, 9));
        setOverallLength(overallLength);
    };


    return (
        <div className="d-flex flex-column align-items-center mt-4 w-100">

            <h2 className="last-text last-text_contact text-purple mb-3">Contact Info</h2>
            <AvatarButton user={user.friend} large disabled/>
            <div className="last-text last-text_contact-alt text-purple mt-3">{user.friend.name}</div>
            <div className="regular-text my-2">Sr. Visual Designer</div>
            <StatusSelect selectedStatus={user.friend.status} disabled/>

            <ContactInfoMedia mediaFiles={mediaFiles} overallLength={overallLength}/>
        </div>
    );
};

export default UserInfo;
