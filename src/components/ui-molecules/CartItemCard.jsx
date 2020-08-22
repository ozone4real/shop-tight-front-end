import React, { useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { priceInNaira, optionsArrayFromNum, truncateText } from '../../utils/helperMethods';
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import GarbageIcon from  '../../assets/icons/garbage';
import { UPDATE_CART_QUANTITY, REMOVE_PRODUCT_FROM_CART, USER_CART } from '../../graphql/queries'
import Select from './Select';

export default ({ product, quantity, discountedSubTotalForProduct, user }) => {
  const [ quantitySelected, setQuantitySelected ] = useState(quantity)
  const client = useApolloClient()
  const { userCart } = client.readQuery({ query: USER_CART})
  const [ updateCartQuantity ] = useMutation( UPDATE_CART_QUANTITY, {
    onCompleted({updateCartQuantity: { userCart, totalShippingFee, totalPriceWithoutCharges }}) {
      client.writeData({
        data: {
          userCart,
          totalShippingFee,
          totalPriceWithoutCharges
        }
      })
      toast.success('Quantity successfully updated')
    },
    onerror(e) {
      toast.error('Could not update the quantity. An error occured. Try again')
    }
  })

  const [ removeProductFromCart, { loading } ] = useMutation(REMOVE_PRODUCT_FROM_CART(product.id), {
    onCompleted({removeProductFromCart: {message, userCart, totalShippingFee, totalPriceWithoutCharges}}) {
      client.writeData({
        data: {
          userCart,
          totalShippingFee,
          totalPriceWithoutCharges

        }
      })
      toast.success(message)
    },
    onerror(e) {
      console.log(e)
      toast.error(e.message)
    }
  })

  const handleChange = ({ target: { value} }) => {
    setQuantitySelected(value)
    if(user.isLoggedIn) {
      return updateCartQuantity({
        variables : {
          input: {
            quantity: parseInt(value),
            productDetailId: product.id
          }
        }
      })
    }

    const cartClone = [...userCart]
    let itemToUpdate = cartClone.find((item) => item.productDetail.id === product.id)
    const index = cartClone.indexOf(itemToUpdate)
    itemToUpdate = {...itemToUpdate, quantity: parseInt(value) , 
      discountedSubTotalForProduct: product.discountedPrice * parseInt(value)
    };
    cartClone[index] = itemToUpdate
    client.writeData({
      data: {
        userCart: cartClone
      }
    })
    toast.success('Quantity successfully updated')
  }

  const handleRemoveItem = () => {
    if(user.isLoggedIn){
      return removeProductFromCart()
    }
    const cartClone = [...userCart]
    const updatedCart = cartClone.filter((item) => item.productDetail.id !== product.id)
    client.writeData({
      data: {
        userCart: updatedCart
      }
    })
    toast.success('Item successfully removed from cart')
  }
  return (
  <Fragment>
    <div className="horizontal-card">
        <div className="prod-img">
          <img src={product.images[0]} alt={product.productName} />
        </div>
        <div className="product-details">
        <div><h3><Link to={`/products/${product.urlKey}`} >{ truncateText(`${product.brand} ${product.productName}`, 67) }</Link></h3></div> 
          {product.size && <div className="text-lighter"><span className="text-md item-title">SIZE:</span>{product.size} </div>}
          {product.color && <div className="text-lighter"><span className="text-md item-title">COLOR:</span>{product.color} </div>}
          <div className="actions-sec">
            <a className={`text-lighter ${loading && 'blur'}`} href="javascript:void(0)" onClick={handleRemoveItem}><GarbageIcon /> {`Remov${loading ? 'ing' : 'e'} Item`} </a>
          </div>
        </div>
        <div className="quantity-sec">
          <h3><Select onChange={handleChange} value={quantitySelected} options={optionsArrayFromNum(product.quantityInStock)} /></h3>
        </div>
        <div className="unit-price-sec">
          <h3>{priceInNaira(product.discountedPrice)}</h3>
          <span className="line-through text-lighter">{priceInNaira(product.price)}</span>
        </div>
        <div className="total-price-sec">
          <h3>{priceInNaira(discountedSubTotalForProduct)}</h3>
        </div>
        <div></div>
    </div>

    <div className="horizontal-card mobile">
        <div className="prod-img">
          <img src={product.images[0]} alt={product.productName} />
        </div>
        <div className="product-details">
        <div><h3><Link to={`/products/${product.urlKey}`} >{ truncateText(`${product.brand} ${product.productName}`, 67) }</Link></h3></div> 
          {product.size && <div className="text-lighter"><span className="text-md item-title">SIZE:</span>{product.size} </div>}
          {product.color && <div className="text-lighter"><span className="text-md item-title">COLOR:</span>{product.color} </div>}
          <div className="price-sec">
            <div className="unit">
              <span class="text-lighter">Unit Price: &nbsp;</span> <span class="text-bold">{priceInNaira(product.discountedPrice)}</span> &nbsp; &nbsp;
              <span className="line-through text-lighter">{priceInNaira(product.price)}</span>
            </div>
            <div className="sub-total">
            <span class="text-lighter">Sub-total: &nbsp;</span> <span class="text-bold">{priceInNaira(discountedSubTotalForProduct)}</span>
            </div>
            <div className="quantity-sec">
              <h3><Select onChange={handleChange} value={quantitySelected} options={optionsArrayFromNum(product.quantityInStock)} /></h3>
            </div>
          </div>
          <div className="actions-sec">
            <a className={`text-lighter ${loading && 'blur'}`} href="javascript:void(0)" onClick={handleRemoveItem}><GarbageIcon /> </a>
          </div>
        </div>
    </div>
  </Fragment>
  )
}