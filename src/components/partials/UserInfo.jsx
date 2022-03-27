import React, {useEffect, useState} from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import StatusSelect from "../inputs/StatusSelect";
import ContactInfoMedia from "./ContactInfoMedia";
import UserInfoButtons from "./UserInfoButtons";

const UserInfo = ({user}) => {
    const [mediaFiles, setMediaFiles] = useState([]);

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

        setMediaFiles(mediaFiles);
    };

    return (
        <div className="user-info mt-4">

            <div className="user-info__upper">
                <h2 className="last-text last-text_contact text-purple mb-3">Contact Info</h2>
                <AvatarButton user={user.friend} large disabled/>
                <div className="last-text last-text_contact-alt text-purple mt-3">{user.friend.name}</div>
                <div className="regular-text my-2">Sr. Visual Designer</div>
                <StatusSelect selectedStatus={user.friend.status} disabled/>

                {mediaFiles.length > 0 && <ContactInfoMedia mediaFiles={mediaFiles}/>}
            </div>
            <UserInfoButtons/>
        </div>
    );
};

export default UserInfo;
