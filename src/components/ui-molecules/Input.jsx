import React from 'react';

const Input = ({error, id, required=true, ...rest}) => (
  <div className="input-field" >
    <input id={id} required={required} {...rest}/>
    { error && <label htmlFor={id}><small className="text-danger">{error}</small></label>}
  </div>
)

export default Input