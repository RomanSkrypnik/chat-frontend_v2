import React, {useCallback, useEffect, useState} from 'react';
import CrossIcon from "../UI/icons/Cross";
import cn from "classnames";
import {useController} from "react-hook-form";
import {useDropzone} from "react-dropzone";

const FileInput = ({onFileInput, control, name, placeholder = '', dark = false}) => {

    const [files, setFiles] = useState([]);

    const onChange = acceptedFiles => setFiles(acceptedFiles);

    useEffect(() => {
        if (files.length > 0) {
            onFileInput(files);
            field.onChange(files);
        }
    }, [files]);

    const {field} = useController({control, name, defaultValue: null});

    const onDrop = useCallback(onChange, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div {...getRootProps()}>
            <div className={cn("file-input", dark && 'file-input_dark')}>
                <CrossIcon className="file-input__cross"/>
                <input
                    multiple
                    type="file"
                    className="file-input__input"
                    onChange={onChange}
                    {...getInputProps()}
                />
            </div>
            <div className={cn("last-text text-center mt-1", dark ? 'text-purple' : 'text-white')}>{isDragActive ? 'Drop here' : placeholder}</div>
        </div>
    );
};

export default FileInput;
