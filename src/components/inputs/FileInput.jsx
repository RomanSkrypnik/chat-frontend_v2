import React, {useState} from 'react';
import CrossIcon from "../UI/icons/Cross";
import cn from "classnames";
import {useController} from "react-hook-form";

const FileInput = ({onFileInput, control, name, placeholder, dark = false}) => {

    const {field} = useController({control, name});
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);

        onFileInput(e.target.files);

        field.onChange(e.target.files);
    };

    return (
        <label>
            <div className={cn("file-input", dark && 'file-input_dark')}>
                <CrossIcon className="file-input__cross"/>
                <input
                    multiple
                    type="file"
                    value={value}
                    className="file-input__input"
                    onChange={onChange}
                />
            </div>
            <div className={cn("last-text text-center mt-1", dark ? 'text-purple' : 'text-white')}>{placeholder}</div>
        </label>
    );
};

export default FileInput;
