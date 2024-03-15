import React from 'react';

const InputField = ({ type, label, name, value, onChange, error ,autoComplete }) => {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete= {'off'}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
export default InputField;


