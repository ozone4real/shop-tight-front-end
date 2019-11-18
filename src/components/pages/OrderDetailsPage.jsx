import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USER_ORDER, PROFILE } from '../../graphql/queries';
import { priceInNaira } from '../../utils/helperMethods';
import { Link } from 'react-router-dom';

export default ({ match: { params: { id } } }) => {
  const { data } = useQuery(USER_ORDER(id), { fetchPolicy: 'no-cache'});
  const { data: profileData } = useQuery(PROFILE);
  console.log(data, profileData)
  if(!data || !(profileData && profileData.profile)) return <div></div>
  const {
     order: {
        amountPayable, totalQuantity, 
        status, paymentMade,
        payment: {
          paymentType
        },
        orderDetails
      }
      } = data;

  return (
    <div className="order-details-page">
      <div className="container">
        <section className="main-sec">
      <div className="left-sec">
        <h2>Order Details</h2>
        <div className="order-details">
          <div><span className="text-light">Order Number:</span> <h3 className="d-inline">{id}</h3></div>
          <div><span className="text-light">Total Qty Of Items:</span> <h3 className="d-inline">{totalQuantity}</h3></div>
         <div> <span className="text-light">Status:</span> <h3 className="d-inline">{status}</h3></div>
         <hr/>
        </div>
        <h2>Payment Details</h2>
        <div className="payment-details">
          <div><span className="text-light">Payment Type:</span> <h3 className="d-inline">{paymentType}</h3></div>
          <div><span className="text-light">Total Amount:</span> <h3 className="d-inline">{priceInNaira(amountPayable)}</h3></div>
          <div><span className="text-light">Payment Status:</span> <h3 className="d-inline">{paymentMade ? "Payment Made" : "Payment Pending"}</h3></div>
          <hr/>
        </div>
        <h2>Delivery Details</h2>
        <div className="delivery-details">
          <div><span className="text-light">Delivery Type:</span> <h3 className="d-inline">Home Delivery</h3></div>
          <div><span className="text-light">Delivery Address:</span>
          {profileData && `${profileData.profile.address}, ${profileData.profile.city}, ${profileData.profile.state}`}
          </div>
        </div>
        <hr/>
        </div>
        <div className="right-sec">
        <div className="items-purchased">
          <h2>Items Purchased</h2>
          <hr/>
          {orderDetails.map(({productDetail, id, quantity, totalPrice }) => (
            <Fragment key={id}>
            <div className="item-container">
            <div className="img-container">
             <img src={productDetail.product.images[0]} alt={productDetail.product.productName} />
            </div>
            <div className="other-details-sec">
            <Link to={`/products/${productDetail.product.urlKey}`} >
            <h3>
              {productDetail.product.productName}
            </h3>
            </Link>
            {productDetail.size && <div className="text-lighter"><span className="text-md item-title">SIZE:</span>{productDetail.size} </div>}
        {productDetail.color && <div className="text-lighter"><span className="text-md item-title">COLOR:</span>{productDetail.color} </div>}
        <div className="text-lighter"><span className="text-md item-title">QUANTITY:</span>{quantity} </div>
        <div><span className="text-md item-title text-lighter">TOTAL-PRICE:</span>{priceInNaira(totalPrice)} </div>
            </div>
            </div>
            <hr/>
            </Fragment>
          ))}

        </div>
        </div>
        </section>
      </div>
    </div>
  )
}