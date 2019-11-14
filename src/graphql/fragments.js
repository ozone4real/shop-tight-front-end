import gql from 'graphql-tag';

export const CART_FRAGMENT = gql`
fragment UserCart on Cart {
  quantity,
  discountedSubTotalForProduct
  subTotalForProduct
  productDetail {
      product {
        productName
        productDescription
        images
        brand
        shippingFee
        discount
        id
        urlKey
      },
      id
      size
      color
      quantitySold
      priceInNaira
      discountedPrice
      price
      discountedPriceInNaira
      quantityInStock,
  }
}
`

export const PRODUCT_COLLECTION_FRAGMENT = gql`
  fragment Collection on Product {
    brand
    productName
    images
    discount
    productDescription
    urlKey
    quantitySold
    productDetails {
      id
      discountedPriceInNaira
      priceInNaira
    }
  } 
`