import React from 'react';
import cn from 'classnames';

const AvatarButton = ({status, large, disabled = false}) => {

    return (
        <button className={cn("avatar p-0", large && 'avatar_large')} disabled={disabled}>
            <span className={cn("avatar__circle", status ?? 'd-none')} />
            {/*<img src={process.env.PUBLIC_URL + '/images/sidebar/1.jpg'} alt="Avatar" className="avatar__image"/>*/}
        </button>
    );
};

export default AvatarButton;
