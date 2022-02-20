import React from 'react';

const TextInput = ({onChange, value, placeholder}) => {

    return (
        <input
            type="text"
            className="text-input regular-text mb-4"
            placeholder={placeholder}
            onChange={onChange}
            value={value ?? ''}
        />
    );
};

export default TextInput;
