import React from 'react';

const SettingButton = ({onClick}) => {
    return (
        <button className='settings-button' onClick={onClick}>
            <span className="settings-button__middle-dot"></span>
        </button>
    );
};

export default SettingButton;
