import React from 'react';
import cn from 'classnames';
import {API_URL} from "../../../http";
import {useDispatch} from "react-redux";
import {uploadAvatar} from "../../../store/slices/auth";

const AvatarButton = ({user, large, disabled = false}) => {
    const dispatch = useDispatch();

    const onAvatarUpload = (e) => {
        const fd = new FormData();
        fd.append('avatar', e.target.files[0]);
        fd.append('kal', 'ffsfsdfsd');
        dispatch(uploadAvatar(fd));
    }

    return (
        <button className={cn("avatar p-0", large && 'avatar_large')} disabled={disabled}>
            <span className="avatar__wrapper position-relative overflow-hidden h-100">
                {user.pictureUrl && <img src={API_URL + '/img/' + user.pictureUrl} alt="Avatar" className="avatar__image h-100"/>}
            </span>
            <span className={cn("avatar__circle", user?.status?.className ?? 'd-none')}/>
            <label htmlFor="avatar" className="w-100 h-100">
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="avatar_input"
                    onChange={onAvatarUpload}
                    size="60"
                    disabled={disabled}
                />
            </label>
        </button>
    );
};

export default AvatarButton;
