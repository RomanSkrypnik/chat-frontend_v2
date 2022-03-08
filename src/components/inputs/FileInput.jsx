import React, {useCallback, useState} from 'react';
import CrossIcon from "../UI/icons/Cross";
import cn from "classnames";
import {useController} from "react-hook-form";
import {useDropzone} from "react-dropzone";

const FileInput = ({onFileInput, control, name, placeholder, dark = false}) => {

    const onChange = (acceptedFiles) => {
        onFileInput(acceptedFiles);

        field.onChange(acceptedFiles);
    };

    const {field} = useController({control, name});

    const onDrop = useCallback(onChange, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <label>
            <div className={cn("file-input", dark && 'file-input_dark')} {...getRootProps()}>
                <CrossIcon className="file-input__cross"/>
                <input
                    multiple
                    type="file"
                    className="file-input__input"
                    onChange={onChange}
                    {...getInputProps()}
                />
            </div>
            <div
                className={cn("last-text text-center mt-1", dark ? 'text-purple' : 'text-white')}>{!isDragActive ? placeholder : 'Drop here'}</div>
        </label>
    );
};

export default FileInput;
