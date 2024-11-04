import React from 'react';
import "./Modal.css"

const Modal = ({isOpen, onClose, message}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="markBox">
                    <div className="mark">!</div>
                </div>
                <p className="modalM">{message}</p>
                <button id="allot" onClick={onClose}>확인</button>
            </div>
        </div>
    );
};

export default Modal;
