import React from 'react';

export default ({ options=[], label, required=true, ...rest }) => (
  <div className="select-field">
  <select {...rest}>
    <option value={null} >{label}</option>
    {options.map(
      (option) => <option key={option.id} value={option.value} required={required}>{option.name}</option>
      )}
  </select>
  </div>
)