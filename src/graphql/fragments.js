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
      },
      id
      size
      color
      quantitySold
      priceInNaira
      discountedPrice
      price
      discountedPriceInNaira
      urlKey
      quantityInStock,
  }
}
`