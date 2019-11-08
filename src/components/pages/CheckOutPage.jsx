import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ProfileForm from '../ui-molecules/ProfileForm';
import CartItems from '../ui-molecules/CartItems';
import { USER_CART, USER } from '../../graphql/queries';
import PaymentOptionsForm from '../ui-molecules/PaymentOptionsForm';

export default ({ history }) => {
  const { data, loading } = useQuery(USER_CART);
  const { data: { user }} = useQuery(USER);
  const [ profileComplete, setProfileComplete ] = useState(false)

  useEffect(() => {
    if(data && data.userCart) {
      if(!data.userCart.length) {
        history.push('/cart')
      }
    }
  }, [data])

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
          <PaymentOptionsForm profileComplete={profileComplete} />
        </section>
        </div>
        <div className="right-sec">
          <h2>Your Order </h2>
          <CartItems data={data} user={user} />
        </div>
        </section>
      </div>
    </div>
  )
}