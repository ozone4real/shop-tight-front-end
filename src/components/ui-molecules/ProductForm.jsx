import React, { useState, Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GarbageIcon from  '../../assets/icons/garbage'
import {FETCH_SUB_CATEGORIES, CREATE_PRODUCT} from '../../graphql/queries';
import Select from './Select';
import Input from './Input';
import ProductDetailsFields from './ProductDetailsFields';
import { trimValues } from '../../utils/helperMethods'

export default () => {
   
  const [productAttributes, setProductAttributes] = useState({
    subCategoryId: '',
		brand: '',
		productName: '',
		productDescription: '',
    productSize: '',
    picture: null,
    unitWeight: '',
    discount: ''
  })


  const [productDetailsAttributes, setProductDetailsAttributes] = useState([{
    color: '',
		price: '',
    quantityInStock: '',
    size: ''
  }])


  const [createProduct, { data, loading }] = useMutation(
    CREATE_PRODUCT, {
      context: {hasUpload: true},
      variables: {
        product: { 
          productAttributes: {
            ...trimValues(productAttributes),
            productDetailsAttributes: trimValues(productDetailsAttributes)
          },
        }
      }
    });


  const { data: subCatData } = useQuery(FETCH_SUB_CATEGORIES)


  const handleProductAttrChange = ({ target }) => {
    const key = target.name
    let value = target.value
    const type = target.getAttribute('type')
    if(type === 'number') value = parseInt(value)
    if(type === 'file') value = target.files
    setProductAttributes({...productAttributes, [key]: value })
  }

  const handleProductDetailsAttrChange = ({ target }) => {
    const key = target.name
    let value = target.value
    const type = target.getAttribute('type')
    const index = target.getAttribute('index')
    if(type === 'number') value = parseInt(value)
    let attrs = [...productDetailsAttributes];
    attrs[index][key] = value
    setProductDetailsAttributes(attrs)
  }

  const handleSubmit = e => {
    e.preventDefault()
    createProduct()
  }

  const handleAddDetailVariation = e => {
    e.preventDefault()
    const data = [...productDetailsAttributes, {
      color: '',
      price: '',
      quantityInStock: '',
      size: ''
    }]
    setProductDetailsAttributes(data)
  }

  const handleDeleteDetailVariation = (e, index) => {
    e.preventDefault()
    const data = [...productDetailsAttributes]
    data.splice(index, 1)
    setProductDetailsAttributes(data)
  }

  return (
    <Fragment>
    <form onSubmit={handleSubmit} className="product-form">
    <h4>Basic Details </h4>
      <div className="product-fields">
     <Select
      onChange={handleProductAttrChange}
      options={subCatData && subCatData.subCategories.map((item) => (
        { name: item.categoryName, value: item.id  })
      )}
      name='subCategoryId'
      group='productAttributes'
      label='Category'
     />
      <Input
        onChange={handleProductAttrChange}
        id='productName'
        name='productName'
        type='text'
        value={productAttributes.productName}
        placeholder='Product Name'
        group='productAttributes'

      />

      <Input
        onChange={handleProductAttrChange}
        id='brand'
        name='brand'
        value={productAttributes.brand}   
        type='text'
        placeholder='Brand'
        group='productAttributes'
      />

      <Input
        onChange={handleProductAttrChange}
        id='productSize'
        name='productSize'
        type='text'
        value={productAttributes.productSize}
        placeholder='Product Size'
        group='productAttributes'
      />

      <Input
        onChange={handleProductAttrChange}
        id='productDescription'
        name='productDescription'
        value={productAttributes.productDescription}
        type='text'
        placeholder='Product Description'
        group='productAttributes'
      />
      <Input
        onChange={handleProductAttrChange}
        id='discount'
        name='discount'
        value={productAttributes.discount}
        type='number'
        placeholder='Discount (%)'
        required={false}
        group='productAttributes'
      />

      <Input
        onChange={handleProductAttrChange}
        id='unitWeight'
        name='unitWeight'
        value={productAttributes.unitWeight}
        type='text'
        placeholder='Unit Weight(kg)'
        group='productAttributes'
        required={false}
      />
      <Input
        onChange={handleProductAttrChange}
        name="picture"
        // value={productAttributes.picture}
        type='file'
        placeholder='Choose image'
        group='productAttributes'
        accept='image/*'
        required={false}
        multiple
      />
      </div>
      {Array.from({length: productDetailsAttributes.length}, (elem, index) => (
        <Fragment key={index}>
          <h4>Details Variation {index + 1}
            {index > 0 && <button className="icon-btn delete-var-btn" onClick={(e) => handleDeleteDetailVariation(e, index)}><GarbageIcon /></button> } 
            </h4>
         <ProductDetailsFields
          handleChange={handleProductDetailsAttrChange}
          data={productDetailsAttributes[index]}
          index={index}
          />
          </Fragment>
        )   
      )}
      <button className="icon-btn add-var-btn" onClick={handleAddDetailVariation}>
        <FontAwesomeIcon icon='plus-circle' size="2x" color="#6b3368" /> Add Variation</button>
      <div><button className="submit-btn"> {loading ? '...loading' : 'Submit'}</button></div>
    </form>
    </ Fragment>
  )

}