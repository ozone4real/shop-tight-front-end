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
    key={item.productDetail.id}
    quantity={item.quantity}
    product={normalizeCartProductData(item.productDetail)}
    discountedSubTotalForProduct={item.discountedSubTotalForProduct}
    subTotalForProduct={item.subTotalForProduct} 
     />
  ))}
  </Fragment>
)