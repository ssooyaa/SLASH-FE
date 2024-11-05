import React from 'react';
import "./Modal.css"

const Modal = ({isOpen, onClose, message}) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
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
