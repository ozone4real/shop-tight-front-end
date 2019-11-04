import React from 'react';
import { priceInNaira } from '../../utils/helperMethods';

export default ({ itemsCount, totalPrice }) => (
  <div class="check-out-card">
    <h3> Overview </h3>
    <hr/>
    <div>
      <span class="text-light text-md item-title">TOTAL NO. OF ITEMS:</span>
      <h3 class="d-inline">{itemsCount}</h3>
    </div>
    <hr/>
    <div class="total-price">
      <span class="text-light text-md item-title">TOTAL PRICE:</span>
      <h3 class="d-inline">{priceInNaira(totalPrice)}</h3>
      <div class="text-light text-sm">Delivery charges not included</div>
    </div>
    <hr/>
    <div class="check-out-btn">
      <button>Sign In And Check Out</button>
    </div>
  </div>
)