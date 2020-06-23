import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CATEGORY_PRODUCTS } from '../../graphql/queries'
import { getIdFromUrlKey } from '../../utils/helperMethods';
import CategorySection from '../ui-molecules/CategorySection';


export default ({match: { params }}) => {
  const { data } = useQuery(CATEGORY_PRODUCTS(getIdFromUrlKey(params.urlKey)), { fetchPolicy: "cache-and-network" });
  if(!data) return <div></div>
  const {categoryProducts, category: { categoryDescription, categoryName} } = data

  return (
    <CategorySection
    categoryProducts={categoryProducts}
    categoryDescription={categoryDescription}
    categoryName={categoryName}
    />
  )
}

