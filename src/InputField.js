import React from "react";
import "bulma/css/bulma.min.css";

function InputField({ lable, name, value, onChange }) {
  return (
    <div className="field">
      <lable className="label">{lable}:</lable>
      <div className="control">
        <input
          className="input"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          style={{ marginRight: "10px", marginLeft: "10px" }}
        ></input>
      </div>
    </div>
  );
}

export default InputField;
