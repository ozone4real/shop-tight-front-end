import React from 'react';
import HorizontalCard from '../ui-molecules/HorizontalCard';
import { USER_CART, USER } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import { normalizeCartProductData } from '../../utils/helperMethods';

export default () => {
  const { data: {user}, loading } = useQuery(USER)
  const { data } = useQuery(USER_CART, { fetchPolicy: user.isLoggedIn ? 'cache-and-network' : 'cache'} )

  return(
    <div className="cart-page">
      <div className="container">
      <h2>My Cart</h2>
      <section className="main-sec">
        <div className="left-sec">
        {data && data.userCart.map((item) => (
          <HorizontalCard
          key={item.id}
          id={item.id}
          quantity={item.quantity}
          product={normalizeCartProductData(item.productDetail)}
          discountedSubTotalForProduct={item.discountedSubTotalForProduct}
          subTotalForProduct={item.subTotalForProduct} 
           />
        ))}
        </div>
      </section>
      <aside className="right-sec"></aside>
      </div>
    </div>
  )
}