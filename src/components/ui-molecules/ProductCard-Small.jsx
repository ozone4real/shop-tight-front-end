import React from 'react';
import { Link } from 'react-router-dom';
import { truncateText, priceRange } from '../../utils/helperMethods';

export default ({product: {images, productName, brand, urlKey, productDetails}}) => {
  const {price, discounted} = priceRange(productDetails)
  return (
  <Link to={`/products/${urlKey}`} className="product-card product-card-sm">
    <div className="product-img">
    <img src={images[0]} alt="PRODUCT" />
    </div>
    <div className="product-name">
      {truncateText(`${brand} ${productName}`, 40)}
    </div>
    <div className="product-price">
    <p>{discounted}</p> 
    {price != discounted && <p className="line-through text-md text-light">{price}</p>}
    </div>
  </Link>)
}