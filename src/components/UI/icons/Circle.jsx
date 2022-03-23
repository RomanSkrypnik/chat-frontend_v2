import React from 'react';
import cn from "classnames";

const Circle = ({isActive}) => {
    return (
        <svg className={cn('circle-icon',isActive && 'circle-icon_active')} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="8.5" stroke="#6588DE"/>
        </svg>
    );
};

export default Circle;
