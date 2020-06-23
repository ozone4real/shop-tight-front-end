import gql from 'graphql-tag';
import { CART_FRAGMENT, PRODUCT_COLLECTION_FRAGMENT } from './fragments'

export const SIGN_UP_USER = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(input: $user) {
      user {
        firstName
        lastName
        email
        isAdmin
        verified
      }
      token
      message
    }
  }`


export const PAYMENT_OPTIONS = gql`
  {
    paymentOptions {
    id
    paymentType
    picture
    description
  }
  }
`

export const PRODUCT_FOR_UPDATE = (id) => (
  gql`
  {
  product(id: ${id}) {
    brand,
		productName,
		productDescription,
    productSize,
    unitWeight,
    discount,
    productDetails {
      id
      size
      color
      price
      quantityInStock
      }
    subCategory {
      id
    }
  }
}
`)

export const ADD_PRODUCT_TO_CART = gql`
  mutation addProductToCart($input: AddProductToCartInput!){
    addProductToCart(input: $input){
      userCart {
        ...UserCart
    }
    totalPriceWithoutCharges,
    totalShippingFee
    }
}
${CART_FRAGMENT}
`

export const CART_WITH_COSTS = gql`
{
  userCart {
    ...UserCart
  }
  totalPriceWithoutCharges,
  totalShippingFee
}
${CART_FRAGMENT}
`

export const USER_ORDERS = gql`
  {
  orders {
    amountPayable
    id
    totalQuantity
    status
    orderDetails {
      quantity
      productDetail {
        product {
          images
        }
      }
    }
    createdAt
  }
}
`

export const UPDATE_CART_QUANTITY = gql`
  mutation updateCartQuantity($input: UpdateCartQuantityInput!){
  updateCartQuantity(input: $input) {
     userCart {
        ...UserCart
    },
    totalPriceWithoutCharges,
    totalShippingFee
  }
}
${CART_FRAGMENT}
`
 

export const CREATE_CATEGORY = gql`
  mutation createCategory($category: CreateCategoryInput!) {
  createCategory(input: $category) {
    category {
      categoryName
      categoryDescription
      urlKey
    }
  }
}`

export const REMOVE_PRODUCT_FROM_CART = (id) => (
  gql`
  mutation removeProductFromCart {
    removeProductFromCart(input: {productDetailId: ${id} all: true}){
      userCart {
        ...UserCart
    }
      totalPriceWithoutCharges,
      totalShippingFee,
      message
    }
}
${CART_FRAGMENT}
`
)

export const CATEGORIES = gql`
  {
  categories {
    categoryDescription
    categoryName
    urlKey
    id
    images
    subCategories {
      categoryDescription
      categoryName
      urlKey
      id
      }
    
  }
}`

export const USER = gql`
{
  user @client{
    isLoggedIn
    verified
    firstName
    isAdmin
  }
}`

export const LOG_IN_USER = gql`
    mutation signInUser($user: SignInUserInput!) {
      signInUser(input: $user) {
        user {
          firstName
          lastName
          email
          isAdmin
          verified
        },
        token
      }
    }`

export const CREATE_SUB_CATEGORY = gql`
  mutation createSubCategory($subCategory: CreateSubCategoryInput!){
    createSubCategory(input: $subCategory) {
      subCategory {
        category {
        categoryName
        categoryDescription
        urlKey
        }
        categoryName
        categoryDescription
      }
    }
  }`

export const UPDATE_PROFILE = gql`
  mutation updateUser($user: UpdateUserInput!) {
  updateUser(input: $user) {
    message
  }
}
`

export const PROFILE = gql`
{
	profile {
			email
			firstName
			lastName
			address
			city
			state
			phone
			country
			postalCode
	}
}
`

export const USER_CART = gql`
  {
    userCart {
      ...UserCart
    }
}
${CART_FRAGMENT}
`

export const CREATE_ORDER = gql`
  mutation createOrder ($input: CreateOrderWithoutPaymentInput!){
    createOrderWithoutPayment(input: $input) {
        order {
            id
        }
    }
}
`

export const USER_CART_FOR_CHECK_OUT = gql`
  {
    userCart {
      ...UserCart
    }
    totalPriceWithoutCharges
    totalShippingFee
  }
  ${CART_FRAGMENT}
`

export const FETCH_SUB_CATEGORIES = gql`
{
subCategories {
  categoryDescription
  categoryName
  id
  images
  }
}`

export const CATEGORY =  gql`
  fragment Category on Category{
      id
      urlKey
      categoryName
      categoryDescription
      images,
      subCategories {
        categoryName
        urlKey
      }
  }
`
 

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($category: UpdateCategoryInput!) {
  updateCategory(input: $category) {
    category {
      categoryName
      categoryDescription
      urlKey
    }
  }
}`

export const CREATE_PRODUCT = gql`
mutation createProduct($product: CreateProductInput!) {
  createProduct(input: $product){
    product {
      productName,
      urlKey,
      productDetails {
        id
      }  
    }
  }
}`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($product: UpdateProductInput!) {
  updateProduct(input: $product) {
    product {
      productName,
      urlKey,
      productDetails {
        id
      }  
    }
  }
}
`

export const PRODUCT = (id) => (
  gql`
  {
  product(id: ${id}) {
      productName
      productDescription
      images
      productSize
      brand
      shippingFee
      discount
      id
    productDetails {
      id
      size
      color
      quantitySold
      price
      discountedPrice
      priceInNaira
      discountedPriceInNaira
      urlKey
      quantityInStock
      }
    category {
      categoryName
      urlKey
      ancestors {
        categoryName
        urlKey
      }
    }
  }
}
`)

export const VERIFY_USER = gql`
  mutation verifyUser($input: VerifyUserInput!) {
    verifyUser(input: $input) {
      token
    }
  }
`


export const USER_ORDER = (id) => (
  gql`
  {
    order(id: ${id}) {
      id
      amountPayable
      totalQuantity
      status
      paymentMade
      payment {
        paymentType
      }
      orderDetails {
        totalPrice
        id
        quantity
        status
        productDetail {
          id
          color
          size
          price
          product {
            productName,
            images,
            urlKey
          }
        }
      }
      createdAt
    }
  }
  `
  )
  

export const PRODUCT_COLLECTION = (page=1, limit=7, sortParam) => (
  gql`
{
  productCollection(page: ${page}, limit: ${limit}, sortParam: ${sortParam}) {
    ...Collection
  }
}
${PRODUCT_COLLECTION_FRAGMENT}
`
)

export const BEST_SELLING_PRODUCTS = (page=1, limit=6) => (
  gql`
  {
    bestSellingProducts(page: ${page}, limit: ${limit}) {
      ...Collection
    }
  }
  ${PRODUCT_COLLECTION_FRAGMENT}
  `
)

export const CATEGORY_PRODUCTS = (id, page=1) => (
  gql`
  {
    category (id: ${id}) {
      categoryName
      categoryDescription
      ancestors{
        categoryName
        urlKey
      }
      subCategories {
        categoryName
        urlKey
      }
    }
  categoryProducts(categoryId: ${id}, page: ${page}, limit: 30) {
    ...Collection
  }
}
${PRODUCT_COLLECTION_FRAGMENT}
`
)

export const SUB_CATEGORY_PRODUCTS = (id, page=1) => (
  gql`
  {
    subCategoryProducts(subCategoryId: ${id}, page: ${page}, limit: 30) {
    ...Collection
  },
    subCategory(id: ${id}) {
        categoryName
        categoryDescription
    }
  }
${PRODUCT_COLLECTION_FRAGMENT}
`
)

export const SEND_VERIFICATION_MAIL = gql`
mutation {
  sendVerificationMail(input: {}) {
    message
  }
}
`

export const SEARCH_QUERY = gql`
 query($query: String!, $limit: Int = 40, $page: Int=1, $sortParams: SortAttributes = null){
  searchResults(query: $query, limit: $limit, page: $page, sortParams: $sortParams) {
    ...Collection
  }
 }
 ${PRODUCT_COLLECTION_FRAGMENT}
`