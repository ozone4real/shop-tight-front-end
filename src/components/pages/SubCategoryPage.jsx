import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SUB_CATEGORY_PRODUCTS } from '../../graphql/queries'
import { getIdFromUrlKey } from '../../utils/helperMethods';
import CategorySection from '../ui-molecules/CategorySection';


export default ({match: { params }}) => {
  const { data } = useQuery(SUB_CATEGORY_PRODUCTS(getIdFromUrlKey(params.subUrlKey)), { fetchPolicy: "cache-and-network" });
  if(!data) return <div></div>
  const {subCategoryProducts, subCategory: { categoryDescription, categoryName} } = data

  return (
    <CategorySection
    categoryProducts={subCategoryProducts}
    categoryDescription={categoryDescription}
    categoryName={categoryName}
    />
  )
}

