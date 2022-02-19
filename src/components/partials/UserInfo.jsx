import React from 'react';
import AvatarButton from "../UI/buttons/AvatarButton";
import StatusSelect from "../inputs/StatusSelect";

const UserInfo = ({user}) => {
    return (
        <div className="contact-info__content d-flex flex-column align-items-center mt-4">
            <h2 className="last-text last-text_contact text-purple mb-3">Contact Info</h2>
            <AvatarButton user={user} large disabled/>
            <div className="last-text last-text_contact-alt text-purple mt-3">{user.name}</div>
            <div className="regular-text my-2">Sr. Visual Designer</div>
            <StatusSelect selectedStatus={user.status} disabled/>
        </div>
    );
};

export default UserInfo;
