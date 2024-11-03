import React, { useState, useCallback, useMemo, useEffect } from "react";
import "../request/RequestDropdown.css";

const Dropdown = ({ items, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(label);

  useEffect(() => {
    setSelectedItem(label);
  }, [label]);

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
        onSelect(item);
      }
    },
    [onSelect]
  );

  const renderedItems = useMemo(
    () =>
      items.map((item, index) => (
        <div
          key={index}
          className="dropdownItem"
          onClick={(e) => handleSelect(e, item)}
        >
          {item}
        </div>
      )),
    [items, handleSelect]
  );

  return (
    <div className="dropdown">
      <button className="dropdownBtn" onClick={toggleDropdown}>
        {selectedItem}
      </button>
      {isOpen && <div className="dropdownContent">{renderedItems}</div>}
    </div>
  );
};

export default Dropdown;
