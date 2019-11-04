import React from 'react';
import HorizontalCard from '../ui-molecules/HorizontalCard';
import { USER_CART, USER } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import CartTableHeader from '../ui-molecules/CartTableHeader';
import CheckOutCard from '../ui-molecules/CheckOutCard';
import { normalizeCartProductData } from '../../utils/helperMethods';

export default () => {
  const { data: {user}, loading } = useQuery(USER)
  const { data } = useQuery(USER_CART, { fetchPolicy: user.isLoggedIn ? 'cache-and-network' : 'cache'} )
  if(loading) return <div> </div>

  return(
    <div className="cart-page">
      <div className="container">
      <h2>My Cart</h2>
      <section className="main-sec">
        <div className="left-sec">
        <CartTableHeader />
        {data.userCart.map((item) => (
          <HorizontalCard
          key={item.productDetail.id}
          quantity={item.quantity}
          product={normalizeCartProductData(item.productDetail)}
          discountedSubTotalForProduct={item.discountedSubTotalForProduct}
          subTotalForProduct={item.subTotalForProduct} 
           />
        ))}
        </div>
        <aside className="right-sec">
          <CheckOutCard
            totalPrice={ data.userCart.reduce((acc, item) => (acc + item.discountedSubTotalForProduct), 0)}
            itemsCount={data.userCart.reduce((acc, item) => ( acc + item.quantity), 0 )}
          />
      </aside>
      </section>
      </div>
    </div>
  )
}