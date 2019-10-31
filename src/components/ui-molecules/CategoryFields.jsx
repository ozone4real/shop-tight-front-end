import React, { Fragment } from 'react';
import Input from './Input';


export default ({categoryAttributes, handleChange, loading}) => (
  <Fragment>
  <Input
        onChange={handleChange}
        id='categoryName'
        name='categoryName'
        type='text'
        value={categoryAttributes.categoryName}
        placeholder='Category Name'
      />

      <Input
        onChange={handleChange}
        id='categoryDescription'
        name='categoryDescription'
        value={categoryAttributes.categoryDescription}   
        type='text'
        placeholder='Description'
      />
      <Input
        onChange={handleChange}
        id='picture'
        name='picture'
        type='file'
        placeholder='Select images'
        accept='image/*'
        multiple
      />
      <div><button> {loading ? '...loading' : 'Submit'}</button></div>
      </Fragment>
)