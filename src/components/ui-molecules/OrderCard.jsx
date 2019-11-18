import React from 'react';

export default () => (
  <div className="order-card"> 
  <span className="text-lighter">Order Number:</span> <h3 className="d-inline">{id}</h3>
  <p className="text-lighter"> Placed on {format(new Date(createdAt), 'yyyy-MM-dd')} </p>
  <p className="text-lighter">{orderDetails.length} Products, {totalQuantity} Items</p>
  <p className="images-container">
    {orderDetails.map((item) => (
      <img src={item.productDetail.product.images[0]} alt={item.productDetail.product.productName} />
    ))}
    </p>
    <h4 className={status}>{status.toUpperCase()}</h4>
    <p><Link to={`/orders/${id}`}>View Details</Link></p>
  </div>
)