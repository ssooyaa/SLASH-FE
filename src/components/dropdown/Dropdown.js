import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ label, options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="customDropdown1" onClick={() => setIsOpen(!isOpen)}>
      <span className="dropdownHeaderLabel">{label}</span>
      <span className="dropdownHeaderText">{selectedOption}</span>
      {isOpen && (
        <div className="dropdownList">
          {options.map((option) => (
            <label
              key={option}
              className={`dropdownOption ${
                selectedOption === option ? "boldText" : "normalText"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
