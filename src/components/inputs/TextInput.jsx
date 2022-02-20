import React from 'react';

const TextInput = ({onChange, type, value, placeholder}) => {
    return (
        <input
            type={type ?? 'text'}
            className="text-input regular-text mb-4"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    );
};

export default TextInput;
