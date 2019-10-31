import React, { useState } from 'react';
import CategoryFields from './CategoryFields';
import { useQuery } from '@apollo/react-hooks'
import useCreateCategory from '../../custom-hooks/useCreateCategory';
import { CREATE_SUB_CATEGORY, CATEGORIES } from '../../graphql/queries'
import { trimValues } from '../../utils/helperMethods'
import Select from './Select';

export default () => {
  const { data } = useQuery(CATEGORIES)


  const [subCategoryAttributes, setSubCategoryAttributes] = useState({
    categoryId: '',
    categoryName: '',
    categoryDescription: '',
    picture: ''
  })

  const variables = {
    subCategory: {
      subCategoryAttributes: trimValues(subCategoryAttributes)
    }
  }

  const {handleChange, handleSubmit, loading} = useCreateCategory(
    subCategoryAttributes, setSubCategoryAttributes, CREATE_SUB_CATEGORY, variables
    )

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <Select
        onChange={handleChange}
        options={data && data.categories.map((item) => (
          { name: item.categoryName, value: item.id  })
        )}
        name='categoryId'
        label='Category'
       />
      <CategoryFields
      categoryAttributes={subCategoryAttributes}
      handleChange={handleChange}
      loading={loading}
      />
    </form>
  )
}