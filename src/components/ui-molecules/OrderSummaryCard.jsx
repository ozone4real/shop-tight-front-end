import React from 'react';
import { priceInNaira } from '../../utils/helperMethods';

export default ({ data: { totalShippingFee, totalPriceWithoutCharges}}) => (
  <div className="order-summary-card">
    <h3>Order Summary</h3>
    <p>
      Number Of Items:
    </p>
    <hr/>
    <p>
      <span className="text-light">Sub-total: </span> <span><h3  className="d-inline">{priceInNaira(totalPriceWithoutCharges)}</h3></span>
    </p>
    <hr/>
    <p>
      <span className="text-light">Shipping Fee: </span> <span><h3  className="d-inline">{priceInNaira(totalShippingFee)}</h3></span>
    </p>
    <hr/>
    <p>
      <span className="text-light">Total: </span> <span><h3  className="d-inline">{priceInNaira(totalShippingFee + totalPriceWithoutCharges)}</h3></span>
    </p>
  </div>
)