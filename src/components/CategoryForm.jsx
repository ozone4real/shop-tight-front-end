import React, { useState, Fragment } from 'react';
import Input from './Input'
import { useMutation, useApolloClient, useQuery } from '@apollo/react-hooks'
import {FETCH_SUB_CATEGORIES, CREATE_PRODUCT} from '../graphql/queries'
import Select from './Select';

export default () => {
  const [categoryAttributes, setCategoryAttributes] = useState({
    categoryName: '',
    categoryDescription: '',
    picture: ''
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
        category: { 
          categoryAttributes: trimValues(categoryAttributes),
        }
      }
    });


  // const { data: subCatData } = useQuery(FETCH_SUB_CATEGORIES)


  const handleChange = ({ target }) => {
    const key = target.name
    const value = target.value
    setCategoryAttributes({...categoryAttributes, [key]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    createProduct()
  }

  return (
    <Fragment>
    <div className="sign-up-form">
    <form onSubmit={handleSubmit}>
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
    </form>
    </div>
    </ Fragment>
  )

}