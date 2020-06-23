import React, { Fragment } from 'react';
import CartItemCard from '../ui-molecules/CartItemCard';
import { normalizeCartProductData } from '../../utils/helperMethods';
import CartTableHeader from '../ui-molecules/CartTableHeader';

export default ({ data, user }) => (
  <Fragment>
  <CartTableHeader />
  {data.userCart.map((item) => (
    <CartItemCard
    user={user} 
    key={item.product.productId}
    quantity={item.quantity}
    product={item.product}
    discountedSubTotalForProduct={item.discountedSubTotalForProduct}
    subTotalForProduct={item.subTotalForProduct} 
     />
  ))}
  </Fragment>
)