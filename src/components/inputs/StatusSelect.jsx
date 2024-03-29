import React, {useEffect, useState} from 'react';
import StatusService from "../../services/StatusService";
import Select from 'react-select';
import {useSelector} from "react-redux";
import cn from "classnames";

const StatusSelect = ({selectedStatus, onStatusChange, disabled = false}) => {

    const {user} = useSelector(state => state.auth);

    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        fetchStatuses();
    }, []);

    const fetchStatuses = async () => {
        try {
            const {data} = await StatusService.fetchStatuses();
            setStatuses(data);
        } catch (e) {
            console.log(e);
        }
    };

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

    const changeStatus = async (option) => {
        try {
            await StatusService.changeStatus(user.email, option);
            onStatusChange(option);
        } catch (e) {
            console.log(e);
        }
    };


    return (
            <Select
                className={cn("status-select last-text", selectedStatus.className)}
                onChange={changeStatus}
                options={statuses}
                value={selectedStatus}
                styles={selectStyles}
                components={components}
                isSearchable={false}
                isDisabled={disabled}
            />
    );
};

export default StatusSelect;
