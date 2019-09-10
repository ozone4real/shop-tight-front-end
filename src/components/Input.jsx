import React from 'react';

const Input = ({error, id, ...rest}) => (
  <div className="input-field" >
    <input id={id} {...rest}/>
    { error && <label htmlFor={id}>{error}</label>}
  </div>
)

export default Input