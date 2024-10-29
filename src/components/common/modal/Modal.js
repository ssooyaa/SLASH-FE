// Modal.js
import React from "react";
import "../../../styles/Modal.css";
const Modal = ({ isOpen, options, onClose, onSelect, selectedOption }) => {
  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <div className="modalOptions">
          {options.map((option) => (
            <label key={option} className="modalOption">
              <input
                type="radio"
                checked={selectedOption === option}
                onChange={() => onSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
