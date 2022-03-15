import React, {useEffect} from 'react';
import {format} from "date-fns";

const Timestamp = ({date}) => {

    const currentDate = new Date();
    const messageDate = new Date(date);
    const formattedDate = currentDate.getDate() === messageDate.getDate() ? 'TODAY' : format(messageDate, 'dd/MM/yyyy');

    useEffect(() => {
        console.log('here')
    }, []);

    return (
        <div className="timestamp text-center text-white last-text last-text_alt">
            {formattedDate}
        </div>
    );
};

export default Timestamp;
