// src/components/Dropdown.js
import React from "react";

const Dropdown = ({ label, name, value, options, onChange }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select name={name} value={value} onChange={onChange}>
            <option value="" disabled>
              Select {label.toLowerCase()}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
