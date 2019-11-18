import React, { Fragment } from 'react';
import ProductCardSmall from '../ui-molecules/ProductCard-Small';

export default ({categoryName, categoryDescription, categoryProducts }) => (
  <Fragment>
  <div class="category-heading">
            <h2>{categoryName}</h2>
<div class="text-md text-light">{categoryDescription}</div>
</div>
            <div class="product-list">
              {categoryProducts.map((item) => (
                <ProductCardSmall product={item} />
              ))}
            </div>
            </Fragment>
)