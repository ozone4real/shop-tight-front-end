import React from 'react';
import { Link } from 'react-router-dom';
import { truncateText, priceRange } from '../../utils/helperMethods';

export default ({product: {images, productName, brand, urlKey, quantitySold, productDetails}, section}) => {
  const {price, discounted} = priceRange(productDetails)
  return (
  <Link to={`/products/${urlKey}`} className="product-card product-card-sm">
    {section === 'best-selling' && <div class="qty-sold"><span class="text-sm badge">{quantitySold} sold</span></div>}
    <div className="product-img">
    <img src={images[0]} alt="PRODUCT" />
    </div>
    <div className="product-name">
      {truncateText(`${brand} ${productName}`, 40)}
    </div>
    <div className="product-price">
    <p>{discounted}</p> 
    {price != discounted && <p className="line-through text-md text-lighter">{price}</p>}
    </div>
  </Link>)
}