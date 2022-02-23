import React from 'react';
import cn from 'classnames';

const Overlay = ({children, black, onClick}) => {
    return (
        <div className={cn("overlay", black && "overlay_black")} onClick={onClick}>{children}</div>
    );
};

export default Overlay;
