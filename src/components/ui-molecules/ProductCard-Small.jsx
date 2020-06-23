import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { truncateText, priceRange } from '../../utils/helperMethods';
import Skeleton from 'react-loading-skeleton';


export default ({product: {images = "", productName="", brand="", urlKey="", quantitySold="", productDetails=""}, section}) => {
  const [ loading, setLoading ] = useState(true)
  const handleLoad = () => {
    setLoading(false)
  }

  const {price, discounted} = priceRange(productDetails)
  return (
  <Link to={`/products/${urlKey}`} className="product-card product-card-sm">
    {section === 'best-selling' && <div className="qty-sold"><span className="text-sm badge">{quantitySold} sold</span></div>}
    <div className="product-img">
    {loading && <Skeleton height={170} /> }
    <img src={images[0]} alt="PRODUCT" onLoad={handleLoad} style= {{display: loading ? 'none' : 'block' }} />
    </div>
    <div className="product-name">
      {`${brand} ${productName}`.truncate(40)}
    </div>
    <div className="product-price">
    <p>{discounted}</p> 
    {price != discounted && <p className="line-through text-md text-lighter">{price}</p>}
    </div>
  </Link>)
}