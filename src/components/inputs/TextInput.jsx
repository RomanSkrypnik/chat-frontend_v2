import React from 'react';

const TextInput = ({onChange, type, value, placeholder, label}) => {

    return (
        <>
            {label && <label className="ps-1 regular-text text-dark mb-1">{label}</label>}
            <input
                type={type ?? 'text'}
                className="text-input regular-text mb-3"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </>
    );
};

export default TextInput;
