import React from 'react';
import Portal from "../Portal";
import ModalCross from "../UI/icons/ModalCross";
import ModalButton from "../UI/buttons/ModalButton";

const PhotoModal = ({onClose, src, alt}) => {
    return (
        <Portal onClick={onClose}>
            <div className="photo-modal">
                <img src={src} alt={alt ?? ''}/>
            </div>
            <ModalButton className="modal-button_top-end" onClick={onClose}>
                <ModalCross/>
            </ModalButton>
        </Portal>
    );
};

export default PhotoModal;
