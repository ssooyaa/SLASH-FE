import React from "react";
import PropTypes from "prop-types";
import "../../styles/CheckBox.css";

const CheckBox = ({ id, label, checked, onChange }) => {
  return (
    <div className="custom-checkbox-container">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
        className="custom-checkbox"
      />
      <label htmlFor={id} className="custom-checkbox-label">
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
