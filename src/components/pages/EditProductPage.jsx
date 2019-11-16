import React from 'react';
import ProductForm from '../ui-molecules/ProductForm';
import { PRODUCT_FOR_UPDATE, PRODUCT } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import { getIdFromUrlKey } from '../../utils/helperMethods';

export default ({ history, match: { params: { urlKey} } }) => {
  const { data, loading } = useQuery(PRODUCT(getIdFromUrlKey(urlKey)))
  console.log(data, loading)
  if(!data) return <div></div>
  

  console.log(data)
  const { product: {
    id,
		brand,
		productName,
		productDescription,
    productSize,
    unitWeight,
    discount,
    subCategory: { id: subCategoryId },
    productDetails
  } } = data

  const initialProductState = { 
    subCategoryId,
    id,
    brand,
		productName,
		productDescription,
    productSize,
    unitWeight,
    discount,
    picture: null
  }

  const initialProductDetailsState = productDetails.map(({ 
  id,
  color,
  price,
  quantityInStock,
  size
}) =>  ({id, color, price, quantityInStock, size}) )




  return (
    <main className="reg-product-page">
    <div className="container">
      <div className="product-form-container">
        <h2 align="center">Register A Product</h2>
        <ProductForm history={history} action="update" initialProductDetailsState={initialProductDetailsState} initialProductState={initialProductState} />
      </div>
    </div>
  </main>
  )
}