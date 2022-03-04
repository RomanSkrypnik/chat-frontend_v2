import React, {useEffect, useState} from 'react';
import FileInput from "../inputs/FileInput";
import CrossButton from "./buttons/CrossButton";
import MessageService from "../../services/MessageService";
import {useParams} from "react-router-dom";
import UploadedMediaFile from "../partials/UploadedMediaFile";
import FileService from "../../services/FileService";

const DropZone = ({onClose, onFileChange}) => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [messageId, setMessageId] = useState(null);

    const {hash} = useParams();

    useEffect(() => {
        return async () => {
            if (messageId) {
                const fileNames = mediaFiles.map(mediaFile => mediaFile.uniqueName);
                await FileService.deleteMediaFiles(fileNames, messageId);
            }
        }
    });

    const handleOnChange = async (e) => {
        const fd = new FormData();

        Array.from(e.target.files).forEach(file => fd.append('files', file));
        fd.append('hash', hash);

        const {data} = await MessageService.uploadMedia(fd);

        onFileChange(data.id);

        setMediaFiles(Array.from(data.files));
        setMessageId(data.id);
    };

    const handleOnDelete = async (uniqueName) => {
        const {data} = await FileService.deleteMediaFiles([uniqueName], messageId);

        setMediaFiles(data.files);
    };

    return (
        <div className="drop-zone d-flex">
            <CrossButton light className="align-to-right" onClick={onClose}/>
            {
                mediaFiles.length > 0 && (
                    <div className="d-flex">
                        {mediaFiles.map((mediaFile, index) => <UploadedMediaFile onClick={handleOnDelete}
                                                                                 uniqueName={mediaFile.uniqueName}
                                                                                 key={index}/>)}
                    </div>
                )
            }
            <FileInput onChange={handleOnChange} placeholder="Add files"/>
        </div>
    );
};

export default DropZone;
