import React, {useState} from 'react';

const TextInput = ({name, register, placeholder}) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <input
            {...register(name)}
            type="text"
            className="text-input regular-text mb-4"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
        />
    );
};

export default TextInput;
