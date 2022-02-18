import React from 'react';
import cn from 'classnames';
import {API_URL} from "../../../http";

const AvatarButton = ({user, large, disabled = false}) => {

    const onAvatarUpload = () => {

    }

    return (
        <button className={cn("avatar p-0", large && 'avatar_large')} disabled={disabled}>
            <span className="avatar__wrapper position-relative overflow-hidden h-100">
            <label htmlFor="avatar" className="w-100 h-100">
                <input type="file" name="avatar" id="avatar" className="avatar_input" size="60" disabled={disabled}/>
            </label>
                {user?.pictureUrl && <img src={API_URL + '/img/' + user.pictureUrl} alt="Avatar" className="avatar__image h-100"/>}
            </span>
            <span className={cn("avatar__circle", user?.status?.className ?? 'd-none')}/>
        </button>
    );
};

export default AvatarButton;
