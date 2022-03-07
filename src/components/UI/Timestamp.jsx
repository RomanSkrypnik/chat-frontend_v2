import React from 'react';
import {format} from "date-fns";

const Timestamp = ({date}) => {

    const currentDate = new Date();
    const messageDate = new Date(date);
    const formattedDate = currentDate.getDate() === messageDate.getDate() ? 'TODAY' : format(date, 'dd/MM/yyyy');

    return (
        <div className="timestamp text-center text-white last-text last-text_alt">
            {formattedDate}
        </div>
    );
};

export default Timestamp;
