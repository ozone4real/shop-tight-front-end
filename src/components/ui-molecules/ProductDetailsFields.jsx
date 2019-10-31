import React, { Fragment } from 'react';
import Input from './Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({handleChange, data, index }) => (
  <Fragment>
  <div className="product-details-fields">
      <Input
        onChange={handleChange}
        id='color'
        name='color'
        value={data.color}
        type='text'
        placeholder='Color'
        group='productDetailsAttributes'
        required={false}
        index={index}
      />
      <Input
        onChange={handleChange}
        id='size'
        name='size'
        value={data.size}
        type='text'
        placeholder='Size (e.g: XL, L, 45)'
        group='productDetailsAttributes'
        required={false}
        index={index}
      />
      <Input
        onChange={handleChange}
        id='price'
        name='price'
        value={data.price}
        type='number'
        placeholder='Unit Price'
        group='productDetailsAttributes'
        index={index}
      />
      <Input
        onChange={handleChange}
        id='quantityInStock'
        name='quantityInStock'
        value={data.quantityInStock}
        type='number'
        placeholder='Quantity'
        group='productDetailsAttributes'
        index={index}
      />
      </div>
      </Fragment>
)