import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { normalizeProductData } from '../../utils/helperMethods';
import { PRODUCT_COLLECTION } from '../../graphql/queries';
import ProductCardSmall from './ProductCard-Small';

export default () => {
  const {data, loading} = useQuery(PRODUCT_COLLECTION(1, 6, "discount"), {fetchPolicy: 'cache-and-network'})
  data && console.log(normalizeProductData(data.productCollection[0]));

  return (
    <section className="products-sec top-deals-sec" >
      <h2 className="sec-heading">Top deals</h2>
      <div className="top-deals-container">
      {data && data.productCollection.map((product) => (
        <ProductCardSmall key={product.id} product={product} />
      ))}
      </div>
    </section>
  )
}