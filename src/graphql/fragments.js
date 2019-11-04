import gql from 'graphql-tag';

export const CART_FRAGMENT = gql`
fragment UserCart on Cart {
  id,
  quantity,
  discountedSubTotalForProduct
  subTotalForProduct
  productDetail {
      product {
          id,
          brand,
          productName,
          productDescription,
          shippingFee,
          images
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