import React, {useState} from 'react';
import FileInput from "../inputs/FileInput";
import CrossButton from "./buttons/CrossButton";
import MessageService from "../../services/MessageService";
import {useParams} from "react-router-dom";
import UploadedMediaFile from "../partials/UploadedMediaFile";

const DropZone = ({onClose, onFileChange}) => {
    const [mediaFiles, setMediaFiles] = useState([]);

    const {hash} = useParams();

    const handleOnChange = async (e) => {
        const fd = new FormData();

        Array.from(e.target.files).forEach(file => fd.append('files', file));
        fd.append('hash', hash);

        const {data} = await MessageService.uploadMedia(fd);

        onFileChange(data.id);

        setMediaFiles(Array.from(data.files));
    };

    const handleOnDelete = () => {

    };

    return (
        <div className="drop-zone d-flex">
            <CrossButton light className="align-to-right" onClick={onClose}/>
            {
                mediaFiles.length > 0 && (
                    <div className="d-flex">
                        {mediaFiles.map((mediaFile, index) => <UploadedMediaFile  pictureUrl={mediaFile.uniqueName} key={index}/>)}
                    </div>
                )
            }
            <FileInput onChange={handleOnChange} placeholder="Add files"/>
        </div>
    );
};

export default DropZone;
