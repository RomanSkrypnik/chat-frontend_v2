import React from 'react';
import cn from 'classnames';
import {API_URL} from "../../../http";
import {useDispatch, useSelector} from "react-redux";
import {uploadAvatar} from "../../../store/slices/auth";

const AvatarButton = ({user, large}) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.auth.user);
    const isCurrentUser = currentUser.hash === user.hash;

    const onAvatarUpload = (e) => {
        const fd = new FormData();
        fd.append('avatar', e.target.files[0]);
        dispatch(uploadAvatar(fd));
    };

    return (
        <button className={cn("avatar p-0", large && 'avatar_large')}>
            <span className="avatar__wrapper">
                {user.pictureUrl &&
                <img src={API_URL + '/img/' + user.pictureUrl} alt="Avatar" className="avatar__image"/>}
            </span>
            <span className={cn("avatar__circle", user?.status?.className ?? 'd-none')}/>
            {
                large && isCurrentUser &&
                <label htmlFor="avatar" className="w-100 h-100">
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="avatar_input"
                        onChange={onAvatarUpload}
                    />
                </label>}
        </button>
    );
};

export default AvatarButton;
