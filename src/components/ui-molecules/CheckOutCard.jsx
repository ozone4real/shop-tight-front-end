import React from 'react';
import { priceInNaira } from '../../utils/helperMethods';

export default ({ itemsCount, totalPrice, user, history }) => (
  <div className="check-out-card">
    <h3> Overview </h3>
    <hr/>
    <div>
      <span className="text-light text-md item-title">TOTAL NO. OF ITEMS:</span>
      <h3 className="d-inline">{itemsCount}</h3>
    </div>
    <hr/>
    <div className="total-price">
      <span className="text-light text-md item-title">TOTAL PRICE:</span>
      <h3 className="d-inline">{priceInNaira(totalPrice)}</h3>
      <div className="text-light text-sm">Delivery charges not included</div>
    </div>
    <hr/>
    <div className="check-out-btn">
      <button onClick={() => {
        if(!user.isLoggedIn) {
          localStorage.setItem('redirect_url', history.location.pathname);
          return history.push('/login')
        }
        history.push('/checkout')
      }}>{user.isLoggedIn ? 'Check Out': 'Sign In To Check Out'}
    </button>
    </div>
  </div>
)