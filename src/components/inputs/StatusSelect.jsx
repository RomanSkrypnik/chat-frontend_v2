import React, {useRef, useState} from 'react';
import Select from 'react-select';
import cn from "classnames";

const StatusSelect = () => {

    const selectRef = useRef(null);
    const [value, setValue] = useState(null);

    const options = [
        { value: 'working', label: 'Working', className: 'working' },
        { value: 'busy', label: 'Busy', className: 'busy' },
        { value: 'free', label: 'Free', className: 'free' },
    ];

    const selectStyles = {
        control: (styles) => ({
                ...styles,
                backgroundColor: '#6588DE',
                width: '88px',
                borderRadius: '14px',
                height: '20px',
                minHeight: 'auto',
                border: 'none',
                textIndent: '15px',
        }),
        option: (styles) => ({
            ...styles,
            backgroundColor: '#6588DE',
            color: 'white',
        }),
        menu: (styles) => ({
            ...styles,
            width: '88px',
            backgroundColor: '#6588DE',
            border: 'none',
            outline: 'none',
            borderRadius: 'none'
        }),
        singleValue: (styles) => ({ ...styles, color: '#ffffff' }),
    };

    const components = {
        DropdownIndicator:() => null,
        IndicatorSeparator:() => null
    };

    const addOptionClass = (option) => {
        setValue(option.className);
    };


    return (
            <Select
                className={cn("status-select last-text", value)}
                ref={selectRef}
                onChange={addOptionClass}
                options={options}
                styles={selectStyles}
                placeholder=''
                components={components}
                isSearchable={false}
            />
    );
};

export default StatusSelect;
