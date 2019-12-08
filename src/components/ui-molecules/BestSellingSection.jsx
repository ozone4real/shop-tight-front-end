import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { normalizeProductData } from '../../utils/helperMethods';
import { BEST_SELLING_PRODUCTS } from '../../graphql/queries';
import ProductCardSkeleton  from './ProductCardSkeleton';
import ProductCardSmall from './ProductCard-Small';

export default () => {
  const {data, loading} = useQuery(BEST_SELLING_PRODUCTS(1, 5), {fetchPolicy: 'cache-and-network'})
  return (
    <section className="products-sec best-selling-sec" >
      <h2 className="sec-heading">Best Selling Products</h2>
      <div className="top-deals-container">
      {data ? data.bestSellingProducts.map((product) => (
        <ProductCardSmall key={product.id} product={product} section="best-selling" /> 
      )) : Array.from({length: 5}, (item, index) => <ProductCardSkeleton />) }
      </div>
    </section>
  )
}