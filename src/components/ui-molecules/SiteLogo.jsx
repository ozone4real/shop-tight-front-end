import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

export default () => (
  <div className='site-logo'>
    <Link to='/' className='no-underline'>
      <h1> <FontAwesomeIcon icon='shopping-bag' /> <span>Shop-right</span></h1>
    </Link>
  </div>
)