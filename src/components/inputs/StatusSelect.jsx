import React, {useEffect, useRef, useState} from 'react';
import Select from 'react-select';
import cn from "classnames";

const StatusSelect = ({statuses, selectedStatus}) => {
    const [value, setValue] = useState({});

    useEffect(() => {
        setValue(selectedStatus);
    }, []);

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

    const changeStatus = (option) => {
        setValue(option);
    };


    return (
            <Select
                className={cn("status-select last-text", value.className)}
                onChange={changeStatus}
                options={statuses}
                value={value}
                styles={selectStyles}
                placeholder=''
                components={components}
                isSearchable={false}
            />
    );
};

export default StatusSelect;
