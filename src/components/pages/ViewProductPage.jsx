import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { priceRange, getIdFromUrlKey } from '../../utils/helperMethods';
import { PRODUCT } from '../../graphql/queries';
import { Link } from 'react-router-dom';
import Select from '../ui-molecules/Select';

export default ({ match: {params: {urlKey}} }) => {
  const { data, loading } = useQuery(PRODUCT(getIdFromUrlKey(urlKey)), { fetchPolicy: 'cache-and-network' });

  if(data) {
    var { 
      product: { 
      productName, 
      productDescription, 
      brand, productDetails, 
      images, subCategory
     }
    } = data;

    var colors = productDetails.map((item) => item.color)
    var colorVariation = colors.filter((item, index) => colors.indexOf(item) === index)
  
  }

  const [ size, setSize ] = useState('');
  const [ selectedColor, setSelectedColor ] = useState('');

  useEffect(() => {
    data && setSelectedColor(colorVariation[0])
  }, [])

  if(loading) return <div></div>

  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }
  const filterBySelectedColor = productDetails.filter((item) => item.color === selectedColor) 

  const { price, discounted } = priceRange(productDetails)

  return (
  <main role='main' className="view-product-page">
    <div className="container">
    <section className="main-sec">
    <section className="left-sec">
    <div className="product-img">
      <img src={images[0]} alt={productName}></img>
    </div>
    <div className="product-details-sec">
    <h2>{brand} {productName}</h2>
    <div className="prod-category text-light">
    <span>In</span> > <Link className="hover-underline" to={`/sub-categories/${subCategory.urlKey}`}>
      <b>{subCategory.categoryName}</b>
    </Link>
    </div>
    <hr/>
    <div>
      <h2 className="d-inline">{discounted}</h2> <span className="line-through text-light">{price}</span>
    </div>
    <div><span class="text-light text-md">Brand:</span> <h4 className="d-inline">{brand}</h4></div>
    <div><span class="text-light text-md">Order Number:</span> <h4 className="d-inline">{brand}</h4></div>
    <div className="select-variations">
      <div className="colors"> <span class="text-light">Color:</span>
       <div className="color-select">
        {colorVariation.map((color) => (
          <div class={`color ${selectedColor === color && 'selected-color'}`} onClick={() => handleColorSelect(color)}>{color}</div>
        ))}
        </div>
        </div>
        <div class="sizes">
          <div class="size-select">
            <Select 
            />
          </div>
      
      </div>
    </div>
    <hr/>
    <div className="product-details">
      <h3>Details</h3>
      <div>{productDescription.split(', ').map((desc) => (
        <li>
          {desc}
        </li>
      ))}</div>
    </div>
    </div>
    </section>
    <aside className="right-sec">      
      <div><h3>Check-out</h3></div>
    </aside>
    </section>
    </div>
    </main>
  )
}