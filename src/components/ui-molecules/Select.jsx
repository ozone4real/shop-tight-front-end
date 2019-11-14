import React from 'react';

export default ({ error, options= [], label, required=true, ...rest }) => (
  <div className="select-field">
  <select {...rest}>
{ label && <option value={null} >{label}</option> }
    {options.map(
      (option) => <option key={option.id} value={option.value} required={required}>{option.name}</option>
      )}
  </select>
  { error && <label><small className="text-danger">{error}</small></label> }
  </div>
)