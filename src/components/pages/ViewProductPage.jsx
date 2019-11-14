import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useApolloClient } from "@apollo/react-hooks";
import { toast } from 'react-toastify'
import { priceRange, getIdFromUrlKey, optionsArrayFromNum } from '../../utils/helperMethods';
import { PRODUCT, USER, USER_CART, ADD_PRODUCT_TO_CART } from '../../graphql/queries';
import { Link } from 'react-router-dom';
import Select from '../ui-molecules/Select';
import CatalogTreeNav from '../ui-molecules/CatalogTreeNav';
import CartIcon from '../../assets/icons/shopping-cart'

export default ({ match: {params: { urlKey }} }) => {
  const { data, loading } = useQuery(PRODUCT(getIdFromUrlKey(urlKey)), { fetchPolicy: 'cache-and-network' });

  if(data) {
    var { 
      product: {
      id: productId, 
      productName, 
      productDescription, 
      brand, productDetails, 
      images, subCategory,
      shippingFee, category,
      discount
     }
    } = data;

    var colors = productDetails.map((item) => item.color)
    var colorVariation = colors.filter((item, index) => colors.indexOf(item) === index)
    var { price: productPrice, discounted: discountedPrice } = priceRange(productDetails)
  
  }

  const tree = [category, subCategory]
  

  const [ {price, discounted}, setPrice ] = useState({
    price: '',
    discounted: ''
  });
  const [ selectedColor, setSelectedColor ] = useState('');
  const [ mainImg, setMainImg ] = useState(0)
  const [ quantitySold, setQuantitySold] = useState(0)
  const [ selectedVariation, setSelectedVariation ] = useState(null)
  const [ quantityInStock, setQuantityInStock ] = useState(0)
  const [ quantitySelected, setQuantitySelected ] = useState(1)
  const [ noSelectedSizeError, setNoSelectedSizeError ] = useState('')
  const { data: {user} } = useQuery(USER)

  const client = useApolloClient()
  
  useEffect(() => {
    if(data) {
      setSelectedColor(colorVariation[0])
      setPrice({ price: productPrice, discounted: discountedPrice} )
      setQuantitySold(productDetails.reduce((acc, next) => (acc + next.quantitySold), 0 ))
      setQuantityInStock(productDetails.reduce((acc, next) => (acc + next.quantityInStock), 0))
    }
  }, [data])

  const [ addProductToCart, { loading: addingProduct } ] = useMutation(ADD_PRODUCT_TO_CART, {
    onCompleted (data) {
      client.writeData({
        data: { userCart: data.addProductToCart.userCart}
      })
      toast.success('Product successfully added to your cart')
    },
    onError (e) {
      toast.error(e.message)
    }
  })

  if(!data) return <div></div>


  const sizesForSelectedColor = productDetails.filter((item) => item.size && item.color === selectedColor)

  const handleColorSelect = (color) => {
    selectedColor !== color && setPrice({ price: productPrice, discounted: discountedPrice} )
    setSelectedColor(color)
    setSelectedVariation(null)
  }

  const handleImgSelect = (index) => {
    setMainImg(index)
  }

  const handleQuantitySelect = ({target: {value}}) => {
    setQuantitySelected(parseInt(value))
  }

  const writeToCache = () => {
    const { userCart } = client.readQuery({ query: USER_CART})
    const prod = selectedVariation || productDetails[0];
    const cartClone = [...userCart];
    const prodExists = userCart.find((item) => item.productDetail.id === prod.id )
    const product = {id: productId, productName, 
      productDescription, 
      brand, urlKey,
      images, subCategory,
      shippingFee, category,
      discount, __typename: 'ProductType'
    }
    let totalQuantity = quantitySelected;
    let discountedSubTotalForProduct = prod.discountedPrice * quantitySelected
    let subTotalForProduct =  prod.price * quantitySelected
    if(prodExists) {
      const index = userCart.indexOf(prodExists)
      const existingQuantity = cartClone[index].quantity
      totalQuantity = existingQuantity + quantitySelected
      discountedSubTotalForProduct = prod.discountedPrice * totalQuantity
      subTotalForProduct = prod.price * totalQuantity
      cartClone[index] =  { ...cartClone[index], quantity: totalQuantity, discountedSubTotalForProduct, subTotalForProduct};
    } else {
      cartClone.push({ productDetail: {...prod,  product }, __typename: 'Cart', quantity: quantitySelected, discountedSubTotalForProduct, subTotalForProduct })
    }

    if(totalQuantity > quantityInStock) {
      return toast.error('The quantity of this product in your cart is already as much as the quantity in stock')
    }


    client.writeData({
      data: { userCart: cartClone}
    })
    toast.success('Product successfully added to your cart')
  }   


  const handleSubmit = () => {
    if(sizesForSelectedColor.length && !selectedVariation) {
      toast.error('You must select a size')
      return setNoSelectedSizeError('You must select a size')
    }
    if(user.isLoggedIn) {
      return addProductToCart({variables: {input: {
        productDetailId: selectedVariation ? selectedVariation.id : productDetails[0].id,
        quantity: quantitySelected
      }}})
    }
    writeToCache()
  }

  const handleSizeSelect = ({target: {value}}) => {
    const product = productDetails.find((item) => item.id == value)
    if(product) {
      setPrice({price: product.priceInNaira, discounted: product.discountedPriceInNaira})
      setSelectedVariation(product)
      setQuantityInStock(product.quantityInStock)
      setQuantitySelected(1)
      setNoSelectedSizeError('')
      return  
    }
    setPrice({ price: productPrice, discounted: discountedPrice} )
    setSelectedVariation(null)
  }

  return (
  <main role='main' className="view-product-page">
    <div className="container">
      <CatalogTreeNav
      tree={tree}
      product={productName}
       />
    <section className="main-sec">
    <section className="left-sec">
    <div className="product-images">
      <img className="main-img" src={images[mainImg]} alt={productName}></img>
      <div className="small-images" >
        {images.map((img, index) => (
          <img src={img} key={index} alt="productName" 
          onClick={() => handleImgSelect(index)}
          onMouseOver={() => handleImgSelect(index)}
           />
        ))}
      </div>
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
    <hr/>
    <div><span className="text-light text-md item-title">BRAND:</span> <h4 className="d-inline">{brand}</h4></div>
    <div><span className="text-light text-md item-title">SKU:</span> <h4 className="d-inline">{productId}</h4></div>
    <div><span className="text-light text-md item-title">QUANTITY SOLD:</span> <h4 className="d-inline">{quantitySold}</h4></div>
    <hr/>
    <h3 className="text-light">Variations</h3>
    <div className="select-variations">
      <div className="colors"> <span className="text-light text-md">COLOR:</span>
       <div className="color-select">
        {colorVariation.map((color) => (
          <div className={`color text-md ${selectedColor === color && 'selected-color'}`} key={color} onClick={() => handleColorSelect(color)}>{color}</div>
        ))}
        </div>
        </div>
        { !sizesForSelectedColor.length ? null : <div className="sizes">
          <div className="size-select">
           <span className="text-light text-md">SIZE: </span><Select
            id="size-select-elem"
            onChange={handleSizeSelect}
            options={sizesForSelectedColor.map((item) => (
              { name: item.size, value: item.id, id: item.id  })
            )}
            name='size'
            label='Select Size'
            error={noSelectedSizeError}
            />
          </div>
      </div>}
    </div>
    <hr/>
    <div className="product-description">
      <h3 className="text-light">Description</h3>
      <ul>
      {productDescription.split(';').map((desc, index) => (
        <li key={index}>
          <span>{desc.trim()}</span>
        </li>
      ))}</ul>
    </div>
    </div>
    </section>
    <aside className="right-sec">    
      <h4 className="">SHIPPING DETAILS</h4>
      <hr/>
      <div><span className="text-light text-md">DISCOUNT:</span> <h4 className="d-inline">{ `${discount}%` }</h4></div>
      <hr/>
      <div><span className="text-light text-md">DELIVERY FEE:</span> <h4 className="d-inline">{ `\u20A6${shippingFee}` }</h4></div>
      <hr/>
      <p className="text-light">This product would be delivered within 
        10 working days when you choose to pay on delivery and 5 working
        days when you pay on check-out with a debit card.
        </p>
        <hr/>
        <div className="select-qty">
          <span className="text-light text-md">QUANTITY:</span> <Select
            onChange={handleQuantitySelect}
            value = {quantitySelected}
            options={optionsArrayFromNum(quantityInStock)} 
          />
        </div>
        <div className="add-to-cart-btn" >
          <button onClick={handleSubmit}> <CartIcon color="white" /> <span>Add To Cart</span></button>
        </div>
    </aside>
    </section>
    </div>
    </main>
  )
}