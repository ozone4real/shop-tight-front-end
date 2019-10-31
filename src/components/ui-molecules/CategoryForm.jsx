import React, { useState } from 'react';
import CategoryFields from './CategoryFields';
import { useApolloClient } from "@apollo/react-hooks";
import { getIdFromUrlKey } from '../../utils/helperMethods';
import useCreateCategory from '../../custom-hooks/useCreateCategory';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CREATE_CATEGORY, CATEGORY, UPDATE_CATEGORY } from '../../graphql/queries'
import { trimValues } from '../../utils/helperMethods'


export default ({ params }) => {
  let  initialState = {
    categoryName: '',
    categoryDescription: '',
    picture: ''
  };

  let query = CREATE_CATEGORY
  const client =  useApolloClient()
  if(params && params.url_key) {
  const cache  = new InMemoryCache()
    const key = cache['config'].dataIdFromObject({
      __typename: 'Category',
      id:  getIdFromUrlKey(params.url_key)
    })


    var data = client.readFragment({fragment: CATEGORY, id: key})
    if(!data) return <h1>Category does not exist</h1>
    delete data.__typename;
    delete data.urlKey
    initialState = { ...data, images: null, picture: data.images };
    console.log(initialState)
    query = UPDATE_CATEGORY;
  }


  const [categoryAttributes, setCategoryAttributes] = useState(initialState)


  const variables = {
    category: { 
      categoryAttributes: trimValues(categoryAttributes),
    }
  }

  const {handleChange, handleSubmit, loading} = useCreateCategory(
    categoryAttributes, setCategoryAttributes, query, variables
    )

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <CategoryFields
      categoryAttributes={categoryAttributes}
      handleChange={handleChange}
      loading={loading}
      />
    </form>
  )
}