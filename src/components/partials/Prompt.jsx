import React from 'react';
import RegularButton from "../UI/buttons/RegularButton";

const Prompt = ({question, onClick}) => {
    return (
        <div>
            <div className="regular-text mb-3">{question}</div>
            <div className="d-flex justify-content-around">
                <RegularButton onClick={() => onClick(true)}>Yes</RegularButton>
                <RegularButton onClick={() => onClick(false)}>No</RegularButton>
            </div>
        </div>
    );
};

export default Prompt;
