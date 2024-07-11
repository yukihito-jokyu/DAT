import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onConfirm, fileName }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{fileName}をアップロードしますか？</h2>
                <button onClick={onConfirm}>はい</button>
                <button onClick={onClose}>いいえ</button>
            </div>
        </div>
    );
};

export default Modal;
