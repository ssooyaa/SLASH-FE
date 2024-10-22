import React, { useState, useCallback, useMemo } from "react";
import "../styles/RequestDropdown.css";

const Dropdown = ({ items, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(label);

  const toggleDropdown = useCallback((e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (e, item) => {
      e.preventDefault();
      setSelectedItem(item);
      setIsOpen(false);
      if (onSelect) {
        onSelect(item); // 선택된 값을 상위 컴포넌트에 전달
      }
    },
    [onSelect]
  );

  const renderedItems = useMemo(
    () =>
      items.map((item, index) => (
        <div
          key={index}
          className="dropdown-item"
          onClick={(e) => handleSelect(e, item)}
        >
          {item}
        </div>
      )),
    [items, handleSelect]
  );

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={toggleDropdown}>
        {selectedItem}
      </button>
      {isOpen && <div className="dropdown-content">{renderedItems}</div>}
    </div>
  );
};

export default Dropdown;
