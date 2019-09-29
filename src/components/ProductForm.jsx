import React, { useState, Fragment } from 'react';
import Input from './Input'
import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks'
import {FETCH_SUB_CATEGORIES, CREATE_PRODUCT} from '../graphql/queries'
import Select from './Select';

export default () => {
  var [productAttributes, setProductAttributes] = useState({
    subCategoryId: '',
		brand: '',
		productName: '',
		productDescription: '',
    productSize: '',
    picture: null,
    unitWeight: '',
    discount: ''
  })

  const [productDetailAttributes, setProductDetailAttributes] = useState({
    color: '',
		price: '',
    quantityInStock: '',
    size: ''
  })

  const trimValues = (data) => {
    return Object.entries(data).reduce((trimmed, [key, value]) => {
      if(typeof value === 'string') value = value.trim() 
      if(value) trimmed[key] = value
      return trimmed
    }, {})
  }


  const [createProduct, { data, loading }] = useMutation(
    CREATE_PRODUCT, {
      context: {hasUpload: true},
      variables: {
        product: { 
          productAttributes: trimValues(productAttributes),
          productDetailAttributes: [trimValues(productDetailAttributes)]
        }
      }
    });


  const { data: subCatData } = useQuery(FETCH_SUB_CATEGORIES)


  const handleChange = ({ target }) => {
    const key = target.name
    let value = target.value
    const group = target.getAttribute('group')
    const type = target.getAttribute('type')
    if(type === 'number') value = parseInt(value)
    if(type === 'file') value = target.files
    if(group === 'productAttributes') { 
      setProductAttributes({...productAttributes, [key]: value })
    }
    if(group === 'productDetailAttributes') {
      setProductDetailAttributes({...productDetailAttributes, [key]: value})
    }
    
  }

  const handleSubmit = e => {
    e.preventDefault()
    createProduct()
  }

  return (
    <Fragment>
    <div className="sign-up-form">
    <form onSubmit={handleSubmit}>
     <Select
      onChange={handleChange}
      options={subCatData ? subCatData.subCategories : []}
      name='subCategoryId'
      group='productAttributes'
      label='Category'
     />
      <Input
        onChange={handleChange}
        id='productName'
        name='productName'
        type='text'
        value={productAttributes.productName}
        placeholder='Product Name'
        group='productAttributes'

      />

      <Input
        onChange={handleChange}
        id='brand'
        name='brand'
        value={productAttributes.brand}   
        type='text'
        placeholder='Brand'
        group='productAttributes'
      />

      <Input
        onChange={handleChange}
        id='productSize'
        name='productSize'
        type='text'
        value={productAttributes.productSize}
        placeholder='Product Size'
        group='productAttributes'
      />

      <Input
        onChange={handleChange}
        id='productDescription'
        name='productDescription'
        value={productAttributes.productDescription}
        type='text'
        placeholder='Product Description'
        group='productAttributes'
      />
      <Input
        onChange={handleChange}
        id='discount'
        name='discount'
        value={productAttributes.discount}
        type='number'
        placeholder='Discount (%)'
        required={false}
        group='productAttributes'
      />

      <Input
        onChange={handleChange}
        id='unitWeight'
        name='unitWeight'
        value={productAttributes.unitWeight}
        type='text'
        placeholder='Unit Weight(kg)'
        group='productAttributes'
        required={false}
      />
      <Input
        onChange={handleChange}
        id='color'
        name='color'
        value={productDetailAttributes.color}
        type='text'
        placeholder='Color'
        group='productDetailAttributes'
        required={false}
      />
      <Input
        onChange={handleChange}
        id='size'
        name='size'
        value={productDetailAttributes.size}
        type='text'
        placeholder='Size (e.g: XL, L, 45)'
        group='productDetailAttributes'
        required={false}
      />
      <Input
        onChange={handleChange}
        id='price'
        name='price'
        value={productDetailAttributes.price}
        type='number'
        placeholder='Unit Price'
        group='productDetailAttributes'
      />
      <Input
        onChange={handleChange}
        id='quantityInStock'
        name='quantityInStock'
        value={productDetailAttributes.quantityInStock}
        type='number'
        placeholder='Quantity'
        group='productDetailAttributes'
      />
      <input group='productAttributes' type='file' name="picture" accept='image/*' onChange={handleChange} multiple/>
      <div><button> {loading ? '...loading' : 'Submit'}</button></div>
    </form>
    </div>
    </ Fragment>
  )

}