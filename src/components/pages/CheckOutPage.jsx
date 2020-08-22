import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import ProfileForm from '../ui-molecules/ProfileForm';
import CartItems from '../ui-molecules/CartItems';
import { USER_CART_FOR_CHECK_OUT, USER } from '../../graphql/queries';
import PaymentOptionsForm from '../ui-molecules/PaymentOptionsForm';
import OrderSummaryCard from '../ui-molecules/OrderSummaryCard';

export default ({ history }) => {
  const { data, loading } = useQuery(USER_CART_FOR_CHECK_OUT, { fetchPolicy: 'cache-and-network' });
  const { data: { user }} = useQuery(USER);
  const [ profileComplete, setProfileComplete ] = useState(false)

  useEffect(() => {
    if(data && data.userCart) {
      if(!data.userCart.length) {
        history.push('/cart')
      }
    }
  }, [data])

  if(!data) return <div></div>

  return (
    <div className="check-out-page">
      <div className="container">
        <section className="main-sec" >
        <div className="left-sec">
          <div className="info-heading">
          <h2> Update Your Account Info</h2>
          <small>Please ensure that you set the address to where you want this order to be delivered to. Ignore if all the info below is alright</small>
          </div>

        <ProfileForm buttonLabel="Save And Continue" setProfileComplete={setProfileComplete} />
        <hr/>
        <section className={`payment-method-section ${!profileComplete && 'blur'}`}>
          <h2>Select Payment Option</h2>
          <PaymentOptionsForm profileComplete={profileComplete} history={history} />
        </section>
        </div>
        <div className="right-sec">
          <h2>Your Order </h2>
          <CartItems data={data} user={user} />
          <OrderSummaryCard data={data} />
          {!profileComplete && <p class="update-info"> Your account information is incomplete. Please update your info to be able to confirm your order. <Link class="underline" to="/dashboard/profile">Update info</Link> </p>}
          <section className={`payment-method-section ${!profileComplete && 'blur'}`}>
          <h2>Select Payment Option</h2>
          <PaymentOptionsForm profileComplete={profileComplete} history={history} />
        </section>
        </div>
        </section>
      </div>
    </div>
  )
}