import React from 'react';

const Input = ({error, id, label, required=true, ...rest}) => (
  <div className="input-field" >
    {label && <label htmlFor="id">{label}</label>}
    <input id={id} required={required} {...rest}/>
    { error && <label htmlFor={id}><small className="text-danger">{error}</small></label>}
  </div>
)

export default Input