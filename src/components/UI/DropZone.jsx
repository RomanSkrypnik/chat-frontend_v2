import React, {useState} from 'react';
import FileInput from "../inputs/FileInput";
import CrossButton from "./buttons/CrossButton";
import MessageService from "../../services/MessageService";
import {useParams} from "react-router-dom";

const DropZone = ({onClose, onFileChange}) => {
    const [mediaFiles, setMediaFiles] = useState(null);

    const {hash} = useParams();

    const handleOnChange = async (e) => {
        setMediaFiles(e.target.files);

        const fd = new FormData();

        Array.from(e.target.files).forEach(file => fd.append('files', file));
        fd.append('hash', hash);

        const {data} = await MessageService.uploadMedia(fd);

        onFileChange(data.id);
    };

    return (
        <div className="drop-zone">
            <CrossButton light className="align-to-right" onClick={onClose}/>
            <FileInput onChange={handleOnChange} placeholder="Add files"/>
        </div>
    );
};

export default DropZone;
