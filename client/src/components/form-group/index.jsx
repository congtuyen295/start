import React from "react";
import "./style.scss";

const FormGroup = ({
  label,
  name,
  type,
  placeholder,
  handleChange,
  errors,
  touched,
}) => {
  return (
    <fieldset className="form-group">
      <label>
        {label}
        <span className="required"> *</span>
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {errors && touched && <div style={{color:'red'}}>{errors}</div>}
    </fieldset>
  );
};

export default FormGroup;
