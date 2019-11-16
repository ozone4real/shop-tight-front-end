import React from 'react';
import { Link } from 'react-router-dom';
import { USER_ORDERS, PROFILE } from '../../graphql/queries'
import { useQuery } from 'react-apollo';
import format from 'date-fns/format'

export default () => {
  const { data: userOrdersData } = useQuery(USER_ORDERS, { fetchPolicy: 'cache-and-network'})
  // const { data: userProfileData } = useQuery(PROFILE)
  if(!userOrdersData) return <div></div>
  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      <div className="orders-list">
      {userOrdersData.orders.map(({ id, totalQuantity, status, createdAt, orderDetails }) => (
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
      ))}
      </div>
    </div>
  )
}