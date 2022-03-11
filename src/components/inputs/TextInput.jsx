import React from 'react';
import cn from "classnames";

const TextInput = ({onChange, type, value, placeholder, label, name, classname = '', errorText}) => {

    return (
        <div className="mb-3">
            {label && <label className="ps-1 regular-text text-dark mb-1">{label}</label>}
            <input
                type={type ?? 'text'}
                className={cn("text-input regular-text", classname)}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
            />
            {errorText && <span className="regular-text">{errorText}</span>}
        </div>
    );
};

export default TextInput;
