import React, {useState} from 'react';

const RegularInput = ({onChange, placeholder}) => {

    const [value, setValue] = useState('');

    const handleChange = (e) => {
        const {value} = e.target;
        setValue(value);
        onChange(value);
    };

    return (
        <input
            value={value}
            type="text"
            className="text-input text-input_small regular-text mb-4"
            onChange={handleChange}
            placeholder={placeholder ?? ''}
        />
    );
};

export default RegularInput;
