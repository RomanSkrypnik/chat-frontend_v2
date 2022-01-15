import React from 'react';
import cn from 'classnames';

const AvatarButton = ({status}) => {

    return (
        <button className={"avatar"}>
            <span className={cn("avatar__circle", status)} />
            {/*<img src={process.env.PUBLIC_URL + '/images/sidebar/1.jpg'} alt="Avatar" className="avatar__image"/>*/}
        </button>
    );
};

export default AvatarButton;
