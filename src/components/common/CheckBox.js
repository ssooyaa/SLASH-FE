import React from "react";
import PropTypes from "prop-types";
import "../../styles/CheckBox.css";

const CheckBox = ({ id, label, checked, onChange }) => {
  return (
    <div className="customCheckboxContainer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
        className="customCheckbox"
      />
      <label htmlFor={id} className="customCheckboxLabel">
        {label}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
