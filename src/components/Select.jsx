import React from 'react';

export default ({ options, label, required=true, ...rest }) => (
  <div className="select-field">
  <label>{label}</label>
  <select {...rest}>
    <option value={null} >{label}</option>
    {options.map(
      (option) => <option key={option.id} value={option.id} required={required}>{option.categoryName}</option>
      )}
  </select>
  </div>
)