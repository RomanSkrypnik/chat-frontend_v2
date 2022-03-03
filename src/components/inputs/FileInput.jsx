import React, {useState} from 'react';
import CrossIcon from "../UI/icons/Cross";
import cn from "classnames";

const FileInput = ({onChange, placeholder, dark = false}) => {

    return (
        <label>
            <div className={cn("file-input", dark && 'file-input_dark')}>
                <CrossIcon className="file-input__cross"/>
                <input
                    multiple
                    type="file"
                    className="file-input__input"
                    onChange={onChange}
                />
            </div>
            <div className={cn("last-text text-center mt-1", dark ? 'text-purple' : 'text-white')}>{placeholder}</div>
        </label>
    );
};

export default FileInput;
