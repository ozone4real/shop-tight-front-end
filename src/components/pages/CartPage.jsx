import React, { Fragment } from 'react';
import { USER_CART, USER } from '../../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import CheckOutCard from '../ui-molecules/CheckOutCard';
import CartEmptyCart from '../ui-molecules/CartEmptyCard';
import CartItems from '../ui-molecules/CartItems';

export default ({ history }) => {
  const { data: {user} } = useQuery(USER)
  const { data, loading } = useQuery(USER_CART, { fetchPolicy: user.isLoggedIn ? 'cache-and-network' : 'cache'} )
  if(!data) return <div> </div>

  return(
    <div className="cart-page">
      <div className="container">
      { !data.userCart.length ? <CartEmptyCart /> :
      <Fragment>
      <h2>My Cart</h2>
      <section className="main-sec">
        <div className="left-sec">
        <CartItems data={data} user={user} />
        </div>
        <aside className="right-sec">
          <CheckOutCard
            totalPrice={ data.userCart.reduce((acc, item) => (acc + item.discountedSubTotalForProduct), 0)}
            itemsCount={data.userCart.reduce((acc, item) => ( acc + item.quantity), 0 )}
            user={user}
            history={history}
          />
      </aside>
      </section>
      </Fragment>
      }
      </div>
    </div>
  )
}