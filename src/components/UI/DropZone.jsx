import React, {useEffect, useState} from 'react';
import FileInput from "../inputs/FileInput";
import CrossButton from "./buttons/CrossButton";
import UploadedMediaFile from "../partials/UploadedMediaFile";

const DropZone = ({resetField, onFileChange, onClose, control}) => {
    const [mediaFiles, setMediaFiles] = useState([]);

    useEffect(() => {
        onFileChange(mediaFiles);
    }, [mediaFiles]);

    const handleOnDelete = async (name) => {
        const newMediaFiles = mediaFiles.filter(mediaFile => mediaFile.name !== name);

        setMediaFiles(newMediaFiles);

        newMediaFiles.length === 0 && resetField('media');
    };

    return (
        <div className="drop-zone d-flex">
            <CrossButton light className="align-to-right" onClick={onClose}/>
            {
                mediaFiles.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {
                            mediaFiles.map((mediaFile, index) => <UploadedMediaFile onClick={handleOnDelete}
                                                                                    file={mediaFile}
                                                                                    key={index}/>
                            )
                        }
                    </div>
                )
            }
            <FileInput
                name="media"
                control={control}
                placeholder="Add files"
                onFileInput={(files) => setMediaFiles([...mediaFiles, ...files])}
            />
        </div>
    );
};

export default DropZone;
